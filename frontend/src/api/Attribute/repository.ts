import { getJson } from 'utils/api'

import * as I from './interface'
import * as R from './routes'

export const getAttributes = () => getJson<I.AttributesResponse>(R.getAttributes())
