import { useEffect } from "react";
import TagManager from "react-gtm-module";

const GoogleTagManager = ({gtmId}:{gtmId:string}) => {
  useEffect(()=>{
    TagManager.initialize({gtmId});
  },[gtmId]);
  return <></>;
}

export default GoogleTagManager


