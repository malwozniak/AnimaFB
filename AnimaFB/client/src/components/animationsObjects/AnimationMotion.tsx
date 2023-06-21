import { useState } from 'react';
import * as React from 'react';
import { generateRandomAnimation, RandomImage } from '../../utils/functions';
import { Ball, CardContainer, Card, GlobalStyle } from '../../constants/style';
import { ballMoving } from '../../constants';

export default function AnimationMotion() {
  const [items] = useState([
    ballMoving.map((Component, index) => (

<Card key={index}>
<GlobalStyle/>

    <Component>
      <Ball/>

      </Component>
      <RandomImage num={generateRandomAnimation(1, 16)} /> 

      </Card>
      )) ,

  ]);

//   const [animationNum] = useState(generateRandomAnimation(1,16))
//  useEffect(() => {
  
//  const newItems = items.map((item) => {
//   return React.cloneElement(item, {

//     children: [
// <>
// <GlobalStyle/>
//     <RandomImage num={animationNum} />
//       <Ball/>
// </>

//     ]  })
//  })
//   setItems(newItems)
//  }, [animationNum]);
  return (
    
    <CardContainer>
      {/* <RandomImage num={generateRandomAnimation(1, 15)} /> */}
      {items[0][generateRandomAnimation(0,3)]}
      </CardContainer>
  );
}

/**W tym zaktualizowanym kodzie zmienna stanu animationNum jest używana do przechowywania losowego numeru animacji, a jest zawarta w tablicy zależności hooka useEffect. Hook mapuje tablicę items i klonuje każdy element z nowym animationNum jako właściwością dla komponentu RandomImage. To zapewnia, że hook useEffect zostanie uruchomiony tylko wtedy, gdy zmienna stanu animationNum zostanie zmieniona, zapobiegając nieskończonej pętli i rozwiązując błąd. */
