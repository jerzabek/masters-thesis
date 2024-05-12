import * as yup from 'yup'

import { Product } from 'model/Product'

import { ProductFormValues } from './interface'

export const ProductFormValidationSchema = yup.object().shape({})

export const mapProductToUserFormValues = (product?: Product): ProductFormValues => {
  if (!product) {
    return {
      name: '',
      description: '',
      sku: '',
      quantity: 0,
      thumbnail: '',
      attributes: [],
    }
  }

  return {
    name: product.name,
    description: product.description,
    price: product.price,
    categoryId: product.category.id,
    sku: product.sku,
    quantity: product.quantity,
    thumbnail: product.thumbnail,
    attributes: product.attributes.map(attribute => ({
      attributeId: attribute.attribute.id,
      value: attribute.value,
    })),
  }
}
