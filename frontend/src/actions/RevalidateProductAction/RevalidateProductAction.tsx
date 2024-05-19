'use server'

import { revalidatePath } from 'next/cache'

import { productPageUrl } from 'utils/pages'

export default async function RevalidateProductAction(productId: number, productSlug: string) {
  const url = productPageUrl(productId, productSlug)

  revalidatePath(url)

  return url
}
