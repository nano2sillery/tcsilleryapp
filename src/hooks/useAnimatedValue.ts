import { useState, useEffect } from 'react';

export function useAnimatedValue(targetValue: number, duration: number = 1000) {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const startValue = currentValue;
    
    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Fonction d'easing pour une animation plus naturelle
      const easeOutQuad = (t: number) => t * (2 - t);
      const easedProgress = easeOutQuad(progress);
      
      const newValue = startValue + (targetValue - startValue) * easedProgress;
      setCurrentValue(Math.round(newValue * 10) / 10);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [targetValue, duration]);

  return currentValue;
}