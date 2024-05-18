'use client'

import { Container, useToast } from '@chakra-ui/react'
import { RevalidateProductAction } from 'actions'
import { FormikHelpers } from 'formik'
import { useRouter } from 'next/navigation'

import { updateProduct } from 'api/Product/repository'
import { useErrorToast, useSavingToast, useSuccessToast } from 'components/Toast'
import { Product } from 'model/Product'

import { ProductForm } from './components'
import { ProductFormValues } from './components/ProductForm'

interface Props {
  product: Product
}

export default function ProductEditPage({ product }: Props) {
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

  return (
    <>
      <Container maxW="container.xl" py={16}>
        <ProductForm product={product} handleSubmit={handleSubmit} w="100%" />
      </Container>
    </>
  )
}
