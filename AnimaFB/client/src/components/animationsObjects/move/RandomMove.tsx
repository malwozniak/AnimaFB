import { useState, useEffect } from 'react';
import * as React from 'react';
import {
  generateRandomAnimation,
  getDistance,
  getRandomNumber,
  
  RandomImage} from '../../../utils/functions';
import { BallMovement, Ball, Card } from '../../../constants/style';
import { Point } from '../../../types/animation';
function RandomMove(): JSX.Element {
  const [styles] = useState([{ transform: 'translate(0, 0)' }]);

  useEffect(() => {
    const balls = Array.from(document.querySelectorAll('.ballr')) as HTMLElement[];

    function moveBall(ballIndex: number): void {
      const startPoint: Point = { x: 0, y: 0 };
      const endPoint: Point = {
        x: getRandomNumber(-3, 3),
        y: getRandomNumber(-3, 3),
      };
      const distance: number = getDistance(startPoint, endPoint);
      const speed: number = 0.33; // in pixels per second
      const duration: number = (distance / speed) * 1000;
      const keyframes: Keyframe[] = [];

      for (let i: number = 0; i < 50; i++) {
        const x: number = getRandomNumber(-3, 3);
        const y: number = getRandomNumber(-3, 3);

        keyframes.push({ transform: `translate(${x}vw, ${y}vw)` });
      }

      keyframes.unshift({ transform: 'translate(0, 0)' });
      keyframes.push({ transform: 'translate(0, 0)' });
      const options: KeyframeAnimationOptions = {
        duration,
        easing: 'linear',
        iterations: Infinity,
      };

      balls[ballIndex].animate(keyframes, options);

      
    }
    
  
    for (let i = 0; i < balls.length; i++) {
      moveBall(i);
    }
  }, []); 

  return (
    <Card>
      <BallMovement>
      {styles.map((style, index) => (
        <Ball key={index} className="ballr" style={style}></Ball>
      ))}
      </BallMovement>
      <RandomImage num={generateRandomAnimation(1, 16)} />

    </Card>
  );
}

export default RandomMove;