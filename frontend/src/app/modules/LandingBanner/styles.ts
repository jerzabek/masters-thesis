import Image from 'next/image'
import styled from 'styled-components'

export const Banner = styled.div`
  position: relative;

  width: 100%;
  height: 600px;
`

export const BannerImage = styled(Image)`
  width: 100%;
  height: 100%;

  object-fit: cover;
`

export const BannerTitle = styled.h1`
  font-size: 7em;
  background-color: #000000df;
`

export const BannerContent = styled.div`
  position: absolute;

  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  width: 100%;
  max-width: 1200px;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`
