import { useEffect, useRef } from "react";

export const useAnimationFrame = (
  isRunning: boolean,
  callback: () => void,
  endcallback: () => void
) => {
  const reqIdRef = useRef<number>(0);

  const loop = () => {
    if (isRunning) {
      reqIdRef.current = requestAnimationFrame(loop);
      callback();
    } else {
      endcallback();
    }
  };

  useEffect(() => {
    reqIdRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(reqIdRef.current);
  }, [isRunning, callback]);
};
