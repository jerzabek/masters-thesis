import { CartItem } from 'model/Cart'
import { getJson, postJson } from 'utils/api'

import * as I from './interface'
import * as R from './routes'

export const purchaseCart = (products: CartItem[]) => postJson<I.CreatePurchaseResponse>(R.purchaseCart(), { products })

export const getPurchaseHistory = () => getJson<I.PurchaseHistoryResponse>(R.getPurchaseHistory())
