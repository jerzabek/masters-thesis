import { CartItem } from 'model/Cart'
import { postJson } from 'utils/api'

import * as I from './interface'
import * as R from './routes'

export const purchaseCart = (products: CartItem[]) => postJson<I.CreatePurchaseResponse>(R.purchaseCart(), { products })
