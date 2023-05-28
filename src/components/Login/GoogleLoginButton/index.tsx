import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import * as s from "./styles";

const GoogleLoginButton = () => {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const handleCredentialResponse = (response: CredentialResponse) => {
    const responsePayload = decodeJwtResponse(response.credential!);
    console.log({responsePayload})
    console.log("ID: " + responsePayload.sub);
    console.log('Full Name: ' + responsePayload.name);
    console.log('Given Name: ' + responsePayload.given_name);
    console.log('Family Name: ' + responsePayload.family_name);
    console.log("Image URL: " + responsePayload.picture);
    console.log("Email: " + responsePayload.email);
  };

  const decodeJwtResponse = (token: string) => {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };

  return (
    <s.Wrapper>
      <GoogleOAuthProvider clientId={clientId!}>
        <GoogleLogin 
          onSuccess={(res: CredentialResponse) => {
            handleCredentialResponse(res);
          }}
          onError={() => console.log("err")}
        />
      </GoogleOAuthProvider>
    </s.Wrapper>
  )
};

export default GoogleLoginButton;