import {
  BallBouncing as BouncingBall,
  BallBouncingDown as BouncingBallDown,
  BallBouncingLeft as BouncingBallLeft,
  BallBouncingRight as BouncingBallRight,
} from "./style";

import { generateRandomAnimation, getRandomFloat, getRandomNumber } from "../utils/functions";
import { StyledComponent } from "styled-components";
import { BallBouncingProps } from "../types/animation";


const moving = [
  'liniowym do dołu','liniowym do góry', 'liniowym do lewej', 'liniowym do prawej', 'losowym w karcie'
]
const ballType = [
  '2D', '3D'
]
const sectionType =[ 'Karta 1 - W lewym, górnym rogu strony ',
 'Karta 2 - Na samej górze, ale w centrum strony',
 'Karta 3 - W prawym, górnym rogu strony',
 'Karta 4 - W centrum, po lewej stronie',
 'Karta 5 - W środku strony',
 'Karta 6 - W centrum, po prawej stronie',
 'Karta 7 - WW lewym, dolnym rogu strony ',
 'Karta 8 - Na samym dole, ale w centrum strony ',
 'Karta 9 - W prawym, dolnym rogu strony',

]

const chosenBallType = ballType[generateRandomAnimation(0,1)];
const chosenMoving =moving[generateRandomAnimation(0,moving.length-1)];

const questions = [
  `Policz ile jest kulek <strong>${chosenBallType}</strong> poruszających się w ruchu <b>${chosenMoving}</b>`
];
const nameObjects = ['Animacja 1', 'Animacja 2', 'Animacja 3','Animacja 4', 'Animacja 5', 'Animacja 6', 'Animacja 7', 'Animacja 8', 'Animacja 9']
const gender = ['Kobieta', 'Mężczyzna', 'Nieokreślona']

const answerYesNo =[ 'Tak', 'Nie']

const animationWhich = ['ruch obiektu liniowy','ruch obiektu losowy','brak animacji', 'ruch przesadny']
const ballMoveComponents : StyledComponent<"div", any, BallBouncingProps>[] = [
  BouncingBall,
  BouncingBallDown,
  BouncingBallLeft,
  BouncingBallRight
];

const ballXYZ = [0,-0.7,-1.4,-2.1,-2.8,-3.5,0.7,1.4,2.1,2.8,3.5]
const ballSpeed = ['1s','2s']
const ballMove = ['ease-in', 'linear', 'ease-out', 'ease-in-out', `cubic-bezier(${getRandomNumber(0.0,1.0)}, ${getRandomFloat(0.0,1.0,1)}, ${getRandomFloat(0.0,1.0,1)}, 1)`]
const ballDistance = [`${generateRandomAnimation(0,20)}`, 'infinite']


  export {questions,ballMoveComponents, ballXYZ, ballSpeed, ballMove, ballDistance, nameObjects, gender, ballType,  answerYesNo, animationWhich, sectionType, chosenBallType, chosenMoving};
  