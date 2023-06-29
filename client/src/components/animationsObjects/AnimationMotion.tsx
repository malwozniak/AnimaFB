import { useEffect, useState } from 'react';
import * as React from 'react';
import { AnimationMotionProps, Ball, BallBouncingProps, Card, CardContainer, GlobalStyle, RandomImage, ballDistance, ballMove, ballMoveComponents, ballSpeed, ballXYZ, generateRandomAnimation, getRandomNumber } from '../../library/library/allImports';



export default function AnimationMotion({ updatePositions }: AnimationMotionProps ) {
  const [, setX] = useState(0);
  const [, setY] = useState(0);
  const [, setSpeed] = useState(0);
  const [, setMove] = useState('');
  const [, setDistance] = useState('');
  const randomIndex = generateRandomAnimation(0, 3);
  const randomImageNumber = generateRandomAnimation(1, 10);
  const x = ballXYZ[randomIndex % 2 === 0 ? 0 : 10];
  const y = ballXYZ[randomIndex % 2 === 0 ? 10 : 0];
  const speed = ballSpeed[generateRandomAnimation(0,1)];
  const move = ballMove[generateRandomAnimation(0, ballMove.length - 1)];
  const distance = ballDistance[getRandomNumber(0, 1)];
  const [items] = useState([
    ballMoveComponents.map((Component:  React.ComponentType<BallBouncingProps>, index: any) => (
      <Card key={index}>
        <GlobalStyle />
        <Component 
        ballSpeedValue = {`${String(speed)}s`}
        ballMoveValue= {String(move)}
        ballDistanceValue={String(distance)}
        >
          
          <Ball />
          {/* {String(randomImageNumber)} */}
        </Component>
        {/* {console.log("Comp", Component)} */}
        <RandomImage num={randomImageNumber} />
      </Card>
    ))
  ]);

  const randomAnimation = items[0][randomIndex];

  useEffect(() => {
  
    setX(x);
    setY(y);
    setSpeed(speed)
    setMove(move)
    setDistance(distance)
    updatePositions( [x,y,0],[speed],move, distance, String(randomImageNumber)); 
  }, []);

  return (
    <CardContainer>
      {randomAnimation}
      {/* <div>{`x: ${xState}, y: ${yState}, z: 0, img: ${iState}, s: ${sState} , m: ${mState}, d: ${dState}`}</div> */}
    </CardContainer>
  );
}

/**W tym zaktualizowanym kodzie zmienna stanu animationNum jest używana do przechowywania losowego numeru animacji, a jest zawarta w tablicy zależności hooka useEffect. Hook mapuje tablicę items i klonuje każdy element z nowym animationNum jako właściwością dla komponentu RandomImage. To zapewnia, że hook useEffect zostanie uruchomiony tylko wtedy, gdy zmienna stanu animationNum zostanie zmieniona, zapobiegając nieskończonej pętli i rozwiązując błąd. */
//