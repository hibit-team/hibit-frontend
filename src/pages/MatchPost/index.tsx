import React from "react";
import LayoutTemplate from "../../components/Common/LayoutTemplate";
import * as s from './styles'
import MatchPostLabel from "../../components/MatchPost/PostLabel";
import MatchPostArticle from "../../components/MatchPost/PostArticle";
export default function MatchingPostPage() {
	return (
			<LayoutTemplate>
        <s.Wrapper>
          <MatchPostLabel></MatchPostLabel>
					<MatchPostArticle></MatchPostArticle>
        </s.Wrapper>
			</LayoutTemplate>
	);
}
