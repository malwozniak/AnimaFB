import React from 'react';
import { ChoiceGroup, Form, LabelChoice } from '../constants/style';
import AnimationList from './AnimationList';
import { generateRandomAnimation } from '../utils/functions';
import { gender, answerYesNo, animationWhich } from '../constants';
import { addUser } from '../API';

type Props = {
  saveUser: (formData: IUser) => void;
};

type State = {
  formData: IUser,
  isSubmitted: boolean,
  showCards: boolean,
  chosenNumber: number,
  selectedGender: string,
  selectedAns: string,
  randomAnimation: number,
  selectedFewAns: {
    id: string;
  }
  validationErrors: {
    age?: string,
    gender?: string,
    sayYesNo?: string,
    animationType?: string
  },
};

class AddUser extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      formData: {
        _id: this.generateUniqueId(), 
        age: 0,
        gender: '' ,
        sayYesNo: '',
        animationType: [],
        model: '',
        object: '',
        positionX: 0,
        positionY: 0,
        positionZ: 0,
        image: '',
        section: '',
        movement: '',
        speed: 0,
        distance: 0,
        numberOfBalls: 0,
        status: false
      },
      isSubmitted: false,
      showCards: true,
      chosenNumber: 0,
      selectedGender: '',
      selectedAns: '',
      selectedFewAns:{
        id: ''
      },
      randomAnimation: generateRandomAnimation(1, 16),
      validationErrors: {
        age: '',
        gender: '',
        sayYesNo: '',
        animationType: ''
      },

    };

  }

  validateForm = (): boolean => {
    const { formData } = this.state;
    const errors: any = {};
  
    if (formData.age <= 0 || formData.age > 100) {
      errors.age = 'Age must be between 1 and 100';
    }
  
    if (formData.gender === '') {
      console.log("please select")
      errors.gender = 'Please select a gender';
    }
  
    if (formData.sayYesNo === '') {
      console.log("please select")

      errors.sayYesNo = 'Please select an option';
    }
  
    if (formData.animationType.length === 0) {
      errors.animationType = 'Please select at least one option';
    }
  
    this.setState({ validationErrors: errors });
  
    return Object.keys(errors).length === 0;
  };
  generateUniqueId = (): string => {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 10000);
    const uniqueId = `${timestamp}_${random}`;
    return uniqueId;
  };
  handleAge  = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { formData } = this.state;
    const chosenNumber = Number(event.target.value);

    this.setState({
      chosenNumber,
      formData: {
        ...formData,
        age: chosenNumber
      }
    });
  }

    radioHandlerG = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { formData } = this.state;
      const selectedGender = event.target.value;
    
      this.setState({
        selectedGender,
        formData: {
          ...formData,
          gender: selectedGender
        }
      });
    };
    radioHandlerY = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { formData } = this.state;
      const selectedAns = event.target.value;
    
      this.setState({
        selectedAns,
        formData: {
          ...formData,
          sayYesNo: selectedAns
        }
      });
    };
    choiceHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { formData } = this.state;
      const selectedAnimation = event.target.value;
    
      let updatedAnimationType;
      if (formData.animationType.includes(selectedAnimation)) {
        updatedAnimationType = formData.animationType.filter(
          (animation: string) => animation !== selectedAnimation
        );
      } else {
        updatedAnimationType = [...formData.animationType, selectedAnimation];
      }
    
      this.setState({
        formData: {
          ...formData,
          animationType: updatedAnimationType
        }
      });
    };
    

     handleClick = async () => {
      try {
        this.setState({
          showCards: false,
          isSubmitted: true
        });
        console.log(this.state.formData)
          const response = await addUser(this.state.formData);
      
          if (response.status === 200 || response.status === 201) {
            console.log('Form data submitted successfully');
          } else {
            console.error('Failed to submit form data');
          }
        } catch (error) {
          console.error('Error submitting form data:', error);
        }
      };
        

  handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    const { formData } = this.state;
  console.log("DATA", formData)
    if (this.validateForm()) {
      console.log("please select f", formData)

      this.props.saveUser(formData);
      this.setState({ isSubmitted: true });
    }
  };

  render() {
    const { formData, isSubmitted, showCards, randomAnimation, validationErrors } = this.state;

    return (
      <>
        {showCards === true && (
          <Form onSubmit={this.handleSubmit} style={{ display: showCards ? "grid" : "none" }}>
            <label htmlFor='age'>Podaj wiek</label>
            <input onChange={this.handleAge} type='number' max="100" min="0" id='age' placeholder="0" />
            {validationErrors.age && <span className='error'>{validationErrors.age}</span>}

            <fieldset>
              <legend>Zaznacz swoją płeć:</legend>
              {gender.map((option, index) => (
              <ChoiceGroup key={index}>

                <LabelChoice key={index}>
                  <input
                    type="radio"
                    name="gender"
                    value={option.toLowerCase()}
                    id={`gender-${index}`}
                    onChange={this.radioHandlerG}
                  />
                  <label htmlFor={`gender-${index}`}>{option}</label>
                </LabelChoice>
                </ChoiceGroup>

              ))}
               {validationErrors.gender && <span className='error'>{validationErrors.gender}</span>}

            </fieldset>

            <fieldset>
              <legend>Czy wcześniej zwróciłaś/zwróciłeś uwagę na animację będące na stronie:</legend>
              {answerYesNo.map((option, index) => (
                <LabelChoice key={index}>
                  <input
                    type="radio"
                    name="sayYesNo"
                    value={option.toLowerCase()}
                    id={`sayYesNo-${index}`}
                    onChange={this.radioHandlerY}
                  />
                  
                  <label htmlFor={`sayYesNo-${index}`}>{option}</label>
                </LabelChoice>
                
              ))}
              {validationErrors.sayYesNo && <span className='error'>{validationErrors.sayYesNo}</span>}

            </fieldset>

            <fieldset style={{ display: "flex" }}>
              <legend>Jakie animacje najbardziej zwróciły twoją uwagę?</legend>
              {animationWhich.map((option, index) => (
                <LabelChoice key={index}>
                  <input
                    type="checkbox"
                    name="animationType"
                    value={option.toLowerCase()}
                    id={`animationType-${index}`}
                    onChange={this.choiceHandler}
                  />
                  <label htmlFor={`animationType-${index}`}>{option}</label>
                </LabelChoice>
              ))}
              {validationErrors.animationType && <span className='error'>{validationErrors.animationType}</span>}

            </fieldset>
            <input disabled={!formData.age || !formData.gender || !formData.sayYesNo || formData.animationType.length === 0} onClick={this.handleClick} type="submit" value="Zatwierdź" />

          </Form>
        )}

        <div style={{ display: showCards ? "none" : "grid" }}>
          {showCards === false && isSubmitted === true && (
            <AnimationList num={randomAnimation} showCards={true} showContainer={true}/>
          )}
        </div>
      </>
    );
  }
}

export default AddUser;
