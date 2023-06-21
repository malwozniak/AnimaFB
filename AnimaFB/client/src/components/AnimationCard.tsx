/**
 * Utworzenie komponentu pokazującego informacje o danej animacji
 */
import * as React from 'react';
import { useState, useEffect } from 'react';
import { AnimationCardContainer, AnimationCardTitle, AnimationDescription, DoubleColumnCard } from '../constants/style';

import { Animation } from '../types/animation';

type AnimationCardProps = {
  animation: Animation;
};

function AnimationCard({ animation }: AnimationCardProps) {
  const [animationDescription, setAnimationDescription] = useState<string>('');
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    const fetchAnimationSpecies = async () => {
      const result = await fetch(animation.species.url);
      return await result.json();
    };

    fetchAnimationSpecies().then((data) => {
      const description = data.text_animation
        .filter((item: { language: { name: string; }; }) => {
          return item.language.name === 'en';
        })[0]
        .text_entry.replace(/[^a-zA-Z é . , ']/g, ' ');
      setAnimationDescription(description);
      setIsReady(true);
    });
  }, [animation.species.url]);

  return (
    <AnimationCardContainer>
      {isReady && (
        <div>
          <AnimationCardTitle>{animation.name}</AnimationCardTitle>
         
          <DoubleColumnCard>
          
          </DoubleColumnCard>
          <AnimationDescription>{animationDescription}</AnimationDescription>
        </div>
      )}
    </AnimationCardContainer>
  );
}


export default AnimationCard;
