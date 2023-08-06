import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import * as s from "./styles";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { accessTokenState } from "../../../recoil/atom/AccessToken";

const GoogleLoginButton = () => {
  const authorizationURL = process.env.REACT_APP_AUTHORIZATION_URL;
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const redirectUri = process.env.REACT_APP_GOOGLE_REDIRECT_URI;
  const scope = process.env.REACT_APP_GOOGLE_SCOPE;
  const url = `${authorizationURL}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline`;

  // const atk = useRecoilValue(accessTokenState);
    
  const handleCredentialResponse = async (authorization_code: CredentialResponse) => {
    axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/api/auth/google/oauth-uri`, {
      params: {
        redirectUri: redirectUri
      }
    })
      .then((res) => {
        window.location.href = url;        
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