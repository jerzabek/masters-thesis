import { Formik, FormikHelpers, useFormikContext } from 'formik'
import { UserFormValidationSchema, mapUserToUserFormValues } from './utils'
import { User } from 'model/User'
import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react'
import { UserFormValues } from './interface'

interface Props {
  user?: User
  handleSubmit: (values: UserFormValues, formikHelpers: FormikHelpers<UserFormValues>) => void
}

export default function UserFormWrapper({ user, handleSubmit }: Props) {
  return (
    <Formik
      initialValues={mapUserToUserFormValues(user)}
      validationSchema={UserFormValidationSchema}
      validateOnChange
      onSubmit={handleSubmit}
    >
      <UserForm />
    </Formik>
  )
}

function UserForm() {
  const { values, errors, setFieldValue, dirty, isValid, isSubmitting, submitForm } = useFormikContext<UserFormValues>()

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setFieldValue('firstName', e.target.value)
  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setFieldValue('lastName', e.target.value)
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => setFieldValue('username', e.target.value)

  return (
    <>
      <Flex gap={4} mb={4}>
        <FormControl flex={1}>
          <FormLabel>Email</FormLabel>
          <Input type="email" value={values.email} disabled />
        </FormControl>

        <Box flex={2} />
      </Flex>

      <Flex gap={4} mb={4}>
        <FormControl flex={1} isInvalid={!!errors.firstName}>
          <FormLabel>First name</FormLabel>
          <Input value={values.firstName} onChange={handleFirstNameChange} />
          {!!errors.firstName && <FormErrorMessage>{errors.firstName}</FormErrorMessage>}
        </FormControl>

        <FormControl flex={1} isInvalid={!!errors.lastName}>
          <FormLabel>Last name</FormLabel>
          <Input value={values.lastName} onChange={handleLastNameChange} />
          {!!errors.lastName && <FormErrorMessage>{errors.lastName}</FormErrorMessage>}
        </FormControl>

        <Box flex={1} />
      </Flex>

      <Flex gap={4} mb={4}>
        <FormControl flex={1}>
          <FormLabel>Username</FormLabel>
          <Input value={values.username} onChange={handleUsernameChange} />
        </FormControl>

        <Box flex={2} />
      </Flex>

      <Flex justify="end">
        <Button onClick={submitForm} isDisabled={!dirty || !isValid} isLoading={isSubmitting} colorScheme="green">
          Save
        </Button>
      </Flex>
    </>
  )
}
