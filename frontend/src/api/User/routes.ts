import { BASE_API_URL } from 'api/routes'

export const updateUser = (userId: string) => `${BASE_API_URL}/user/${userId}`
