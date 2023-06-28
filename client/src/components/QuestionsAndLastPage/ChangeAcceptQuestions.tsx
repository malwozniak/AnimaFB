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
      chooseBall: '',
      chosenSectionFirst: [],
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
    this.setState({ answer: Math.max(this.state.min, Math.min(this.state.max, Number(e.target.value))) });
  };
  handleButtonClick = async () => {
    try {
      this.setState({ showCards: true, showAnimationList: true });
  
      const { saveUser, saveUpdate } = this.props;
      const { answer, textArea, chosenSectionFirst, previousStates, chosenSection, textAreaNegative, chooseBall } = this.state;
      const arraNumbers = [];
      arraNumbers.push(this.props.numberOBalls)
  
      const updatedAnswer = {
        ...saveUser,
        _id: this.props.user._id,
        age: this.props.user.age,
        gender: this.props.user.gender,
        sayYesNo: this.props.user.sayYesNo,
        animationType: this.props.user.animationType,
        model: ['kula'],
        object: chooseBall,
        movement:  chosenSectionFirst,
        opinion: textArea,
        badOpinion:  textAreaNegative,
        section: chosenSection,
        numberOfBalls: [arraNumbers],
        status: false,
      };
      console.log("HELP", [...previousStates.map((state: { answer: any; }) => state.answer)])
console.log("number of", this.state.answer)
  console.log("UPDATED ANSWER", updatedAnswer)
      const response = await updateUser(
        updatedAnswer,
        answer,
        chosenSectionFirst,
        chosenSection,
        textArea,
        textAreaNegative,
        chooseBall
      );
      console.log('Odpowiedź zaktualizowana', updatedAnswer);
  
      if (response.status === 200 || response.status === 201) {
        console.log('Dane formularza przesłane pomyślnie');
      } else {
        console.error('Nie udało się przesłać danych formularza');
      }
  
      if (this.state.indexBoard === 3) {
        this.setState({ showThankYouMessage: true, showCards: true });
      }
  
      saveUpdate(
        updatedAnswer,
        answer,
        chosenSectionFirst,
        chosenSection,
        textArea,
        textAreaNegative,
        chooseBall
      );
    } catch (error) {
      console.error('Błąd przesyłania danych formularza:', error);
    }
  };



  choiceHandler = (event: { target: { value: any; checked: any } }) => {
    const { value, checked } = event.target;

    this.setState((prevState) => {
      if (checked) {
        return {
          chosenSection: [...prevState.chosenSection, value.toLowerCase()],
        };
      } else {
        return {
          chosenSection: prevState.chosenSection.filter((option: any) => option !== value.toLowerCase()),
        };
      }
    });
  };

  choiceHandlerFirst = (event: { target: { value: any; checked: any } }) => {
    const { value, checked } = event.target;

    this.setState((prevState) => {
      if (checked) {
        return {
          chosenSectionFirst: [...prevState.chosenSectionFirst, value.toLowerCase()],
        };
      } else {
        return {
          chosenSectionFirst: prevState.chosenSectionFirst.filter((option: any) => option !== value.toLowerCase()),
        };
      }
    });
  };

  render() {
    const { showCards, showThankYouMessage, showAnimationList, textArea, textAreaNegative, indexBoard } = this.state;
    const { question, showCard, showContainer, user } = this.props;

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
              <Fieldset>
                <legend>Zaznacz, w których kartach były dane obiekty kuli:</legend>
                {ballType.map((option, index) => (
                  <LabelChoice key={index}>
                    <input
                      type="checkbox"
                      name="sectionType"
                      value={option.toLowerCase()}
                      id={`sectionType-${index}`}
                      onChange={this.choiceHandler}
                    />
                    <label htmlFor={`sectionType-${index}`}>{option}</label>
                  </LabelChoice>
                ))}
              </Fieldset>
              <FieldsetNum>
                <label>{`${question}`} Wprowadź poniżej liczbę policzonych kulek:</label>
                <input
                  type="number"
                  placeholder="0"
                  min="0"
                  max="100"
                  onChange={this.handleAnswerChange}
                />
              </FieldsetNum>
              <FieldsetIN>
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
            numberOBalls={this.state.answer}           />
        )}
        {showThankYouMessage && <h2>Dziękujemy za wypełnienie ankiety!</h2>}
      </AnimationListContainer>
    );
  }
}

export default ChangeAcceptQuestions;
