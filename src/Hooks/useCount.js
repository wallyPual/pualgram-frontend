import { useState, useEffect } from "react";

export default (defaultSecond) => {
  const [flag, setFlag] = useState(false);
  const [minutes, setMinutes] = useState(parseInt(((defaultSecond)%3600)/60));
  const [second, setSecond] = useState(defaultSecond);

  useEffect(() => {
    let interval;

    if (flag) {
      interval = setInterval(() => {
        setSecond(preSecond => {
          if (preSecond <= 1) {
            setFlag(false);
            clearInterval(interval);
            return second;
          } else {
            return preSecond - 1;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [flag])

  return {
    second,
    flag,
    setFlag
  };
};
