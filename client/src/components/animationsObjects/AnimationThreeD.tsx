import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { generateRandomAnimation } from '../../library/utils/functions';
import { AnimationMotionProps } from '../types/Animation';

let acceleration = 0.05;
let bounce_distance = 2;
let bottom_position_y = 0;
let time_step = 0.1;
let time_counter = Math.sqrt((-bounce_distance * 2) / -acceleration);
let initial_speed = acceleration * time_counter;

export default function AnimationMotion({ updatePositions }: AnimationMotionProps) {
  const mesh = useRef<THREE.Mesh | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const duration = 2000; // Duration in milliseconds

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  useFrame(() => {
    if (mesh.current) {
      const elapsedTime = Date.now() - (startTime ?? 0);
      const progress = Math.min(elapsedTime / duration, 1); // Calculate animation progress from 0 to 1

      if (progress === 1) {
        // Animation completed
        return;
      }

      if (generateRandomAnimation(1, 15) % 2) {
        if (mesh.current.position.x < bottom_position_y) {
          time_counter = 0;
        }

        mesh.current.position.x =
          bottom_position_y +
          initial_speed * time_counter -
          0.5 * acceleration * time_counter * time_counter;

        time_counter += time_step;
      } else {
        if (mesh.current.position.y < bottom_position_y) {
          time_counter = 0;
        }

        mesh.current.position.y =
          bottom_position_y +
          initial_speed * time_counter -
          0.5 * acceleration * time_counter * time_counter;

        time_counter += time_step;
      }
    }
  });

  useEffect(() => {
    updatePositions([], [initial_speed], 'linear', String(bounce_distance));
  }, []);

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
