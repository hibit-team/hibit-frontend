/** @jsxImportSource @emotion/react */
import * as s from "./styles";

const settings = {
  arrows: false,
  dots: false,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3300,
  centerMode: true,
};

const ReviewSlider = () => {
  const review1 = "호불호가 많이 갈리는 취향의 전시회를 함께해서 좋았어요!";
  const review2 = "함께 볼 친구가 없어 아쉬웠는데 메이트와 함께라서 재밌고 든든했어요!";
  const review3 = "메이트를 만나 전시회를 감상하면서 보는 재미가 2배가 되었어요 :)";
  const review4 = "관람 스타일이 비슷한 메이트를 만나서 편안하게 관람 했어요.";

  const writer1 = "개죽이";
  const writer2 = "이현떠";
  const writer3 = "쩨임스";
  const writer4 = "시면준";
  return (
    <s.SliderContainer {...settings}>
      <s.ReviewWrapper>
        <s.ReviewerImg />
        <s.ReviewText>{review1}</s.ReviewText>
        <s.ReviewWriter>{writer1} 님</s.ReviewWriter>
      </s.ReviewWrapper>

      <s.ReviewWrapper>
        <s.ReviewerImg />
        <s.ReviewText>{review2}</s.ReviewText>
        <s.ReviewWriter>{writer2} 님</s.ReviewWriter>
      </s.ReviewWrapper>

      <s.ReviewWrapper>
        <s.ReviewerImg />
        <s.ReviewText>{review3}</s.ReviewText>
        <s.ReviewWriter>{writer3} 님</s.ReviewWriter>
      </s.ReviewWrapper>

      <s.ReviewWrapper>
        <s.ReviewerImg />
        <s.ReviewText>{review4}</s.ReviewText>
        <s.ReviewWriter>{writer4} 님</s.ReviewWriter>
      </s.ReviewWrapper>
    </s.SliderContainer>
  );
}

export default ReviewSlider;