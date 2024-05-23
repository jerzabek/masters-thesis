'use server'

import { revalidatePath, revalidateTag } from 'next/cache'

import { PRODUCT_LIST_FETCH_TAG } from 'api/Product/const'
import { productListPageUrl } from 'utils/pages'

export default async function RevalidateProductListAction() {
  const url = productListPageUrl()

  revalidateTag(PRODUCT_LIST_FETCH_TAG)
  revalidatePath(url)

  return url
}
