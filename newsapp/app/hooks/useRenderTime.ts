import { useEffect, useRef } from "react";

//This hook is used to measure the render time of any component or hook in the application

export function useRenderTime(componentName: string) {
    // Store the initial render start time 
   const startTime = useRef(performance.now());

   useEffect(() => {
      //calculate render time 
      const endTime = performance.now();
      const renderTime = endTime - startTime.current;

      //log the render time 
      console.log(`⏱️ Component "${componentName}" rendered in ${renderTime.toFixed(2)}ms`);

      //warning if render time is exceptionally longer (more than 100ms)
      if (renderTime > 100) {
         console.warn(`slow render: "${componentName}" took ${renderTime.toFixed(2)}ms to render`);
      }

      //ensures components are unmounted and measure mounting time 
      return () => {
         const unmountTime = performance.now();
         const lifetimeMs = unmountTime - startTime.current;
         console.log(`🔄 Component "${componentName}" unmounted after ${lifetimeMs.toFixed(2)}ms`);
      };
   }, [componentName]);
}
