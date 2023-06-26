import React, { useRef } from 'react';
import { useFrame,  } from '@react-three/fiber';
import * as THREE from 'three';
import { generateRandomAnimation } from '../../library/utils/functions';
import { AnimationMotionProps } from '../types/Animation';

let acceleration = 0.05;
let bounce_distance = generateRandomAnimation(0,5);
let bottom_position_y = 0;
let time_step = 0.1;
// time_counter  jest obliczany jako czas, w którym kulka osiągnęła górną pozycję
// to jest po prostu obliczane za pomocą wzoru s = (1/2)gt*t, co ma miejsce w przypadku upuszczenia piłki z górnej pozycji
//od góry do dołu
let time_counter = Math.sqrt((-bounce_distance * 2) / -acceleration);

//od dołu do góry
// let time_counter = Math.sqrt((bounce_distance * 2) / acceleration);
let initial_speed = acceleration * time_counter;
export default function SphereMove({ updatePositions }: AnimationMotionProps ) {
  const mesh = useRef<THREE.Mesh | null>(null);
  
  var num = generateRandomAnimation(1, 15);

  useFrame(() => {
    if(mesh.current){
    if (num % 2) {
      if (mesh.current.position.x < bottom_position_y) {
        time_counter = 0;
      }
      // console.log(mesh.current.position.y);
      mesh.current.position.x =
        bottom_position_y +
        initial_speed * time_counter -
        0.5 * acceleration * time_counter * time_counter;
      // advance time
      time_counter += time_step;
    } else {
      if (mesh.current.position.y < bottom_position_y) {
        time_counter = 0;
      }
      // console.log(mesh.current.position.y);
      mesh.current.position.y =
        bottom_position_y +
        initial_speed * time_counter -
        0.5 * acceleration * time_counter * time_counter;
      // advance time
      time_counter += time_step;
    }
  }
  });
  // updatePositions([],[initial_speed],'linear',String(bounce_distance))
  return (
    <mesh ref={mesh}>
      <sphereGeometry attach="geometry" args={[1, 16, 16]} />
      <meshStandardMaterial
        attach="material"
        color="gray"
        transparent
        roughness={0.1}
        metalness={0.1}
      />
    </mesh>
  );
}