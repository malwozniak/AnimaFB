import * as THREE from 'three';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import React, { useEffect, useState } from 'react';
import { Material } from 'three';
import { AnimationMotionProps } from '../types/Animation';

export default function RandomMove3D({ updatePositions }: AnimationMotionProps) {
  const mesh = useRef<THREE.Mesh<THREE.BufferGeometry, Material | Material[]>>(null);
  const [x, setX] = useState(Math.random() * 10 - 3);
  const [y, setY] = useState(Math.random() * 10 - 3);
  const [z, setZ] = useState(0);
  const [direction, setDirection] = useState(1); // Kierunek poruszania się piłki (1 - prawo, -1 - lewo)

  // Zdefiniuj losową pozycję dla kuli
  const randomPosition = () => {
    return new THREE.Vector3(x, y, z);
  };

  // Zdefiniuj losową prędkość dla kuli
  const randomSpeed = () => {
    return Math.random() * 0.1;
  };

  // Ustawienie początkowego położenia i prędkości kuli
  let position = randomPosition();
  let speed = randomSpeed();

 

  // Użycie hook'a useFrame, aby aktualizować pozycję sfery co klatkę
  useFrame(() => {
    if (mesh.current) {
      // Uaktualnienie pozycji kuli na podstawie jej aktualnej pozycji, prędkości i czasu, który upłynął od ostatniej klatki
      mesh.current.position.x += speed * direction * (position.x - mesh.current.position.x);
      mesh.current.position.y += speed * direction * (position.y - mesh.current.position.y);
      mesh.current.position.z += speed * direction * (position.z - mesh.current.position.z);

      // Jeśli kula jest wystarczająco blisko pozycji docelowej, wybierz dla niej nową losową pozycję, prędkość i kierunek ruchu
      if (mesh.current.position.distanceTo(position) < 0.1) {
        setDirection(Math.random() < 0.5 ? 1 : -1); // Losowo ustawiamy kierunek na prawo lub lewo

        if (direction === 1) {
          // Poruszanie w prawo
          setX(Math.random() * 10 - 3);
        } else {
          // Poruszanie w lewo
          setX(-(Math.random() * 10 - 3));
        }

        setY(Math.random() * 10 - 3);
        setZ(0);

        position = randomPosition();
        speed = randomSpeed();
      }
    }
  });

  useEffect(() => {
    updatePositions([x, y, z], [speed], "Random", "infinite");
  }, []);

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
