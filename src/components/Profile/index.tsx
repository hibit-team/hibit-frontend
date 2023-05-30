import { IimgProps } from "../../pages/MyProfile";
import * as s from "./styles";
import CloseBtn from "../../images/components/Profile/CloseBtn.svg";

const ProfileImage = ({imgURL, isFirst, isEditMode, imgList, setImgList}: IimgProps) => {
  
  const onClickCloseBtn = () => {
    const newImgList = imgList.filter((item) => item !==imgURL);
    if(newImgList.length === 0) setImgList([]);
    else setImgList(newImgList);
    console.log(newImgList)
  };

  return (
    <s.Wrapper>
      {
        isFirst ? <s.TitleImageText>대표</s.TitleImageText> : null
      }
      {
        isEditMode ? 
        <s.ClostButtonWrapper onClick={onClickCloseBtn}>
          <img src={CloseBtn} alt="close button" />
        </s.ClostButtonWrapper> :
        null
      }
      <s.ImageItem src={imgURL} alt="image item" />
    </s.Wrapper>
  );
};

export default ProfileImage;
