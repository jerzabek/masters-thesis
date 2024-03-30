import { getJson } from 'utils/api'
import * as R from './routes'

import { IGetMeResponse } from './interface'

export const getMe = () => getJson<IGetMeResponse>(R.getMe())
