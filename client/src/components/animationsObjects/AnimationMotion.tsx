import { useState } from 'react';
import * as React from 'react';
import { generateRandomAnimation, getRandomNumber, RandomImage } from '../../utils/functions';
import { Ball, CardContainer, Card, GlobalStyle } from '../../constants/style';
import { ballDistance, ballMove, ballMoveComponents, ballSpeed, ballXYZ } from '../../constants';
import { AnimationMotionProps, BallBouncingProps } from '../../types/animation';


export default function AnimationMotion({ updatePositions }: AnimationMotionProps ) {
  const [xState, setX] = useState(0);
  const [yState, setY] = useState(0);
  const [iState, setImg] = useState('');
  const [sState, setSpeed] = useState('');
  const [mState, setMove] = useState('');
  const [dState, setDistance] = useState('');
  const randomIndex = generateRandomAnimation(0, 3);
  const randomImageNumber = generateRandomAnimation(1, 16);
  const x = ballXYZ[randomIndex % 2 === 0 ? 0 : 10];
  const y = ballXYZ[randomIndex % 2 === 0 ? 10 : 0];
  const img = String(randomImageNumber);
  const speed = ballSpeed[generateRandomAnimation(0,1)];
  const move = ballMove[generateRandomAnimation(0, ballMove.length - 1)];
  const distance = ballDistance[getRandomNumber(0, 1)];
  const [items] = useState([
    ballMoveComponents.map((Component:  React.ComponentType<BallBouncingProps>, index: any) => (
      <Card key={index}>
        <GlobalStyle />
        <Component 
        ballSpeedValue = {String(speed)}
        ballMoveValue= {String(move)}
        ballDistanceValue={String(distance)}
        >
          
          <Ball />
          {/* {String(randomImageNumber)} */}
        </Component>
        {console.log("Comp", Component)}
        <RandomImage num={randomImageNumber} />
      </Card>
    ))
  ]);

  const randomAnimation = items[0][randomIndex];

  React.useEffect(() => {
  
    setX(x);
    setY(y);
    setImg(img)
    setSpeed(speed)
    setMove(move)
    setDistance(distance)
    updatePositions(x, y, 0, img, speed, move, distance); 
  }, []);

  return (
    <CardContainer>
      {randomAnimation}
      <div>{`x: ${xState}, y: ${yState}, z: 0, img: ${iState}, s: ${sState} , m: ${mState}, d: ${dState}`}</div>
    </CardContainer>
  );
}

/**W tym zaktualizowanym kodzie zmienna stanu animationNum jest używana do przechowywania losowego numeru animacji, a jest zawarta w tablicy zależności hooka useEffect. Hook mapuje tablicę items i klonuje każdy element z nowym animationNum jako właściwością dla komponentu RandomImage. To zapewnia, że hook useEffect zostanie uruchomiony tylko wtedy, gdy zmienna stanu animationNum zostanie zmieniona, zapobiegając nieskończonej pętli i rozwiązując błąd. */
//