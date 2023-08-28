/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import mainLeft from '../../../images/components/Main/mainLeft.svg';
import mainRight from '../../../images/components/Main/mainRight.svg';
import nowTogoButton from '../../../images/components/Main/nowTogoButton.svg';
import { useRecoilState } from "recoil"
import { MatchingControllerState } from "../../../recoil/atom/MatchingControllerState";
import { useNavigate } from "react-router-dom";

//slider기본세팅
const settings = {
  arrows: false,
  dots: false,
  infinite: true,
  slidesToShow: 2,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3300,
};

const TabImgs = () => {
  const [sortOption,handleSortOption] = useRecoilState(MatchingControllerState);
  const navigate = useNavigate()
  return (
    <s.SliderContainer {...settings}>
      <s.SlideImgWrapper>
        <s.SlideImg>
          <img src={mainLeft} alt="main-left" />
        </s.SlideImg>
        <s.SlideBottom css={{padding: '2rem'}}>
          <h1 css={s.textCss1}>우리 심심한데 전시나 볼과?</h1>
          <h1 css={s.textCss2}>이번주에 출발하는 전시회</h1>
          <s.textCssContainer3>
            <img onClick={()=>{
            handleSortOption('thisweek')
            navigate('/matching')
            }}
            css={s.textCss3} src={nowTogoButton} alt='togo-button'/>
          </s.textCssContainer3>
        </s.SlideBottom>
      </s.SlideImgWrapper>

      <s.SlideImgWrapper>
        <s.SlideImg >
          <img src={mainRight} alt="main-right" />
        </s.SlideImg>
        <s.SlideBottom css={{padding: '2rem'}}>
          <h1 css={s.textCss1}>어떤 전시회가 인기가 많을까?</h1>
          <h1 css={s.textCss2}>좋아요 많은 게시글</h1>
          <s.textCssContainer3>
            <img onClick={()=>{
            handleSortOption('like')
            navigate('/matching')
            }} css={s.textCss3} src={nowTogoButton} alt='togo-button'/>
          </s.textCssContainer3>
        </s.SlideBottom>
      </s.SlideImgWrapper>

    </s.SliderContainer>
  );
};
export default TabImgs;