import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const mobile = useMediaQuery({ query: "(max-width: 1000px)" });
  useEffect(() => {
    setIsMobile(mobile);
  }, [mobile]);
  return isMobile;
}

export default useIsMobile;