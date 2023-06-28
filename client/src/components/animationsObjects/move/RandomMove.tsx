import React, { useState, useEffect, useRef } from 'react';
import {  RandomImage, generateRandomAnimation, getDistance, getRandomNumber } from '../../../library/utils/functions';
import { AnimationMotionProps, Point } from '../../types/Animation';
import { Ball } from '../../../library/constants/style';
import { ballMove } from '../../../library/constants';

const img = generateRandomAnimation(1, 16);

function RandomMove({ updatePositions }: AnimationMotionProps) {
  const [style, setStyle] = useState({ transform: 'translate(0, 0)', transition: 'transform 10s ease-in-out' });
  const ballRef = useRef<HTMLDivElement>(null);
  const startPoint: Point = { x: 0, y: 0 };
  const endPoint: Point = {
    x: getRandomNumber(-3, 3),
    y: getRandomNumber(-3, 3),
  };
  const distance: number = getDistance(startPoint, endPoint);
  const speed: number = getRandomNumber(0, 8); // in pixels per second
  const duration: number = (distance) * 1000;

  useEffect(() => {
    let animationId: number | null = null; // ID of the animation frame

    const moveBall = () => {
      const x: number = getRandomNumber(-2, 2);
      const y: number = getRandomNumber(-2, 2);
      setStyle({ transform: `translate(${x}, ${y})`, transition: `transform ${speed}s ${ballMove[ballMove.length-1]}` });

      animationId = requestAnimationFrame(() => {
        setTimeout(moveBall, 1000); // Opóźnienie wynoszące 1000 milisekund (1 sekunda)
      });
    };

    const startMoving = () => {
      if (animationId === null) {
        setTimeout(() => {
          animationId = requestAnimationFrame(moveBall);
        }, 1000); // Opóźnienie wynoszące 2 sekundy przed rozpoczęciem ruchu
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
      setTimeout(() => {
        stopMoving();
      }, 6000);
    };
  }, []);

  useEffect(() => {
    updatePositions([startPoint.x, startPoint.y, 0], [speed], 'linear', duration.toString(), String(img));
  }, [speed, duration, updatePositions, startPoint]);

  return (
    <>
      <RandomImage num={img} />
      <Ball ref={ballRef} style={style} />
    </>
  );
}

export default RandomMove;
