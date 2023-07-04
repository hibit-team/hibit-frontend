import React from "react";
import LayoutTemplate from "../../components/Common/LayoutTemplate";
import * as s from './styles'
import MatchPost from "../../components/MatchPost";
export default function MatchingPostPage() {
	return (
			<LayoutTemplate>
        <s.Wrapper>
          <MatchPost></MatchPost>
        </s.Wrapper>
			</LayoutTemplate>
	);
}
