import { Formik, FormikHelpers, useFormikContext } from 'formik'
import { Product } from 'model/Product'
import { ProductFormValidationSchema, mapProductToUserFormValues } from './utils'
import { ProductFormValues } from './interface'
import {
  Box,
  Flex,
  FlexProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Text,
} from '@chakra-ui/react'

interface Props extends FlexProps {
  handleSubmit: (values: ProductFormValues, formikHelpers: FormikHelpers<ProductFormValues>) => void
  product?: Product
}

function ProductForm({ isNew }: { isNew: boolean }) {
  const { values, errors, setFieldValue } = useFormikContext<ProductFormValues>()

  const handleFirstNameChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setFieldValue(field, e.target.value)

  const handleNumberChange = (field: string) => (value: string) => setFieldValue(field, value)

  return (
    <>
      <Text textStyle="h1">{isNew ? 'Create new product' : 'Update product'}</Text>

      {/* Product form fields */}
      <Flex gap={4}>
        <FormControl flex={2}>
          <FormLabel>Product name</FormLabel>
          <Input isRequired value={values.name} onChange={handleFirstNameChange('name')} />
          {!!errors.name && <FormErrorMessage>{errors.name}</FormErrorMessage>}
        </FormControl>

        <FormControl flex={1}>
          <FormLabel>SKU</FormLabel>
          <Input isRequired value={values.sku} onChange={handleFirstNameChange('sku')} maxLength={10} />
          {!!errors.sku && <FormErrorMessage>{errors.sku}</FormErrorMessage>}
        </FormControl>
      </Flex>

      <Flex gap={4}>
        <Flex flex={2} gap={4}>
          <FormControl flex={1}>
            <FormLabel>Price</FormLabel>
            <NumberInput isRequired value={values.price} onChange={handleNumberChange('price')}>
              <NumberInputField />
            </NumberInput>
            {!!errors.price && <FormErrorMessage>{errors.price}</FormErrorMessage>}
          </FormControl>

          <FormControl flex={1}>
            <FormLabel>Quantity in stock</FormLabel>
            <NumberInput isRequired value={values.quantity} onChange={handleNumberChange('quantity')}>
              <NumberInputField />
            </NumberInput>
            {!!errors.quantity && <FormErrorMessage>{errors.quantity}</FormErrorMessage>}
          </FormControl>
        </Flex>

        <Box flex={1} />
      </Flex>
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
