import { Cart } from 'model/Cart'

export const getCartCount = (cart: Cart) => {
  return cart.items.reduce((acc, item) => acc + item.quantity, 0)
}
