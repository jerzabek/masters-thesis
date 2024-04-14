interface ApiResponse {
  [key: string]: any
}

export function parseResponse<T = ApiResponse>(response: Response) {
  return new Promise<T>(async (resolve, reject) => {
    try {
      if (response.status === 204) {
        resolve({} as T)
      } else {
        const parsedResponse: T = await response.json()

        if (response.status >= 200 && response.status < 400) {
          resolve(parsedResponse)
        } else {
          reject(parsedResponse)
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
