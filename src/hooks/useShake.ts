
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";

interface ShakeOptions {
  threshold: number;
  timeout: number;
  onShake: () => void;
}

const SHAKE_THRESHOLD = 15;
const SHAKE_TIMEOUT = 1000;

export const getAccelerationDeltas = (
  current: DeviceMotionEventAcceleration,
  previous: { x: number; y: number; z: number }
) => {
  const { x, y, z } = current;

  if (x == null || y == null || z == null) {
    return null;
  }

  return {
    x,
    y,
    z,
    deltaX: Math.abs(previous.x - x),
    deltaY: Math.abs(previous.y - y),
    deltaZ: Math.abs(previous.z - z),
  };
};

export const useShake = ({
  threshold = SHAKE_THRESHOLD,
  timeout = SHAKE_TIMEOUT,
  onShake,
}: Partial<ShakeOptions> = {}) => {
  const [isShaking, setIsShaking] = useState(false);
  const lastTime = useRef(0);
  const lastX = useRef(0);
  const lastY = useRef(0);
  const lastZ = useRef(0);
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if we're running in a browser environment
    if (typeof window === "undefined") return;
    
    // Check if the device supports the DeviceMotion event
    if (!("DeviceMotionEvent" in window)) {
      console.warn("Device motion not supported on this device");
      return;
    }
    
    const handleShake = (event: DeviceMotionEvent) => {
      const currentTime = new Date().getTime();
      // Only process if we have waited long enough
      if ((currentTime - lastTime.current) > timeout) {
        const acceleration = getAccelerationDeltas(
          event.accelerationIncludingGravity || { x: 0, y: 0, z: 0 },
          { x: lastX.current, y: lastY.current, z: lastZ.current }
        );

        if (!acceleration) return;

        const { x, y, z, deltaX, deltaY, deltaZ } = acceleration;
        
        // Check if the motion exceeds our threshold
        if ((deltaX > threshold && deltaY > threshold) || 
            (deltaX > threshold && deltaZ > threshold) || 
            (deltaY > threshold && deltaZ > threshold)) {
          
          // We detected a shake
          setIsShaking(true);
          if (onShake) onShake();
          
          setTimeout(() => setIsShaking(false), 300);
          lastTime.current = currentTime;
        }
        
        lastX.current = x;
        lastY.current = y;
        lastZ.current = z;
      }
    };
    
    // For browsers that require permission for device motion
    const requestMotionPermission = async () => {
      // Check if the browser requires permission for DeviceMotion events
      if (typeof DeviceMotionEvent !== 'undefined' && 
          typeof (DeviceMotionEvent as any).requestPermission === 'function') {
        try {
          const permissionState = await (DeviceMotionEvent as any).requestPermission();
          if (permissionState === 'granted') {
            window.addEventListener('devicemotion', handleShake);
          } else {
            console.warn('DeviceMotion permission denied');
            toast({
              title: "Permission Required",
              description: "Please allow motion detection to use the shake feature",
              variant: "destructive",
            });
          }
        } catch (error) {
          console.error('Error requesting DeviceMotion permission:', error);
        }
      } else {
        // For browsers that don't require permission
        window.addEventListener('devicemotion', handleShake);
      }
    };
    
    // Request permission when the hook is initialized
    requestMotionPermission();
    
    // Cleanup
    return () => {
      window.removeEventListener('devicemotion', handleShake);
    };
  }, [threshold, timeout, onShake, toast]);
  
  // Return the shaking state so the component can react to it
  return { isShaking };
};

// Function to simulate a shake for testing in browser
export const simulateShake = () => {
  // Create a synthetic DeviceMotion event
  const event = new Event('devicemotion', {
    bubbles: true,
    cancelable: true,
  });
  
  // Add acceleration data to mimic a shake
  Object.defineProperty(event, 'accelerationIncludingGravity', {
    value: { 
      x: Math.random() * 30, 
      y: Math.random() * 30, 
      z: Math.random() * 30 
    }
  });
  
  // Dispatch the event
  window.dispatchEvent(event);
};
