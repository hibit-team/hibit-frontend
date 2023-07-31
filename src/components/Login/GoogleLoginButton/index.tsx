import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import * as s from "./styles";
import axios from "axios";

const GoogleLoginButton = () => {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  console.log({clientId});

  const handleCredentialResponse = async (authorization_code: CredentialResponse) => {
    console.log(authorization_code)
    const body = {
      code: authorization_code.credential
    };
    console.log(body)
    // axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}api/auth/google/token`, body, {
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // })
    //   .then((data) => {
    //     console.log({data});
    //     // 브라우저에서 토큰 관리
    //   })
    //   .catch((err) => {
    //     console.error({err});
    //   });
  };

  return (
    <s.Wrapper>
      <GoogleOAuthProvider clientId={clientId!}>
        <GoogleLogin 
          onSuccess={(authorization_code: CredentialResponse) => {
            handleCredentialResponse(authorization_code);
          }}
          onError={() => console.log("err")}
        />
      </GoogleOAuthProvider>
    </s.Wrapper>
  )
};

export default GoogleLoginButton;