import Image from 'next/image'
import styled from 'styled-components'

export const ProductImage = styled(Image)`
  object-fit: contain;
  object-position: center;
  overflow: hidden;

  width: 100%;
  height: 100%;

  transition: scale 0.1s ease-in-out;

  &:hover {
    scale: 1.1;

    transition: scale 0.1s ease-in-out;
  }
`
