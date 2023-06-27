import * as THREE from 'three';
import {  useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import React from 'react';
import { AnimationMotionProps, Material } from '../../../library/library/allImports';



export default function RandomMove3D({ updatePositions }: AnimationMotionProps ) {
 
  const mesh = useRef<THREE.Mesh<THREE.BufferGeometry, Material | Material[]>>(null); 
  const x = Math.random() * 10 - 1;
  const y = Math.random() * 10 - 1;
  const z = Math.random() * 10 - 1;
//Zdefiniuj losową pozycję dla kuli
 const randomPosition = () => {
  return new THREE.Vector3(
    x, // Randomowwa wartość pomiędzy -3 a 3
    y,
    z
  );
};

//Zdefiniuj losową prędkość dla kuli
 const randomSpeed = () => {
  return Math.random() * 0.1;
};


  //Ustawienie początkowego położenia i prędkości kuli
  let position = randomPosition();
  let speed = randomSpeed();
  // Ładuję losowy obrazek



  // Użycie hook'a useFrame, aby aktualizować pozycję sfery co klatkę
  useFrame(() => {
    if(mesh.current){
    // Uaktualnienie pozycji kuli na podstawie jej aktualnej pozycji, prędkości i czasu, który upłynął od ostatniej klatki
    mesh.current.position.x += speed * (position.x - mesh.current.position.x);
    mesh.current.position.y += speed * (position.y - mesh.current.position.y);
    mesh.current.position.z += speed * (position.z - mesh.current.position.z);

    // Jeśli kula jest wystarczająco blisko pozycji docelowej, wybierz dla niej nową losową pozycję i prędkość
    if (mesh.current.position.distanceTo(position) < 0.1) {
      position = randomPosition();
      speed = randomSpeed();
      // console.log("Randomm Move 3D", speed)
    }
  }
  });

  // const randomSpeedCons = [speed]
  // const randomPos = [position]
  console.log("Randomm Move 3D", position.x)

updatePositions([x, y, z], [speed], "Random", "infinite");

  return (
    <mesh>
    
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
    </mesh>
  );
}
/**W tym przykładzie komponent Sphere tworzy kulę z losową pozycją początkową i prędkością, a następnie aktualizuje jej pozycję w każdej klatce, aby poruszać się w kierunku nowej losowej pozycji z losową prędkością. Do renderowania sceny używany jest komponent Canvas z react-three-fiber. */
