import React from "react";

const useMedia = (media) => {
  const [match, setMetch] = React.useState(null);

  React.useEffect(() => {
    function handleSize() {
      const { matches } = window.matchMedia(media);
      setMetch(matches);
    }
    handleSize();
    window.addEventListener("resize", handleSize);
    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, [media]);

  return match;
};

export default useMedia;
