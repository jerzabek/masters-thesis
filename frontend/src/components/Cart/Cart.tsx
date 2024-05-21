import { createContext, useContext, useEffect, useState } from 'react'

import { Cart } from 'model/Cart'
import { Product } from 'model/Product'
import { removeUndefined } from 'utils/arrays'

import { CLEAR_CART_INTERVAL } from './const'

interface ICartContext {
  cart: Cart
  isCartLoaded: boolean
  addItem: (productId: number, quantity: number, attributes?: Record<number, string | undefined>) => void
  removeItem: (productId: number) => void
  updateItem: (product: Product, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<ICartContext>(undefined!)

export default function CartContextProvider({ children }: { children: React.ReactNode }) {
  const [cart, _setCart] = useState<Cart>({ items: [], lastModified: Date.now() })
  const [isCartLoaded, setIsCartLoaded] = useState(false)

  const setCart = (cart: Cart) => {
    _setCart({ ...cart, lastModified: Date.now() })

    try {
      localStorage.setItem('cart', JSON.stringify(cart))
    } catch (e) {
      console.error('Failed to save cart to local storage', e)
    }
  }

  const addItem = (product: number, quantity: number, attributes?: Record<number, string | undefined>) => {
    const existingItem = cart.items.find(item => item.product === product)

    if (existingItem) {
      // In case of existing item we ignore possibility of changing attributes
      existingItem.quantity += quantity
    } else {
      cart.items.push({ product, quantity, attributes: removeUndefined(attributes) })
    }

    setCart(cart)
  }

  const removeItem = (productId: number) => {
    cart.items = cart.items.filter(item => item.product !== productId)
    setCart(cart)
  }

  const updateItem = (product: Product, quantity: number) => {
    const existingItem = cart.items.find(item => item.product === product.id)

    if (existingItem) {
      existingItem.quantity = quantity
    }

    setCart(cart)
  }

  const clearCart = () => {
    setCart({ items: [], lastModified: Date.now() })
  }

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart')

      if (savedCart) {
        const parsedCart = JSON.parse(savedCart)

        // Cart is stale - don't load it
        if (parsedCart.lastModified < Date.now() - CLEAR_CART_INTERVAL) {
          clearCart()
        } else {
          setCart(parsedCart)
        }
      }

      setIsCartLoaded(true)
    } catch (e) {
      console.error('Failed to load cart from local storage', e)
    }
  }, [])

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartLoaded,
        addItem,
        removeItem,
        updateItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used within a CartContextProvider')
  }

  return context
}
