import * as yup from 'yup'

import { User } from 'model/User'

import { UserFormValues } from './interface'

export const mapUserToUserFormValues = (user?: User): UserFormValues => {
  if (!user) {
    return {
      email: '',
      username: '',
      firstName: '',
      lastName: '',
      avatarUrl: '',
    }
  }

  return {
    email: user.email,
    username: user.username ?? '',
    firstName: user.firstName,
    lastName: user.lastName,
    avatarUrl: user.avatarUrl ?? '',
  }
}

export const UserFormValidationSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
})
