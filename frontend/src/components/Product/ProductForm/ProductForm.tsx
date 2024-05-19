import { Save } from '@carbon/icons-react'
import {
  Box,
  Button,
  Flex,
  FlexProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Select,
  Spinner,
  Text,
  Textarea,
} from '@chakra-ui/react'
import { Formik, FormikHelpers, useFormikContext } from 'formik'
import { useEffect, useState } from 'react'

import { getCategories } from 'api/Category/repository'
import { Category } from 'model/Category'
import { Product } from 'model/Product'

import { Attributes } from './components'
import { ProductFormValues } from './interface'
import { ProductFormValidationSchema, mapProductToUserFormValues } from './utils'

interface Props extends FlexProps {
  handleSubmit: (values: ProductFormValues, formikHelpers: FormikHelpers<ProductFormValues>) => void
  product?: Product
}

function ProductForm({ isNew }: { isNew: boolean }) {
  const [categories, setCategories] = useState<Category[]>()

  const { values, errors, touched, setFieldValue, handleBlur, submitForm, isSubmitting, isValidating, isValid, dirty } =
    useFormikContext<ProductFormValues>()

  useEffect(() => {
    getCategories().then(setCategories).catch(console.error)
  }, [])

  const handleFirstNameChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setFieldValue(field, e.target.value)

  const handleNumberChange = (field: string) => (value: string) => setFieldValue(field, value)

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = +e.target.value
    setFieldValue('categoryId', categoryId === 0 ? undefined : categoryId)
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setFieldValue('description', e.target.value)

  if (!categories) {
    return (
      <Flex justify="center" align="center">
        <Spinner />
      </Flex>
    )
  }

  return (
    <>
      <Flex justify="space-between" align="center" flexDirection={['column', 'column', 'row']} gap={4}>
        <Text textStyle="h1">{isNew ? 'Create product listing' : 'Update product'}</Text>

        <Button
          onClick={submitForm}
          isDisabled={isSubmitting || isValidating || !isValid || !dirty}
          colorScheme="green"
        >
          <Save width={24} height={24} style={{ marginRight: '8px' }} /> Save product
        </Button>
      </Flex>

      {/* Product form fields */}
      <Flex gap={4} flexDirection={['column', 'column', 'row']}>
        <FormControl
          flex={2}
          isRequired
          isInvalid={typeof errors.name !== 'undefined' && touched.name}
          onBlur={handleBlur}
        >
          <FormLabel>Product name</FormLabel>
          <Input
            isRequired
            value={values.name}
            onChange={handleFirstNameChange('name')}
            name="name"
            onBlur={handleBlur}
          />
          <FormErrorMessage>{errors.name}</FormErrorMessage>
        </FormControl>

        <FormControl flex={1} isRequired isInvalid={typeof errors.sku !== 'undefined' && touched.sku}>
          <FormLabel>SKU</FormLabel>
          <Input
            isRequired
            value={values.sku}
            onChange={handleFirstNameChange('sku')}
            name="sku"
            maxLength={10}
            onBlur={handleBlur}
          />
          <FormErrorMessage>{errors.sku}</FormErrorMessage>
        </FormControl>
      </Flex>

      <Flex gap={4} flexDirection={['column', 'column', 'row']}>
        <Flex flex={2} gap={4} flexDirection={['column', 'column', 'row']}>
          <FormControl flex={1} isRequired isInvalid={typeof errors.price !== 'undefined' && touched.price}>
            <FormLabel>Price</FormLabel>
            <NumberInput
              isRequired
              value={values.price}
              onChange={handleNumberChange('price')}
              name="price"
              onBlur={handleBlur}
            >
              <NumberInputField />
            </NumberInput>
            <FormErrorMessage>{errors.price}</FormErrorMessage>
          </FormControl>

          <FormControl flex={1} isRequired isInvalid={typeof errors.quantity !== 'undefined' && touched.quantity}>
            <FormLabel>Quantity in stock</FormLabel>
            <NumberInput
              isRequired
              value={values.quantity}
              onChange={handleNumberChange('quantity')}
              name="quantity"
              onBlur={handleBlur}
            >
              <NumberInputField />
            </NumberInput>
            <FormErrorMessage>{errors.quantity}</FormErrorMessage>
          </FormControl>
        </Flex>

        <Box flex={1} />
      </Flex>

      <Flex gap={4} flexDirection={['column', 'column', 'row']}>
        <Flex flex={2} flexDirection={['column', 'column', 'row']}>
          <FormControl isRequired isInvalid={typeof errors.categoryId !== 'undefined' && touched.categoryId}>
            <FormLabel>Category</FormLabel>
            <Select
              placeholder="Category"
              value={values.categoryId}
              onChange={handleCategoryChange}
              onBlur={handleBlur}
              name="categoryId"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
            <FormErrorMessage>{errors.categoryId}</FormErrorMessage>
          </FormControl>
        </Flex>

        <Box flex={1} />
      </Flex>

      <Box>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea value={values.description} onChange={handleDescriptionChange} rows={6} />
        </FormControl>
      </Box>

      <Box>
        <Attributes />
      </Box>
    </>
  )
}

export default function ProductFormWrapper({ product, handleSubmit, ...flexProps }: Props) {
  return (
    <Flex w="700px" flexDirection="column" gap="24px" {...flexProps}>
      <Formik
        initialValues={mapProductToUserFormValues(product)}
        initialStatus={product ?? {}}
        validationSchema={ProductFormValidationSchema}
        validateOnChange
        onSubmit={handleSubmit}
      >
        <ProductForm isNew={typeof product === 'undefined'} />
      </Formik>
    </Flex>
  )
}
