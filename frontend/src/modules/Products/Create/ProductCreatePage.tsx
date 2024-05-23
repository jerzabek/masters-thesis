'use client'

import { Container, Flex, Spinner, useToast } from '@chakra-ui/react'
import { RevalidateProductAction, RevalidateProductListAction } from 'actions'
import { FormikHelpers } from 'formik'
import { useUser } from 'hooks/authentication'
import { redirect, useRouter } from 'next/navigation'

import { uploadImage } from 'api/Image/repository'
import { createProduct } from 'api/Product/repository'
import { image as imageUrl } from 'api/routes'
import { ProductForm, ProductFormValues } from 'components/Product'
import { useErrorToast, useSavingToast, useSuccessToast } from 'components/Toast'

export default function ProductCreatePage() {
  const { isUserLoading, isAuthenticated, user } = useUser()

  const { close } = useToast()

  const showSavingToast = useSavingToast()
  const showSuccessToast = useSuccessToast()
  const showErrorToast = useErrorToast()

  const { push } = useRouter()

  const handleSubmit = (values: ProductFormValues, helpers: FormikHelpers<ProductFormValues>) => {
    const toastId = showSavingToast()

    let uploadThumbnail: Promise<string | null> = Promise.resolve(null)

    if (values.thumbnail) {
      uploadThumbnail = uploadImage(values.thumbnail).then(({ image }) => imageUrl(image)!)
    }

    uploadThumbnail
      .then(thumbnail => createProduct({ ...values, thumbnail }))
      .then()
      .then(_product => {
        RevalidateProductListAction().catch(console.error)

        return RevalidateProductAction(_product.id, _product.slug)
      })
      .then(url => {
        showSuccessToast()

        push(url)
      })
      .catch(e => {
        console.error(e)
        showErrorToast()
      })
      .finally(() => {
        helpers.setSubmitting(false)
        close(toastId)
      })
  }

  if (isUserLoading) {
    return (
      <Flex justify="center" align="center">
        <Spinner />
      </Flex>
    )
  }

  if (!isAuthenticated || !user) {
    redirect(`/login`)
  }

  return (
    <Container maxW="container.xl" py={16}>
      <ProductForm handleSubmit={handleSubmit} w="100%" />
    </Container>
  )
}
