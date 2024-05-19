import * as yup from 'yup'

import { Product } from 'model/Product'

import { ProductFormValues } from './interface'

export const ProductFormValidationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().optional(),
  sku: yup.string().required('SKU is required'),
  quantity: yup.number().required('Quantity is required').min(0, 'Quantity must be greater than or equal to 0'),
  price: yup.number().required('Price is required').min(0, 'Price must be greater than or equal to 0'),
  categoryId: yup.number().required('Category is required'),
  thumbnail: yup.string().optional(),
  attributes: yup.array().of(
    yup.object().shape({
      attributeId: yup.number().required('Attribute is required'),
      value: yup.string().required('Value is required'),
    })
  ),
})

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
