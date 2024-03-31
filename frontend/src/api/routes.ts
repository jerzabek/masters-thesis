export const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL
export const CORE_URL = process.env.NEXT_PUBLIC_PINEHAUS_URL

export const googleLoginRedirectRoute = () => `${BASE_API_URL}/login/oauth2/code/google`

export const getMe = () => `${BASE_API_URL}/me`
