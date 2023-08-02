import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import * as s from "./styles";
import axios from "axios";

const GoogleLoginButton = () => {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const redirectUri = process.env.REACT_APP_GOOGLE_REDIRECT_URI;

  const handleCredentialResponse = async (authorization_code: CredentialResponse) => {
    axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/api/auth/google/oauth-uri`, {
      params: {
        redirectUri: redirectUri
      }
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

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