import { Product } from 'model/Product'

export const areAllProductOptionsSelected = (product: Product, selectedOptions: Record<number, string | undefined>) => {
  return product.attributes
    .filter(({ attribute }) => !!attribute.options && attribute.options.length > 0)
    .every(({ attribute }) => {
      const selectedValue = selectedOptions[attribute.id]

      return selectedValue !== undefined && selectedValue !== '' && attribute.options.includes(selectedValue)
    })
}
