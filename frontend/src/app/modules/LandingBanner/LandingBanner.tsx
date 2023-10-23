import 'bootstrap/dist/js/bootstrap.min.js'
import * as S from './styles'
import { Carousel, CarouselItem } from 'react-bootstrap'

export default function LandingBanner() {
  const stores = [
    {
      name: 'VinylVerse',
      imageUrl:
        'https://images.pexels.com/photos/6865916/pexels-photo-6865916.jpeg?auto=compress&cs=tinysrgb&w=2560&h=1440&dpr=1',
      description: 'A treasure trove of vintage and new vinyl, where music comes alive.',
    },
    {
      name: 'Nourish',
      imageUrl:
        'https://images.pexels.com/photos/1397514/pexels-photo-1397514.jpeg?auto=compress&cs=tinysrgb&w=2560&h=1440&dpr=1',
      description: 'Artisanal oasis offering global flavors, fresh produce, and culinary inspiration.',
    },
    {
      name: 'Bauhaus',
      imageUrl:
        'https://images.pexels.com/photos/4483774/pexels-photo-4483774.jpeg?auto=compress&cs=tinysrgb&w=2560&h=1440&dpr=1',
      description:
        ' Innovative art school emphasizing functional design, merging art, craft, and technology harmoniously.',
    },
  ]

  return (
    <Carousel>
      {stores.map(({ name, imageUrl, description }) => (
        <CarouselItem key={name}>
          <S.Banner>
            <S.BannerImage src={imageUrl} width={2000} height={600} alt="Banner image" />

            <S.BannerContent>
              <div>
                <S.BannerTitle className="px-3">
                  <strong>{name}</strong>
                </S.BannerTitle>
                <span>
                  <em>Featured seller</em>
                </span>
              </div>

              <div className="text-center py-3 px-5" style={{ maxWidth: '400px', backgroundColor: '#101010cc' }}>
                <p>{description}</p>
                <button className="btn btn-outline-light btn-lg rounded-1 mt-2">Shop now!</button>
              </div>
            </S.BannerContent>
          </S.Banner>
        </CarouselItem>
      ))}
    </Carousel>
  )
}
