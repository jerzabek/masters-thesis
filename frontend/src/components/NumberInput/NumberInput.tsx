import { Button, HStack, Input, InputProps, UseNumberInputProps, useNumberInput } from '@chakra-ui/react'

interface Props {
  numberInputProps?: UseNumberInputProps
  inputProps?: InputProps
}
export default function NumberInput({ numberInputProps, inputProps }: Props) {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    step: 1,
    defaultValue: 1,
    min: 1,
    max: 6,
    precision: 0,
    ...numberInputProps,
  })

  const inc = getIncrementButtonProps()
  const dec = getDecrementButtonProps()
  const input = getInputProps()

  return (
    <HStack maxW="320px">
      <Button {...dec}>-</Button>
      <Input {...input} {...inputProps} />
      <Button {...inc}>+</Button>
    </HStack>
  )
}
