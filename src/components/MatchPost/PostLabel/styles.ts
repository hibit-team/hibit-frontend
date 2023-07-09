import styled from "@emotion/styled";
import COLORS from "../../../assets/color";
import { css } from "@emotion/react";
import { color } from "framer-motion";

export const MatchPostContainer = styled.div`
	box-sizing: border-box;
	margin-top: 40px;
	width: 920px;
`;
export const MatchPostLabelSection = styled.div`
	width: 100%;
	height: 82px;
	border-radius: 1rem 1rem 0 0;
	background: ${COLORS.main79};
	display: flex;
	justify-content: space-between;
`;

export const MatchPostLabel = styled.div`
	display: flex;
	margin: 1.5rem;
	font-weight: 500;
`;
export const MatchPostLabelCss = css`
	box-sizing: border-box;
	max-height: 34px;
	border: 1px solid white;
	border-radius: 10px;
	padding: 6px 12px;
	font-size: 18px;
	color: white;
	margin: 0 8px;
`;
export const MatchPostStatus = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	box-sizing: border-box;
	min-width: 109px;
	border: 1px solid white;
	border-radius: 10px;
	font-size: 18px;
	color: white;
	margin: 1.5rem;
	font-weight: 500;
	padding: 6px 0px 6px 12px;
	cursor: pointer;

	// & > :nth-child(n + 2):hover {
	//   cursor: pointer;
	//   scale:1.03;
	//   transition: all 0.2s ease-in;
	//   background:${COLORS.sub_Friend};
	//   border:none;
	//   box-shadow: 3px 2px 73px -5px rgba(206,12,222,0.77);
	// -webkit-box-shadow: 3px 2px 73px -5px rgba(206,12,222,0.77);
	// -moz-box-shadow: 3px 2px 73px -5px rgba(206,12,222,0.77);
`;



export const MatchPostStatusArrowCss = css`
	font-size: 2rem;
	position: relative;
	right: 2px;
`;

export const MatchPostStatusSelect = styled.div`
	left: 20px;
	width: 109px;
	border: 1px solid white;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: ${COLORS.main24};
	color: white;
`;

export const postStatusCss = css`
	position: relative;
	right: 7px;
	display: flex;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
	width: 100%;
	height: 1.7rem;
	font-size: 18px;
	color: ${COLORS.white};

	background-image: radial-gradient(circle at 51.02% 50.59%, #bfa4eb 0, #bba0e8 50%, #b79ce5 100%);

	border-radius: 0.5rem;
	border: 2px solid ${COLORS.main42};
	padding: 10px;
	margin: 1.5px 0;
	z-index: 10;
`;

export const MatchPostStatusContainer = styled.div<{isStatusModalOpen:boolean}>`
	height: ${(props) => (props.isStatusModalOpen ? "102px" : "34px")};
	background: white;
	border-radius: 10px;
	border: 1px solid ${COLORS.main79};
	color: ${COLORS.main79};
	margin: 24px;

	box-sizing: border-box;
	width: 108px;
	font-size: 18px;
	font-weight: 500;
	display: flex;
	justify-content: center;
	flex-direction: column;
	position: relative;
	z-index:10;
`;


