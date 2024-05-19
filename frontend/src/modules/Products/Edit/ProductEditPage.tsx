'use client'

import { ArrowLeft } from '@carbon/icons-react'
import { Container, Flex, Spinner, useToast } from '@chakra-ui/react'
import { RevalidateProductAction } from 'actions'
import { FormikHelpers } from 'formik'
import { useUser } from 'hooks/authentication'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'

import { uploadImage } from 'api/Image/repository'
import { updateProduct } from 'api/Product/repository'
import { image as imageUrl } from 'api/routes'
import { ProductForm, ProductFormValues } from 'components/Product'
import { useErrorToast, useSavingToast, useSuccessToast } from 'components/Toast'
import { Product } from 'model/Product'
import { productPageUrl } from 'utils/pages'

interface Props {
  product: Product
}

export default function ProductEditPage({ product }: Props) {
  const { isUserLoading, isAuthenticated, user } = useUser()

  const { close } = useToast()

  const showSavingToast = useSavingToast()
  const showSuccessToast = useSuccessToast()
  const showErrorToast = useErrorToast()

  const { push } = useRouter()

  const handleSubmit = (values: ProductFormValues, helpers: FormikHelpers<ProductFormValues>) => {
    const toastId = showSavingToast()

    let uploadThumbnail = Promise.resolve(values.thumbnail === null ? null : product.thumbnail)

    if (values.thumbnail) {
      uploadThumbnail = uploadImage(values.thumbnail).then(({ image }) => imageUrl(image)!)
    }

    uploadThumbnail
      .then(thumbnail => updateProduct(product.id, { ...values, thumbnail }))
      .then(_product => RevalidateProductAction(_product.id, _product.slug))
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
    redirect(productPageUrl(product.id, product.slug))
  }

  return (
    <>
      <Container maxW="container.xl" py={16}>
        <Flex as={Link} href={productPageUrl(product.id, product.slug)} align="center" gap={2}>
          <ArrowLeft /> Back to product page
        </Flex>
        <ProductForm product={product} handleSubmit={handleSubmit} w="100%" />
      </Container>
    </>
  )
}
