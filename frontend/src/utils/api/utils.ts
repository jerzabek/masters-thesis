interface ApiResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export function parseResponse<T = ApiResponse>(response: Response) {
  return new Promise<T>((resolve, reject) => {
    try {
      const contentType = response.headers.get('content-type')
      const isSuccessStatus = response.status >= 200 && response.status < 400

      if (response.status === 204) {
        resolve({} as T)
      } else if (contentType && contentType.includes('application/json')) {
        if (isSuccessStatus) {
          response
            .json()
            .then(parsedResponse => resolve(parsedResponse as T))
            .catch(() => resolve({} as T))
        } else {
          response
            .json()
            .then(parsedResponse => reject(parsedResponse as T))
            .catch(() => reject({} as T))
        }
      } else {
        if (isSuccessStatus) {
          resolve({} as T)
        } else {
          reject({} as T)
        }
      }
    } catch (error) {
      reject(error)
    }
  })
}

export async function getJson<T = ApiResponse>(url: string, options?: RequestInit) {
  const response = await fetch(url, {
    credentials: 'include',
    ...options,
  })

  return parseResponse<T>(response)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function putJson<T = ApiResponse>(url: string, body: any) {
  const response = await fetch(url, {
    credentials: 'include',
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return parseResponse<T>(response)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function postJson<T = ApiResponse>(url: string, body?: any, options?: RequestInit) {
  const response = await fetch(url, {
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  })

  return parseResponse<T>(response)
}

export async function deleteJson<T = ApiResponse>(url: string, options?: RequestInit) {
  const response = await fetch(url, {
    credentials: 'include',
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  })

  return parseResponse<T>(response)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const query = (params: Record<string, any>) => {
  if (Object.keys(params).length === 0) return ''

  Object.keys(params).forEach(key => params[key] === undefined && delete params[key])

  return `?${new URLSearchParams(params).toString()}`
}
