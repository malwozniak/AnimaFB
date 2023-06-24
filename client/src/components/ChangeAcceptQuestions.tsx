import React, { Component } from 'react';
import {  AnimationListContainer, AnimationListRowFirst, FieldsetIN, FieldsetNum, FieldsetQ, Form, LabelChoice, TextArea } from '../constants/style';

import { generateRandomAnimation } from '../utils/functions';
import AnimationList from './AnimationList';
import { updateUser } from '../API';
import { chosenBallType, chosenMoving, sectionType } from '../constants';


type QuestionProps = {
  question: string;
  showCard: boolean;
  showContainer: boolean;
  sendAnswer: (user: IUser) => void;
  user:IUser;
  indexBoard: number;
  };
interface QuestionListState {
  answer: number;
  isSubmitted: boolean;
  randomAnimation: number;
  showCards: boolean;
  min: number;
  max: number;
  clickCount: number;
  showThankYouMessage: boolean;
  showAnimationList: boolean;
  selectedAns: string,
  textArea: string,
  chosenSection: Array<String>,
  indexBoard: number,
  
};

class ChangeAcceptQuestions extends Component<QuestionProps,QuestionListState> {
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
      chosenSection: [],
      indexBoard: this.props.indexBoard,

    };
  }
  handleTextAreaAnswer = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
   this.setState({ textArea: e.target.value }) ;
  };


  handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ answer: Math.max(this.state.min, Math.min(this.state.max,Number(e.target.value))) });
  };


  handleButtonClick = async () => {
    try {
      this.setState({ showCards: true,  showAnimationList: true});
     
      const { sendAnswer } = this.props;
      const { answer } = this.state;
    this.setState((prevState) => ({
      indexBoard: prevState.indexBoard
    }), () => {
      if (this.state.indexBoard === 3) {
        this.setState({ showThankYouMessage: true, showCards: true });
        // console.log(this.state.indexBoard)
      }
    });

    const updatedAnswer: IUser = {
      ...sendAnswer,
      _id: this.props.user._id,
      age:  this.props.user.age,
      gender:  this.props.user.gender,
      sayYesNo:  this.props.user.sayYesNo,
      animationType:  this.props.user.animationType,
      model:  'kula',
      object:  [chosenBallType],
      movement: [chosenMoving],
      image: [this.state.textArea],
      section: [this.state.chosenSection],
      numberOfBalls: [answer],
      status: false
    };
    console.log('Odpowiedź zaktualizowana', updatedAnswer)

    updateUser(updatedAnswer)
     

  
  }catch (error) {
    console.error('Błąd przesyłania danych formularza:', error);
  }


  };
  
  choiceHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
  
    this.setState((prevState) => {
      if (checked) {
        return {
          chosenSection: [...prevState.chosenSection, value.toLowerCase()],
        };
      } else {
        return {
          chosenSection: prevState.chosenSection.filter(
            (option) => option !== value.toLowerCase()
          ),
        };
      }
    });
  };
 
  render() {
    const { showCards, showThankYouMessage, showAnimationList, textArea, indexBoard} = this.state;
    const {question, showCard, showContainer, user } = this.props;

    return (
      <AnimationListContainer style={{display: showContainer? "grid": "none"}} >
         {/* {console.log("SHOWCARDS",showCards)} */}
          
         {!showCards && indexBoard <= 3 && ( 
        <AnimationListRowFirst  style={{ display: showCard ? "none" : "grid" }} >

        
          <Form >
            <FieldsetIN>
              <legend>Wypisz, co pojawiło się na zdjęciach:</legend>
             <TextArea placeholder='Tutaj wpisz swoje spostrzeżenia...' value={textArea} onChange={this.handleTextAreaAnswer} />
             
            </FieldsetIN>


          
            <FieldsetQ>
              <legend>Zaznacz, w których kartach były dane obiekty kuli:</legend>
              {sectionType.map((option, index) => (
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
             
            </FieldsetQ>
            
            <FieldsetNum>
                <label>


                  {`${question}`}
                  Wprowadź poniżej liczbę policzonych kulek:
                </label>
                <input
                  type="number"
                  placeholder="0"
                  min="0"
                  max="100"
                  onChange={this.handleAnswerChange}
                />
        </FieldsetNum>
        <FieldsetIN>
        <input type="submit" value="Zatwierdź" onClick={this.handleButtonClick}
 />
</FieldsetIN>
       </Form>


          </AnimationListRowFirst>
          )}
            {showAnimationList && indexBoard <= 3 && (
              
         <AnimationList  
            indexBoard={this.state.indexBoard} showCards={true} showContainer={true} user={user} />
       
       )}
        {showCards && showThankYouMessage 
         && <p>Dziękuję za wypełnienie formularza oraz wzięcia udziału w badaniu!</p>}
         
      </AnimationListContainer>
    );
  }
}


export default ChangeAcceptQuestions;


