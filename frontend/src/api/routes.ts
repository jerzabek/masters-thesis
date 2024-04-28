export const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL
export const CORE_URL = process.env.NEXT_PUBLIC_PINEHAUS_URL
export const CDN_URL = 'https://cdn.pinehaus.net'

export const googleLoginRedirectRoute = () => `${BASE_API_URL}/login/oauth2/code/google`

export const logout = () => `${BASE_API_URL}/login/logout`

export const getMe = () => `${BASE_API_URL}/user/me`

export const image = (image: string) => `${CDN_URL}/${image}`
