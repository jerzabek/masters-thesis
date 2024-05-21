import { Products } from 'modules/Products/List'

interface Props {
  params: {
    id: string
  }
}

export default async function Page({ params }: Props) {
  const categoryId = Number(params.id)

  return (
    <>
      <Products categoryId={categoryId} />
    </>
  )
}
