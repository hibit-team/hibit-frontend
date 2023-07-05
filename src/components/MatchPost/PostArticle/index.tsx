/** @jsxImportSource @emotion/react */
import React from "react";
import * as s from "./styles";
import { css } from "@emotion/react";
import Ellipsis from "../../../images/components/MatchPost/ellipsis.svg";
import ProfileDefault from "../../../images/components/MatchPost/profileDefault.svg";
import COLORS from "../../../assets/color";
export default function MatchPostArticle() {
	const dateOption = ["0000-00-00-오전", "0000-00-00-오후", "0000-00-00-오후"];
	return (
		<div>
			<s.MatchArticleWrapper>
				<s.ArticleTitleSection>
					<div
						css={css`
							display: flex;
							flex: 1 1 auto;
							font-size: 24px;
							font-weight: 900;
						`}
					>
						게시글 명 게시글 명 게시글 공백포함 최대 30자까지
					</div>
					<img
						css={css`
							margin: 6px;
						`}
						src={ProfileDefault}
						alt="defaultImage"
					/>
					<div
						css={css`
							font-size: 20px;
							color: #797979;
							font-weight: 900;
							margin: 6px;
						`}
					>
						닉네임123123{" "}
					</div>
					<div
						css={css`
							margin: 6px;
							border-left: 1px solid #c9c9c9;
							height: 20px;
							box-sizing: border-box;
							padding-left: 0.5rem;
							font-size: 20px;
							font-weight: 500;
							color: #797979;
						`}
					>
						7시간 전{" "}
					</div>
					<img
						css={css`
							margin: 6px;
						`}
						src={Ellipsis}
						alt="ellipsis"
					/>
				</s.ArticleTitleSection>
				<s.ArticleDateSection>
					<div
						css={css`
							flex: 1 1 auto;
							font-size: 20px;
							font-weight: 900;
							color: ${COLORS.Gray3};
						`}
					>
						관람희망날짜
					</div>
					{dateOption.map((day) => (
						<div css={ArticleDateCss}>{day}</div>
					))}
				</s.ArticleDateSection>

        <s.ArticlePlaceTogoSection>
          <div css={css`
          flex: 0 1 250px;
          font-size:20px; font-weight:900;
          color: ${COLORS.Gray3};
          `}>가고 싶은 전시회</div>
          <div css={css`
          font-size:20px; font-weight:500;
          color: ${COLORS.Gray3}`}
          >뚝섬 미술관 인사이드미 전시회</div>
        </s.ArticlePlaceTogoSection>
			</s.MatchArticleWrapper>
		</div>
	);
}

export const ArticleDateCss = css`
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 193px;
	height: 56px;
	background: ${COLORS.Gray1};
	border-radius: 10px;
	margin: 0.5rem;
	color: ${COLORS.Gray3};
	font-size: 18px;
	border: 1px solid ${COLORS.Gray2};
`;
