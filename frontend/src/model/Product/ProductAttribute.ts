export enum ProductAttributeType {
  ENUM = 'ENUM',
  STRING = 'STRING',
  NUMBER = 'NUMBER',
  BOOLEAN = 'BOOLEAN',
}

interface ProductAttributeCommon {
  id: number
  name: string
  value: string
}

export type ProductAttribute = ProductAttributeCommon &
  (
    | {
        type: ProductAttributeType.ENUM
        options: string[]
      }
    | {
        type: ProductAttributeType.STRING
        options: string
      }
    | {
        type: ProductAttributeType.NUMBER
        options: string
      }
    | {
        type: ProductAttributeType.BOOLEAN
        options: string
      }
  )

export interface ProductAttributeValue {
  attribute: ProductAttribute
  value: string
}
