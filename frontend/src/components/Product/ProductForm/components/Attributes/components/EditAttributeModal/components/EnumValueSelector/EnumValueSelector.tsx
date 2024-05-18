import { MultiValue, Select, useChakraSelectProps } from 'chakra-react-select'
import { useMemo } from 'react'

const getAttributeOptions = (options: string) => {
  return options
    .split(',')
    .filter(Boolean)
    .map(option => ({ label: option, value: option }))
}

export default function EnumValueSelector({
  options,
  value,
  onChange,
}: {
  options: string
  value: string
  onChange: (value: string) => void
}) {
  const parsedOptions = useMemo(() => options.split(',').map(option => ({ label: option, value: option })), [options])

  const handleChange = (newValue: MultiValue<{ label: string; value: string }>) => {
    onChange(newValue.map(({ value }) => value).join(','))
  }

  const selectProps = useChakraSelectProps({
    isMulti: true,
    value: getAttributeOptions(value),
    options: parsedOptions,
    onChange: handleChange,
  })

  return <Select {...selectProps} />
}
