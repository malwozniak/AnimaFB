import styled, { keyframes } from 'styled-components';
import { device } from '../constants/device';
import { createGlobalStyle } from 'styled-components'


const GlobalStyle = createGlobalStyle`
  :root {
    --gray-card: #888888;
    --white: #fff;
    
    
  }
`;

/**Animation List Component Main */
const AnimationListRowFirst = styled.div`
display: grid;
grid-gap: 3.5rem;
text-align: -webkit-center;
align-items: center;
height:100%;
`;

const Form = styled.div`
display:flex;
flex-flow: column;
gap:20px;
& input{
  border:2px solid black;
  cursor: pointer;
  margin-bottom: 0;
  text-transform: uppercase;
  width: 100%;
  border-radius: 5px;
  height: 35px;
  box-shadow: 0px;
  outline: none;
  transition: 0.15s;
  text-align: center;
  &:active {
    background-color: gray;
  }

}

`;
const Input = styled.input.attrs({
  type: 'submit',
  value: 'Submit',
})`
 background: lightgray;
`;
const AnimationListRow = styled.div`
  display: grid;
  grid-gap: 3.5rem;
  grid-template-columns: repeat(3, 1fr);
  padding: 4rem;
  place-items: center;
  width:100vw;
  height:100vh;
   `;
const CardContainer = styled.div`
align-items: center;
justify-content: center;
position: relative;
width: 10vw;
height: 10vw;
background-repeat: no-repeat;
background-image: url('https://raw.githubusercontent.com/malwozniak/react-ts-1dq1it/main/textures/img1.jpg');
   `;
const AnimationListContainer = styled.div`
  
   `;

const AnimationListBox = styled.div`
      
   `;

/**Animation Card Component */
   
const AnimationCardContainer = styled.div`
font-size: 1.5em;
border-radius: 4px;
`;

const AnimationCardTitle = styled.h3`
text-transform: capitalize;
text-align: center;
`;

const DoubleColumnCard = styled.div`
display: flex;
text-align: center;
flex-direction: column;
align-items: center;

@media ${device.laptop} { 
 flex-direction: row; 
}
`;

const AnimationDescription = styled.div`
font-size: 16px;
text-align: left;
margin-top: 20px;
`;

/** Animation Motion */

const Card = styled.div`
align-items: center;
justify-content: center;
position: relative;
width: 100%;
height: 100%;
background-repeat: no-repeat;
`;

const Ball = styled.div`
background-color: var(--gray-card);
border-radius: 50%;
height: 3vw;
position: absolute;
width: 3vw;
left: 3.5vw;
top: 3.5vw;
`;

/* Ball bouncing up */

const ballBouncing = keyframes`
0%,
100% {
  transform: translateY(0);
}
10%,
90% {
  transform: translateY(-0.7vw);
}
20%,
80% {
  transform: translateY(-1.4vw);
}
30%,
70% {
  transform: translateY(-2.1vw);
}
40%,
60% {
  transform: translateY(-2.8vw);
}
50% {
  transform: translateY(-3.5vw);
}
`;

const BallBouncing = styled.div`
animation: ${ballBouncing} 1s ease-in infinite;
transform-origin: bottom;
`;


/* End ball bouncing up*/
/* Ball bouncing down*/
const ballBouncingDown = keyframes`
0%,
  100% {
    transform: translateY(0);
  }
  10%,
  90% {
    transform: translateY(0.7vw);
  }
  20%,
  80% {
    transform: translateY(1.4vw);
  }
  30%,
  70% {
    transform: translateY(2.1vw);
  }
  40%,
  60% {
    transform: translateY(2.8vw);
  }
  50% {
    transform: translateY(3.5vw);
  }
`;


const BallBouncingDown = styled.div`
animation: ${ballBouncingDown} 1s ease-in infinite;
transform-origin: bottom;`;



/* End ball bouncing down */

/* Ball bouncing Left */


const ballBouncingLeft = keyframes`
0%,
  100% {
    transform: translateX(0);
  }
  10%,
  90% {
    transform: translateX(-0.7vw);
  }
  20%,
  80% {
    transform: translateX(-1.4vw);
  }
  30%,
  70% {
    transform: translateX(-2.1vw);
  }
  40%,
  60% {
    transform: translateX(-2.8vw);
  }
  50% {
    transform: translateX(-3.5vw);
  }
`;
const BallBouncingLeft = styled.div`
animation: ${ballBouncingLeft} 1s ease-in infinite;
transform-origin: bottom;
`;


/* End ball bouncing left*/
/* Ball bouncing right*/

const ballBouncingRight = keyframes`
0%,
100% {
  transform: translateX(0);
}
10%,
90% {
  transform: translateX(0.7vw);
}
20%,
80% {
  transform: translateX(1.4vw);
}
30%,
70% {
  transform: translateX(2.1vw);
}
40%,
60% {
  transform: translateX(2.8vw);
}
50% {
  transform: translateX(3.5vw);
}
`;


const BallBouncingRight = styled.div`
animation: ${ballBouncingRight} 1s ease-in infinite;
transform-origin: bottom;
`;


/* End ball bouncing right */


/**Random Move */

const BallMovement = styled.div`
overflow:hidden;
transform-origin: bottom;
`;
const MainApp = styled.main`
max-width: 728px;
max-height: 100%;
margin: 4rem auto;`



/**CardBorder for Ball in Animation List */
const CardBorder = styled.div`
align-items: center;
justify-content: center;
place-self: center;
position: relative;
width: 9rem;
height: 9rem;
background-repeat: no-repeat;
border: 2px solid var(--gray-card);
`;

/**LabelChoice - in the form choice radio from list/*/

const LabelChoice = styled.div`
display:flex;
align-items:center;
width: fit-content;
margin-right: auto;
margin-left: auto;
padding: 1vw;


`
const Fieldset = styled.fieldset`
display: flex;
text-align:center;
justify-content: center;

`;
const FieldsetIN = styled.fieldset`
display: flex;
text-align:center;
justify-content: center;
margin: 5rem;

`;

const FieldsetQ = styled.fieldset`
display: grid;
text-align:center;
grid-template-columns: repeat(3, 1fr);
justify-content: center;
margin: 5rem;

`;
const FieldsetNum = styled.fieldset`

display: grid;
text-align: center;
grid-gap: 30px;
-webkit-box-pack: center;
justify-content: center;
margin: 5rem;


`

const ChoiceGroup = styled.div`
display:inline-flex;
`
const BallShow = styled.div`
background-color: var(--gray-card);
border-radius: 50%;
height: 3rem;
width: 3rem;
left: 3.5vw;
margin-top: 3rem;
`;

const TextArea = styled.textarea`
padding: 0 1rem;
margin: 10px;
width: 40%;
`

   export{GlobalStyle,AnimationListBox,AnimationListContainer,AnimationListRow,
    AnimationListRowFirst, Form, Input, CardContainer,
  AnimationCardContainer,AnimationCardTitle,AnimationDescription, DoubleColumnCard, TextArea,
  Card, Ball, BallBouncing, BallBouncingDown,BallBouncingLeft ,BallBouncingRight,
    BallMovement, MainApp, CardBorder, LabelChoice, ChoiceGroup, BallShow, Fieldset,
    FieldsetQ, FieldsetNum, FieldsetIN}