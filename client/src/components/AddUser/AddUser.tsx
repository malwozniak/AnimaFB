import React from 'react';
import {  ChoiceGroup, Fieldset, Form,  LabelChoice, addUser, animationWhich, answerYesNo, gender, generateRandomAnimation, generateUniqueID } from '../../library/library/allImports';
import AnimationList from '../AnimationList/AnimationList';

class AddUser extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      formData: {
        _id: generateUniqueID(), 
        age: 0,
        gender: '' ,
        sayYesNo: '',
        animationType: '',
        model: '',
        object: [],
        opinion: [],
        section: [],
        movement: [],
        numberOfBalls: [],
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
      errors.age = 'Wiek musi być pomiędzy 1 a 100';
    }
  
    if (formData.gender === '') {
      console.log("Proszę zaznaczyć.")
      errors.gender = 'Proszę zaznaczyć płeć';
    }
  
    if (formData.sayYesNo === '') {
      console.log("Proszę zaznaczyć.")

      errors.sayYesNo = 'Proszę zaznaczyć opcję.';
    }
  
    if (formData.animationType.length === 0) {
      errors.animationType = 'Proszę zaznaczyć przynajmniej jedną z opcji.';
    }
  
    this.setState({ validationErrors: errors });
  
    return Object.keys(errors).length === 0;
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
            console.log('Dane formularza przesłane pomyślnie');
          } else {
            console.error('Nie udało się przesłać danych formularza');
          }
        } catch (error) {
          console.error('Błąd przesyłania danych formularza:', error);
        }
      };
        

  handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    const { formData } = this.state;
    
    if (this.validateForm()) {
      this.props.saveUser(formData);
      this.setState({ isSubmitted: true });
    }
  };

  render() {
    const { formData, isSubmitted, showCards, validationErrors } = this.state;

    return (
      <>
        {showCards === true && (
          <Form onSubmit={this.handleSubmit} style={{ display: showCards ? "grid" : "none" }}>
            <label htmlFor='age'>Podaj wiek</label>
            <input onChange={this.handleAge} type='number' max="100" min="0" id='age' placeholder="0" />
            {validationErrors.age && <span className='error'>{validationErrors.age}</span>}

            <Fieldset>
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

            </Fieldset>

            <Fieldset>
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

            </Fieldset>

            <Fieldset>
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

            </Fieldset>
            {/* <input disabled={!formData.age || !formData.gender || !formData.sayYesNo || formData.animationType.length === 0} onClick={this.handleClick} type="submit" value="Zatwierdź" /> */}
            <input onClick={this.handleClick} type="submit" value="Zatwierdź" />

          </Form>
        )}

        <div style={{ display: showCards ? "none" : "grid" }}>
          {showCards === false && isSubmitted === true && (
            <AnimationList indexBoard={0} showCards={true} showContainer={true} user={formData} saveUser={this.props.saveUser} saveAnimation={this.props.saveAnimation}          />
          )}
        </div>
      </>
    );
  }
}

export default AddUser;
