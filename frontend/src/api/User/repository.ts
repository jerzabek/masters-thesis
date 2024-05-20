import { putJson } from 'utils/api'

import { UpdateUserPayload } from './interface'
import * as R from './routes'

export const updateUser = (id: string, payload: UpdateUserPayload) => putJson(R.updateUser(id), payload)
