import { useState } from 'react';
import * as React from 'react';
import { generateRandomAnimation, RandomImage } from '../../utils/functions';
import { Ball, CardContainer, Card, GlobalStyle } from '../../constants/style';
import { ballMoving,  } from '../../constants';

interface AnimationMotionProps {
  updatePositions: (x: number, y: number, z: number) => void;
}

export default function AnimationMotion({updatePositions}: AnimationMotionProps) {
  const z = 0;
  let y = 0;
  let x = 0;
  const randomIndex = generateRandomAnimation(0, 3);
  const randomImageNumber = generateRandomAnimation(1, 16);
  const [items] = useState([
    ballMoving.map((Component, index) => (

<Card key={index}>
<GlobalStyle/>

    <Component>
      <Ball />
      {/* {index} */}
      {updatePositions(x, y, z)}

      </Component>
      <RandomImage num={randomImageNumber} /> 

      </Card>
      )) 

  ]);
  
  const randomAnimation = items[0][randomIndex];
// switch(randomAnimation.key){
//   case "1":
//     x=ballXYZ[0];
//     y=ballXYZ[10];
 
// return updatePositions(x, y, 0);
// break;
// case "2":
//   x=ballXYZ[10];
//   y=ballXYZ[0];

// return updatePositions(x, y, 0);
// break;
// case "3":
//     x=ballXYZ[0];
//     y=ballXYZ[10];
 
// return updatePositions(x, y, 0);
// break;
// case "4":
//     x=ballXYZ[10];
//     y=ballXYZ[0];
 
// return updatePositions(x, y, 0);
// break;
// }
  return (
    
    <CardContainer>
      {/* <RandomImage num={generateRandomAnimation(1, 15)} /> */}
      {randomAnimation}
      </CardContainer>
  );
}




/**W tym zaktualizowanym kodzie zmienna stanu animationNum jest używana do przechowywania losowego numeru animacji, a jest zawarta w tablicy zależności hooka useEffect. Hook mapuje tablicę items i klonuje każdy element z nowym animationNum jako właściwością dla komponentu RandomImage. To zapewnia, że hook useEffect zostanie uruchomiony tylko wtedy, gdy zmienna stanu animationNum zostanie zmieniona, zapobiegając nieskończonej pętli i rozwiązując błąd. */
