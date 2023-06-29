import React, { useState, useEffect } from 'react';
import { RandomImage, generateRandomAnimation, getDistance, getRandomNumber } from '../../../library/utils/functions';
import { AnimationMotionProps, Point } from '../../types/Animation';
import { Ball, BallMovement, Card } from '../../../library/constants/style';
import { ballMove } from '../../../library/constants';

function RandomMove({ updatePositions }: AnimationMotionProps) {
  const [styles] = useState([{ transform: 'translate(0, 0)' }]);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  let img: string = String(generateRandomAnimation(1, 16));

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
        x: getRandomNumber(-3, 3);
        y: getRandomNumber(-3, 3);
       setX(x)
       setY(y)
        keyframes.push({ transform: `translate(${x}vw, ${y}vw)` });
      }

      keyframes.unshift({ transform: 'translate(0, 0)' });
      keyframes.push({ transform: 'translate(0, 0)' });
      const options: KeyframeAnimationOptions = {
        duration,
        easing: ballMove[generateRandomAnimation(0,2 )]?? 'defaultEasing',
        iterations: Infinity,
      };
      const easing: string = options.easing || 'defaultEasing';

      balls[ballIndex].animate(keyframes, options);
      updatePositions([x,y,0], [speed], String(easing), String(duration), String(img))
      
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
      <RandomImage num={img} />

    </Card>


  );
}

export default RandomMove;