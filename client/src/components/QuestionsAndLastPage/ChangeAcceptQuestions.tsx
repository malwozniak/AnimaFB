import React, { Component } from 'react';
import {
  AnimationListContainer,
  AnimationListRowFirst,
  Fieldset,
  FieldsetIN,
  FieldsetNum,
  animationWhich,
  Form,
  LabelChoice,
  TextArea,
  generateRandomAnimation,
  ballType,
  updateUser,
  sectionType,
  FieldsetQ,
} from '../../library/library/allImports';
import AnimationList from '../AnimationList/AnimationList';

class ChangeAcceptQuestions extends Component<QuestionProps, QuestionListState> {
  constructor(props: any) {
    super(props);
    this.state = {
      answer: 0,
      isSubmitted: false,
      clickCount: 0,
      showThankYouMessage: false,
      showAnimationList: false,
      randomAnimation: generateRandomAnimation(1, 16),
      showCards: false,
      min: 0,
      max: 150,
      selectedAns: '',
      textArea: '',
      textAreaNegative: '',
      chosenSection: [],
      arrayNumbers: [],
      chooseBall: '',
      chosenSectionFirst: [],
      choiceHandlerSection:[],
      indexBoard: this.props.indexBoard,
      previousStates: [],
    };
    
    this.handleTextAreaAnswer = this.handleTextAreaAnswer.bind(this);
    this.handleTextAreaAnswerNeg = this.handleTextAreaAnswerNeg.bind(this);
    this.handleAnswerChange = this.handleAnswerChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.choiceHandler = this.choiceHandler.bind(this);
    this.choiceHandlerFirst= this.choiceHandlerFirst.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleTextAreaAnswer = (e: { target: { value: any } }) => {

    this.setState({ textArea: e.target.value });
  };

  handleTextAreaAnswerNeg = (e: { target: { value: any } }) => {
    this.setState({ textAreaNegative: e.target.value });
  };

  handleAnswerChange = (e: { target: { value: any } }) => {
          const ans = Math.max(this.state.min, Math.min(this.state.max, Number(e.target.value)))
    this.setState({ answer: ans });
  };
  handleButtonClick = async () => {
    try {
      if (!this.state.isSubmitted) {
      this.setState({ showCards: true, showAnimationList: true });
  

      // Ustawiamy isSubmitted na true, aby następnie zakończyć cykl
      this.setState({ isSubmitted: true });
    } else {
      // Przycisk "Zatwierdź" został kliknięty, kończymy cykl
      if (this.state.indexBoard === 3) {
        this.setState({ showThankYouMessage: true, showCards: true });
      }


      
    }
  } catch (error) {
    console.error('Błąd przesyłania danych formularza:', error);
  }
};


handleSaveClick = async () => {
  
 
  const { saveUpdate  } = this.props;
  
  try {
    // Retrieve the necessary form data from the component's state
    const {
      answer,
      textArea,
      chosenSectionFirst,
      chosenSection,
      textAreaNegative,
      arrayNumbers,
      choiceHandlerSection,
    } = this.state;

    // Manipulate or process the data as needed
    const arrayAnswers=[]
    const model = 'kula';
    arrayAnswers.push([this.props.numberOBalls,this.state.arrayNumbers ])
    // Create the updated answer object
    const updatedAnswer = {
      
      _id: this.props.user._id,
      age: this.props.user.age,
      gender: this.props.user.gender,
      sayYesNo: this.props.user.sayYesNo,
      animationType: this.props.user.animationType,
      model: [model],
      object: chosenSection,
      movement: chosenSectionFirst,
      opinion: textArea,
      badOpinion: textAreaNegative,
      section: choiceHandlerSection,
      numberOfBalls: [...arrayNumbers],
      status: false,
    };

    // Perform the saving operation, e.g., send the updatedAnswer to the server
    const response = await updateUser(
      updatedAnswer,
      answer,
      chosenSectionFirst,
      chosenSection,
      textArea,
      textAreaNegative,
      choiceHandlerSection,
      
    );
    saveUpdate(
      updatedAnswer,
      answer,
      chosenSectionFirst,
      chosenSection,
      textArea,
      textAreaNegative,
      choiceHandlerSection,
      
    );
    if (response) {
      console.log('Dane formularza zostały przesłane do bazy danych.');
    }
    // Handle the response or perform any additional actions

    console.log('Data saved successfully!');
  } catch (error) {
    console.error('Error while saving data:', error);
  }
};

choiceHandlerSection = (event: { target: { value: any; checked: any } }) => {
  const { value, checked } = event.target;

  this.setState(() => {
    if (checked) {
      return {
        choiceHandlerSection: [...this.state.choiceHandlerSection, value.toLowerCase()],
      };
    } else {
      return {
        choiceHandlerSection : this.state.choiceHandlerSection.filter((option: any) => option !== value.toLowerCase()),
      };
    }
  });
};

  choiceHandler = (event: { target: { value: any; checked: any } }) => {
    const { value, checked } = event.target;

    this.setState(() => {
      if (checked) {
        return {
          chosenSection: [...this.state.chosenSection, value.toLowerCase()],
        };
      } else {
        return {
          chosenSection: this.state.chosenSection.filter((option: any) => option !== value.toLowerCase()),
        };
      }
    });
  };

  choiceHandlerFirst = (event: { target: { value: any; checked: any } }) => {
    const { value, checked } = event.target;

    this.setState(() => {
      if (checked) {
        return {
          chosenSectionFirst: [...this.state.chosenSectionFirst, value.toLowerCase()],
        };
      } else {
        return {
          chosenSectionFirst: this.state.chosenSectionFirst.filter((option: any) => option !== value.toLowerCase()),
        };
      }
    });
  };

  render() {
    const { showCards, showThankYouMessage, showAnimationList, textArea, textAreaNegative, indexBoard } = this.state;
    const { question, showCard, showContainer, user } = this.props;
console.log("ARRAY " , this.state.arrayNumbers)
    return (
      <AnimationListContainer style={{ display: showContainer ? 'grid' : 'none' }}>
        {!showCards && indexBoard <= 3 && (
          <AnimationListRowFirst style={{ display: showCard ? 'none' : 'grid' }}>
            <Form>
              <FieldsetIN>
                <legend>Wypisz, która animacja była według ciebie najlepsza i uzasadnij dlaczego:</legend>
                
                <TextArea placeholder="Tutaj wpisz swoje spostrzeżenia..." value={textArea} onChange={this.handleTextAreaAnswer} />
              </FieldsetIN>
              <FieldsetIN>
                <legend>Wypisz, która animacja była według ciebie najgorsza i uzasadnij dlaczego:</legend>
          
                <TextArea placeholder="Tutaj wpisz swoje spostrzeżenia..." value={textAreaNegative} onChange={this.handleTextAreaAnswerNeg} />
              </FieldsetIN>
              <Fieldset>
                <legend>Jakie animacje najbardziej zwróciły twoją uwagę?</legend>
                {animationWhich.map((option, index) => (
                  <LabelChoice key={index}>
                    <input
                      type="checkbox"
                      name="animationType"
                      value={option.toLowerCase()}
                      id={`animationType-${index}`}
                      onChange={this.choiceHandlerFirst}
                    />
                    <label htmlFor={`animationType-${index}`}>{option}</label>
                  </LabelChoice>
                ))}
              </Fieldset>
              <FieldsetQ>
                <legend>Zaznacz, w których kartach była wcześniej wybrana kulka:</legend>
                {sectionType.map((option, index) => (
                  <LabelChoice key={index}>
                    <input
                      type="checkbox"
                      name="sectionType"
                      value={option.toLowerCase()}
                      id={`sectionType-${index}`}
                      onChange={this.choiceHandlerSection}
                    />
                    <label htmlFor={`sectionType-${index}`}>{option}</label>
                  </LabelChoice>
                ))}
              </FieldsetQ>
              <Fieldset>
                <legend>Zaznacz, które animacje zwróciły bardziej twoją uwagę:</legend>
                {ballType.map((option, index) => (
                  <LabelChoice key={index}>
                    <input
                      type="checkbox"
                      name="ballType"
                      value={option.toLowerCase()}
                      id={`ballType-${index}`}
                      onChange={this.choiceHandler}
                    />
                    <label htmlFor={`ballType-${index}`}>{option}</label>
                  </LabelChoice>
                ))}
              </Fieldset>
              <FieldsetNum>
                <label>{`${question}`} Wprowadź poniżej liczbę częstości występowania w kartach wybranej, wcześniej kulki :</label>
                <input
                  type="number"
                  placeholder="0"
                  min="0"
                  max="100"
                  onChange={this.handleAnswerChange}
                />
              </FieldsetNum>
             
              <FieldsetIN>
                <input type="button" value="Zapisz" onClick={this.handleSaveClick} />
                <input type="submit" value="Zatwierdź" onClick={this.handleButtonClick} />
              </FieldsetIN>
            </Form>
          </AnimationListRowFirst>
        )}
        {showAnimationList && indexBoard < 3 && (
          <AnimationList
            indexBoard={this.state.indexBoard}
            showCards={true}
            showContainer={true}
            user={user}
            onClick={this.handleButtonClick} 
            saveUser={()=>{}} 
            saveAnimation={()=>{} } 
            saveUpdateAnimation={()=>{}}
            numberOBalls={this.state.arrayNumbers}           />
        )}
        {showThankYouMessage && <h2>Dziękujemy za wypełnienie ankiety!</h2>}
      </AnimationListContainer>
    );
  }
}

export default ChangeAcceptQuestions;