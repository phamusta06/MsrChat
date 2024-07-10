import { useEffect, useState } from "react"

 const useWindowSize = () => {
    const [windowWidth, setWindowWidth] = useState(undefined);

    useEffect(() => {
      function handleResize() {
        setWindowWidth(window.innerWidth);
      }
      
      window.addEventListener("resize", handleResize);
      handleResize();  
      
      return () => window.removeEventListener("resize", handleResize);
    }, []);
    
    return windowWidth;
}
export default useWindowSize;