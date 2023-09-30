import * as S from './styles'

import Foodie from '../../../../public/images/banners/foodie.jpg'
import styled from 'styled-components'

export default function LandingBanner() {
  return (
    <S.Banner>
      <S.BannerImage src={Foodie} alt="Banner image" />

      <S.BannerContent>
        <div>
          <S.BannerTitle className="px-3">
            <strong>Foodie</strong>
          </S.BannerTitle>
          <span>
            <em>Featured seller</em>
          </span>
        </div>

        <div className="text-center py-3 px-5" style={{ maxWidth: '400px', backgroundColor: '#101010cc' }}>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates nam quam officiis dicta saepe
            voluptatibus iste possimus alias omnis cupiditate.
          </p>
          <p>Shop at our store! -Foodie</p>
          <button className="btn btn-success btn-lg rounded-1 mt-2">Shop now!</button>
        </div>
      </S.BannerContent>
    </S.Banner>
  )
}
