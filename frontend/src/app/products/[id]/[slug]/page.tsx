import { getProduct } from 'api/Product/repository'
import { ProductPage } from 'modules/Products/Product'

interface Props {
  params: {
    id: string
  }
}

export default async function Page({ params }: Props) {
  const productId = Number(params.id)

  const product = await getProduct(productId)

  return <ProductPage product={product} />
}
