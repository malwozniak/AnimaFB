import * as THREE from 'three';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import React from 'react';
import { AnimationMotionProps, Material, RandomImage3D, generateRandomAnimation } from '../../../library/library/allImports';

export default function RandomMove3D({ updatePositions }: AnimationMotionProps) {
  const num = String(generateRandomAnimation(1, 16));
  const mesh = useRef<THREE.Mesh<THREE.BufferGeometry, Material | Material[]>>(null);

  const randomPosition = () => {
    const x = Math.random() * 1 - 3; // Range: -3 to 3
    const y = Math.random() * 1 - 3; // Range: -3 to 3
    const z = Math.random() * 1 - 3; // Range: -3 to 3
    return new THREE.Vector3(x, y + Math.random() * 3 + 3, z);
  };

  const randomSpeed = () => {
    return Math.random() * 0.1;
  };

  let position = randomPosition();
  let speed = randomSpeed();

  useFrame(() => {
    if (mesh.current) {
      mesh.current.position.x += speed * (position.x - mesh.current.position.x);
      mesh.current.position.y += speed * (position.y - mesh.current.position.y);
      mesh.current.position.z += speed * (position.z - mesh.current.position.z);

      if (mesh.current.position.distanceTo(position) < 0.1) {
        position = randomPosition();
        speed = randomSpeed();
      }
    }
  });

  updatePositions([mesh.current?.position.x || 0, mesh.current?.position.y || 0, mesh.current?.position.z || 0], [speed], "Random", "infinite", num);

  return (
    <mesh>
      <mesh>
        <RandomImage3D num={num} />
      </mesh>
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