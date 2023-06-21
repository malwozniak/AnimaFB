import { BallBouncing, BallBouncingDown, BallBouncingLeft, BallBouncingRight } from "./style";
import { generateRandomAnimation } from "../utils/functions";


const moving = [
  'dołu','góry', 'lewej', 'prawej', 'losowych punktów w karcie'
]
const ballType = [
  '2D', '3D'
]


const questions = [
  `Policz ile jest kulek <strong>${ballType[generateRandomAnimation(0,1)]}</strong> poruszających się w kierunku do <b>${moving[generateRandomAnimation(0,moving.length-1)]}</b>`
];

const gender = ['Kobieta', 'Mężczyzna', 'Nieokreślona']

const answerYesNo =[ 'Tak', 'Nie']

const animationWhich = ['ruch obiektu liniowy','ruch obiektu losowy','brak animacji', 'ruch przesadny']

const ballMoving = [
    BallBouncing,
    BallBouncingDown,
    BallBouncingLeft,
    BallBouncingRight
  ];
  export {questions, ballMoving, gender, answerYesNo, animationWhich};
  