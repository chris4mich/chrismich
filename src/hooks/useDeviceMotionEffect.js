import { useEffect, useRef, useState } from "react";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

function isMobileDevice() {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return false;
  }

  return (
    window.matchMedia("(pointer: coarse)").matches ||
    /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)
  );
}

function prefersReducedMotion() {
  if (typeof window === "undefined") {
    return true;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function supportsDeviceMotion() {
  if (typeof window === "undefined") {
    return false;
  }

  return "DeviceMotionEvent" in window || "DeviceOrientationEvent" in window;
}

export default function useDeviceMotionEffect() {
  const targetRef = useRef(null);
  const rafRef = useRef(null);
  const modeRef = useRef(null);
  const targetMotionRef = useRef({ x: 0, y: 0, strength: 0 });
  const currentMotionRef = useRef({ x: 0, y: 0, strength: 0 });
  const [status, setStatus] = useState("idle");
  const [canPrompt, setCanPrompt] = useState(false);

  useEffect(() => {
    setCanPrompt(
      isMobileDevice() && supportsDeviceMotion() && !prefersReducedMotion(),
    );

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      window.removeEventListener("devicemotion", handleMotion);
      window.removeEventListener("deviceorientation", handleOrientation);
    };
    // The event handlers read refs only, so this setup intentionally runs once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const applyMotion = () => {
    const target = targetMotionRef.current;
    const current = currentMotionRef.current;
    const next = {
      x: current.x + (target.x - current.x) * 0.16,
      y: current.y + (target.y - current.y) * 0.16,
      strength: current.strength + (target.strength - current.strength) * 0.12,
    };

    currentMotionRef.current = next;

    if (targetRef.current) {
      targetRef.current.style.setProperty("--motion-x", `${next.x.toFixed(2)}px`);
      targetRef.current.style.setProperty("--motion-y", `${next.y.toFixed(2)}px`);
      targetRef.current.style.setProperty(
        "--motion-inverse-x",
        `${(next.x * -0.7).toFixed(2)}px`,
      );
      targetRef.current.style.setProperty(
        "--motion-inverse-y",
        `${(next.y * -0.7).toFixed(2)}px`,
      );
      targetRef.current.style.setProperty(
        "--ripple-strength",
        next.strength.toFixed(3),
      );
    }

    const stillMoving =
      Math.abs(target.x - next.x) > 0.04 ||
      Math.abs(target.y - next.y) > 0.04 ||
      Math.abs(target.strength - next.strength) > 0.01;

    rafRef.current = stillMoving ? requestAnimationFrame(applyMotion) : null;
  };

  const scheduleMotion = (x, y, strength) => {
    targetMotionRef.current = {
      x: clamp(x, -10, 10),
      y: clamp(y, -10, 10),
      strength: clamp(strength, 0, 1),
    };

    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(applyMotion);
    }
  };

  function handleMotion(event) {
    const source = event.accelerationIncludingGravity || event.acceleration || {};
    const rotation = event.rotationRate || {};
    const rawX = source.x || (rotation.gamma || 0) / 12;
    const rawY = source.y || (rotation.beta || 0) / 12;
    const normalizedX = clamp(rawX / 7, -1, 1);
    const normalizedY = clamp(rawY / 7, -1, 1);
    const strength = Math.min(
      1,
      Math.abs(normalizedX) * 0.58 + Math.abs(normalizedY) * 0.58,
    );

    scheduleMotion(normalizedX * 10, normalizedY * 10, strength);
  }

  function handleOrientation(event) {
    const normalizedX = clamp((event.gamma || 0) / 32, -1, 1);
    const normalizedY = clamp((event.beta || 0) / 48, -1, 1);
    const strength = Math.min(
      1,
      Math.abs(normalizedX) * 0.5 + Math.abs(normalizedY) * 0.5,
    );

    scheduleMotion(normalizedX * 10, normalizedY * 10, strength);
  }

  const enableListeners = () => {
    if (modeRef.current || prefersReducedMotion()) {
      return;
    }

    if ("DeviceMotionEvent" in window) {
      modeRef.current = "devicemotion";
      window.addEventListener("devicemotion", handleMotion, { passive: true });
    } else if ("DeviceOrientationEvent" in window) {
      modeRef.current = "deviceorientation";
      window.addEventListener("deviceorientation", handleOrientation, {
        passive: true,
      });
    }

    if (targetRef.current) {
      targetRef.current.dataset.motionEnabled = "true";
    }

    setStatus("enabled");
    setCanPrompt(false);
  };

  const requestAccess = async () => {
    if (!isMobileDevice() || !supportsDeviceMotion() || prefersReducedMotion()) {
      setStatus("unsupported");
      setCanPrompt(false);
      return;
    }

    try {
      const MotionEvent = window.DeviceMotionEvent;
      const OrientationEvent = window.DeviceOrientationEvent;
      let permission = "granted";

      if (MotionEvent && typeof MotionEvent.requestPermission === "function") {
        permission = await MotionEvent.requestPermission();
      } else if (
        OrientationEvent &&
        typeof OrientationEvent.requestPermission === "function"
      ) {
        permission = await OrientationEvent.requestPermission();
      }

      if (permission === "granted") {
        enableListeners();
      } else {
        setStatus("denied");
        setCanPrompt(false);
      }
    } catch (error) {
      setStatus("unsupported");
      setCanPrompt(false);
    }
  };

  return {
    canPrompt,
    isEnabled: status === "enabled",
    requestAccess,
    status,
    targetRef,
  };
}
