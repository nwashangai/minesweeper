import { useEffect, useState } from "react";

const useCounter = (isClocking: boolean) => {
    const [totalSeconds, setTotalSeconds] = useState(0);

    useEffect(() => {
        if (isClocking) {
            setTotalSeconds(0)
        }

        const nextTick = setInterval(() => {
            if (isClocking) {
                setTotalSeconds(prev => prev + 1);
            } else {
                clearInterval(nextTick);
            }
        }, 1000);
       
        return () => clearInterval(nextTick);
    }, [isClocking]);

    return totalSeconds;
};

export default useCounter;