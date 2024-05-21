export const productListPageUrl = () => `/products`
export const productPageUrl = (productId: number, productSlug: string) => `/products/${productId}/${productSlug}`
export const productEditUrl = (productId: number, productSlug: string) => `/products/${productId}/${productSlug}/edit`
export const productCreateUrl = () => `/products/create`

export const categoryPageUrl = (categoryId: number, categorySlug: string) =>
  `/products/category/${categoryId}/${categorySlug}`
