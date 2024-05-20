export interface ProductFormValues {
  name: string
  description: string
  sku: string
  quantity: number
  price?: number
  attributes: Array<{
    attributeId: number
    value: string
  }>
  categoryId?: number
  thumbnail?: File
}
