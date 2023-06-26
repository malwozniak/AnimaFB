import React from 'react';
import { IAnimation } from '../types/Animation';


type Props = {
  saveAnimation: (animation: IAnimation) => void;
};

type State = {
  animation: {
    id: string;
    userId: string;
    name: string;
    object: string;
    position: number[];
    image: string;
    section: string;
    movement: string;
    speed: number[];
    distance: string;
    information: any;
    status: boolean;
  };
};

class AddAnimation extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      animation: {
        id: '',
        userId: '',
        name: '',
        object: '',
        position: [0],
        image: '',
        section: '',
        movement: '',
        speed: [0],
        distance: '',
        information: {},
        status: false,
      },
    };
  }

  componentDidMount() {
    this.run();
  }

  run = async () => {
    try {
      // const response = await addAnimation(this.state.animation);
      this.props.saveAnimation(this.state.animation);
      // if (response.status === 200 || response.status === 201) {
      //   console.log('Dane formularza przesłane pomyślnie');
      // } else {
      //   console.error('Nie udało się przesłać danych formularza');
      // }
    } catch (error) {
      console.error('Błąd przesyłania danych formularza:', error);
    }
  };

  render() {
    return null; // Render nothing
  }
}

export default AddAnimation;