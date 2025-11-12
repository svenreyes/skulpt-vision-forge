import { useState, useEffect } from "react";

export function useStockholmTime() {
  const [stockholmTime, setStockholmTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setStockholmTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return stockholmTime;
}

