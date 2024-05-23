import { revalidateTag } from 'next/cache'

import { PRODUCT_FETCH_TAG } from 'api/Product/const'
import { getProduct } from 'api/Product/repository'
import ProductEditPage from 'modules/Products/Edit'

interface Props {
  params: {
    id: string
  }
}

export default async function Page({ params }: Props) {
  revalidateTag(PRODUCT_FETCH_TAG)

  const productId = Number(params.id)

  const product = await getProduct(productId)

  return <ProductEditPage product={product} />
}
