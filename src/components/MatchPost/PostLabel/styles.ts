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

export const MatchPostStatusContainer = styled.div<{isStatusModalOpen:boolean}>`
	height: ${(props) => (props.isStatusModalOpen ? "96px" : "34px")};
	transition: height 0.2s linear;
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


