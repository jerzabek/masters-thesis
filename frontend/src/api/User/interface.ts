import { User } from 'model/User'

export type UpdateUserPayload = Pick<User, 'firstName' | 'lastName' | 'username' | 'avatarUrl'>
