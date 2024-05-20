'use server'

import { revalidatePath, revalidateTag } from 'next/cache'

import { PRODUCT_FETCH_TAG } from 'api/Product/const'
import { productPageUrl } from 'utils/pages'

export default async function RevalidateProductAction(productId: number, productSlug: string) {
  const url = productPageUrl(productId, productSlug)

  revalidateTag(PRODUCT_FETCH_TAG)
  revalidatePath(url)

  return url
}
