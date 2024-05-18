'use client'

import { ArrowLeft } from '@carbon/icons-react'
import { Container, Flex, useToast } from '@chakra-ui/react'
import { RevalidateProductAction } from 'actions'
import { FormikHelpers } from 'formik'
import { useUser } from 'hooks/authentication'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'

import { updateProduct } from 'api/Product/repository'
import { useErrorToast, useSavingToast, useSuccessToast } from 'components/Toast'
import { Product } from 'model/Product'
import { productPageUrl } from 'utils/pages'

import { ProductForm } from './components'
import { ProductFormValues } from './components/ProductForm'

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

    updateProduct(product.id, values)
      .then(RevalidateProductAction)
      .then(() => {
        showSuccessToast()

        push(`/products/${product.id}/${product.slug}`)
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
    return null
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
