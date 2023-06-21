import React from 'react';
import { ChoiceGroup, Form, LabelChoice } from '../constants/style';
import AnimationList from './AnimationList';
import { generateRandomAnimation } from '../utils/functions';
import { gender, answerYesNo, animationWhich } from '../constants';

type Props = {
  saveUser: (formData: IUser) => void;
};

type State = {
  formData: IUser,
  isSubmitted: boolean,
  showCards: boolean,
  selectedGender: string | undefined,
  randomAnimation: number,
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
        _id: '',
        age: 0,
        gender: '',
        sayYesNo: '',
        animationType: [],
        status: false
      },
      isSubmitted: false,
      showCards: true,
      selectedGender: undefined,
      randomAnimation: generateRandomAnimation(1, 16),
      validationErrors: {
        age: '',
        gender: '',
        sayYesNo: '',
        animationType: ''
      },

    };
  }

  handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    const { formData } = this.state;
    if (e.currentTarget.name === 'sayYesNo') {
      this.setState({
        formData: {
          ...formData,
          sayYesNo: e.currentTarget.value
        }
      });
    } else if (e.currentTarget.name === 'animationType') {
      const checked = e.currentTarget.checked;
      const option = e.currentTarget.value;
      let animationTypes = formData.animationType.slice();
  
      if (checked) {
        animationTypes.push(option);
      } else {
        animationTypes = animationTypes.filter((type: string) => type !== option);
      }
  
      this.setState({
        formData: {
          ...formData,
          animationType: animationTypes
        }
      });
    } else {
      this.setState({
        formData: {
          ...formData,
          [e.currentTarget.name]: e.currentTarget.value
        }
      });
    }
  };

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

  radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      selectedGender: event.target.value
    });
  }

  handleClick = (): void => {
    this.setState({
      showCards: false,
      isSubmitted: true
    });
  }
  handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    const { formData } = this.state;
  
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
            <input onChange={this.handleForm} type='number' max="100" min="0" id='age' placeholder="0" />
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
                    onChange={this.radioHandler}
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
                    onChange={this.radioHandler}
                  />
                  {`sayYesNo-${index}`}
                  
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
                    onChange={this.radioHandler}
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
