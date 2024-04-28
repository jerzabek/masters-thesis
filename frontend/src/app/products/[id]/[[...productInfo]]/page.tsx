import { getProduct } from 'api/Product/repository'
import { ProductPage } from 'modules/Product'

interface Props {
  params: {
    productInfo: string[]
    id: string
  }
}

export default async function Page({ params }: Props) {
  const [productSlug] = params.productInfo ?? []
  const productId = Number(params.id)

  const product = await getProduct(productId)

  return <ProductPage product={product} />
}
