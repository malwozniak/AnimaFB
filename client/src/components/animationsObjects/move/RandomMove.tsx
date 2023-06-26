import { useState, useEffect, useRef } from 'react';
import {getDistance, getRandomFloat, getRandomNumber } from '../../../library/utils/functions';
import { AnimationMotionProps, Point } from '../../types/Animation';
import React from 'react';
import { Ball } from '../../../library/constants/style';

export default function RandomMove({ updatePositions }: AnimationMotionProps) {
  const [style, setStyle] = useState({ transform: 'translate(0, 0)' });
  const ballRef = useRef<HTMLDivElement>(null);
  const startPoint: Point = { x: 0, y: 0 };
  const endPoint: Point = {
    x: getRandomNumber(-3, 3),
    y: getRandomNumber(-3, 3),
  };
  const distance: number = getDistance(startPoint, endPoint);
  const speed: number = getRandomFloat(7,13,2); // in pixels per second
  const duration: number = (distance / speed) * 1000;

  useEffect(() => {
    let animationId: number | null = null; // ID of the animation frame

    const moveBall = () => {
      const x: number = getRandomNumber(-2, 2);
      const y: number = getRandomNumber(-2, 2);
      setStyle({ transform: `translate(${x}rem, ${y}rem)` });

      animationId = requestAnimationFrame(moveBall); // Schedule the next animation frame
    };

    const startMoving = () => {
      if (animationId === null) {
        animationId = requestAnimationFrame(moveBall);
      }
    };

    const stopMoving = () => {
      if (animationId !== null) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    };
    startMoving(); // Start the initial movement

    // Stop the movement when the component unmounts
    return () => {
      stopMoving();
    };
  }, []);

  useEffect(() => {
    console.log("SPEED",speed)

    updatePositions([startPoint.x, startPoint.y, 0], [speed], 'linear', duration.toString());
  }, [speed, duration, updatePositions, startPoint]);

  return (
    <>
      <Ball ref={ballRef} style={style} />
     </>
  );
}
