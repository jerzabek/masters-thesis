'use server'

import { revalidatePath } from 'next/cache'

export default async function RevalidateProductAction() {
  revalidatePath('/products/[id]/[slug]', 'page')
}
