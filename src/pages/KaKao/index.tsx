import React from 'react';
import * as s from "./styles";

const KaKao = () => {
  const href = window.location.href;
  const params = new URL(document.URL).searchParams;
  const code = params.get("code");
  console.log({href}, {code});

  /* 서버로 code값 보내는 로직 추가 필요 */
  /* 이후 서버에서 jwt 생성하고 access token 클라이언트로 받음 */

  return (
    <s.Wrapper>
      KaKao
    </s.Wrapper>
  )
}

export default KaKao;