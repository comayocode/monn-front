// hooks/useCountdown.js
import { useState, useEffect, useCallback } from 'react';

const useCountdown = (initialSeconds = 0) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);

  const start = useCallback((seconds) => {
    setSecondsLeft(seconds);
    setIsActive(seconds > 0);
  }, []);

  useEffect(() => {
    if (!isActive || secondsLeft <= 0) {
      setIsActive(false);
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, secondsLeft]);

  return { secondsLeft, start };
};

export default useCountdown;