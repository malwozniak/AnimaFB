

import React from 'react';
import { Point } from '../types/animation';

/** Funkcja generująca randomową liczbą kart - Function generate Random Number of Cards  */
export function generateRandomAnimation(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**Funkcja setIntervalX przyjmuje trzy argumenty:

1. callback: funkcja lub kod, który ma być wykonywany cyklicznie.
2. delay: czas w milisekundach, co ile callback ma być wywoływana.
3. repetitions: liczba powtórzeń, jakie mają zostać wykonane.

Funkcja setIntervalX wykorzystuje funkcję setInterval do cyklicznego wywoływania funkcji callback co delay milisekund. Po wykonaniu określonej liczby powtórzeń (repetitions), funkcja wywołuje funkcję clearInterval, aby zatrzymać działanie cyklu. 
The setIntervalX function is a JavaScript function that allows you to execute the setInterval function with a specified number of repetitions.

The setIntervalX function takes three arguments:

1. callback: The function or code that should be executed cyclically.
2. delay: The time in milliseconds at which callback should be called.
3. repetitions: The number of repetitions that should be executed.


The setIntervalX function uses the setInterval function to cyclically call the callback function every delay milliseconds. After the specified number of repetitions (repetitions) have been completed, the function calls the clearInterval function to stop the cycle.*/
export function setIntervalX(callback: () => void, delay: number | undefined, repetitions: number) {
  var x = 0;
  var intervalID = window.setInterval(function () {
    callback();

    if (++x === repetitions) {
      window.clearInterval(intervalID);
    }
  }, delay);
}

/**Funkcja generująca randomowe obrazy -  Function generate Random Images */
export function RandomImage(props: { num: any; }) {
  const style = {
    width: `${100}%`,
    height: `${100}%`,
    display: 'inline-block',
    backgroundImage: `url(https://raw.githubusercontent.com/malwozniak/react-ts-1dq1it/main/textures/img${props.num}.jpg)`,
    transition: 'background-image 1s ease-in-out',
    backgroundSize: `${100}%`,
  };
  // console.log(props.num);

  return <img style={style} alt="" />;
}

export function getRandomNumber(min: number, max: number): number {
  const num: number = Math.floor(Math.random() * (max - min + 1) + min);
  return num;
}

export function getDistance(p1: Point, p2: Point): number {
  const dx: number = p2.x - p1.x;
  const dy: number = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**Random Move 3D functions */