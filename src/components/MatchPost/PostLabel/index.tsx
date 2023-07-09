/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import * as s from "./styles";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import COLORS from "../../../assets/color";
import ArrownDown from "../../../images/components/MatchPost/ArrowDown.svg";
import ArrowUp from "../../../images/components/MatchPost/ArrowUp.svg";

export default function MatchPostLabel() {
	const label = ["전시만보기", "2인관람"];
	const postStatusSelect = ["모집 중", "모집완료"];

	const [isStatusModalOpen, setIsStatusModalOpen] = useState<boolean>(false);
	const [postStatus, setPostStatus] = useState("모집완료");

	return (
		<div>
			<s.MatchPostContainer>
				<s.MatchPostLabelSection>
					<s.MatchPostLabel>
						{label.map((item) => (
							<div css={s.MatchPostLabelCss}>{item}</div>
						))}
					</s.MatchPostLabel>

					<s.MatchPostStatusContainer isStatusModalOpen={isStatusModalOpen}>
						<div
							onClick={() => {
								setIsStatusModalOpen(!isStatusModalOpen);
							}}
							css={{ display: "flex", padding: "6px 0px 6px 12px" }}
						>
							<div>{postStatus}</div>
							{!isStatusModalOpen ? (
								<img css={{ position: "relative", left: 6, bottom: 1 }} src={ArrownDown} alt="modalOpen-arrow"></img>
							) : (
								<img css={{ position: "relative", left: 6, bottom: 1 }} src={ArrowUp} alt="modalClose-arrow"></img>
							)}
						</div>
						<ul css={{ display: isStatusModalOpen ? "block" : "none" }}>
							<li
								css={{
									padding: "6px 0px 6px 12px",
									borderTop: `1px solid ${COLORS.main79}`,
									borderBottom: `1px solid ${COLORS.main79}`,
									boxSizing: "border-box",
								}}
							>
								모집 중
							</li>
							<li css={{ padding: "6px 0px 6px 12px" }}>모집 완료</li>
						</ul>
					</s.MatchPostStatusContainer>
				</s.MatchPostLabelSection>
			</s.MatchPostContainer>
		</div>
	);
}
