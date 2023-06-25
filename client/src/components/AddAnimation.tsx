import React from 'react';
import { generateRandomAnimation, generateUniqueID } from '../utils/functions';
import { IAnimation } from '../types/animation';

type Props = {
  saveAnimation: (formDataAnimation: IAnimation) => void;
  user: IUser;
};

type State = {
  formDataAnimation: IAnimation,
  chosenNumber: number,
  randomAnimation: number,
};

class AddAnimation extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      formDataAnimation: {
        id: Number(generateUniqueID()), 
        userId: this.props.user,
        name: '',
        model: '',
        object: [],
        positionX: [],
        positionY: [],
        positionZ: [],
        image: '',
        section: '',
        movement: '',
        speed: '',
        information: [],
        status: false
      },
      chosenNumber: 0,
      randomAnimation: generateRandomAnimation(1, 16),
    };
  }

  render() {
    return (
      <>
        {/*  */}
      </>
    );
  }
}

export default AddAnimation;
