interface ApiResponse {
  [key: string]: any
}

export function parseResponse<T = ApiResponse>(response: Response) {
  return new Promise<T>(async (resolve, reject) => {
    try {
      const contentType = response.headers.get('content-type')
      console.log(response)
      const isSuccessStatus = response.status >= 200 && response.status < 400

      if (response.status === 204) {
        resolve({} as T)
      } else if (contentType && contentType.includes('application/json')) {
        if (isSuccessStatus) {
          try {
            const parsedResponse: T = await response.json()

            resolve(parsedResponse)
          } catch (error) {
            resolve({} as T)
          }
        } else {
          const parsedResponse: T = await response.json()

          reject(parsedResponse)
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

export async function getJson<T = ApiResponse>(url: string) {
  const response = await fetch(url, {
    credentials: 'include',
  })

  return parseResponse<T>(response)
}

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

export const query = (params: Record<string, any>) => {
  return `?${new URLSearchParams(params).toString()}`
}
