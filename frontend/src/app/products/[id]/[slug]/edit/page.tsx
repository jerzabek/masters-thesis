import { getProduct } from 'api/Product/repository'
import ProductEditPage from 'modules/Products/Edit'

interface Props {
  params: {
    id: string
  }
}

export default async function Page({ params }: Props) {
  const productId = Number(params.id)

  const product = await getProduct(productId)

  return <ProductEditPage product={product} />
}
