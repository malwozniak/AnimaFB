import React, { Component } from 'react';
import {  AnimationListContainer, AnimationListRowFirst, Form } from '../constants/style';

import { generateRandomAnimation } from '../utils/functions';
import AnimationList from './AnimationList';
import { updateUser } from '../API';


type QuestionProps = {
  question: string;
  showCard: boolean;
  showContainer: boolean;
  sendAnswer: (user: IUser) => void;
  user:IUser;
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
    };
  }

  handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ answer: Math.max(this.state.min, Math.min(this.state.max,Number(e.target.value))) });
  };
  handleButtonClick = async () => {
    try {
      this.setState({ showCards: true,  showAnimationList: true});
      console.log("Idę")
      const { sendAnswer } = this.props;
      const { answer } = this.state;
    this.setState((prevState) => ({
      clickCount: prevState.clickCount + 1
    }), () => {
      if (this.state.clickCount === 3) {
        this.setState({ showThankYouMessage: true, showCards: true });
        console.log(this.state.clickCount)
      }
    });

    const updatedAnswer: IUser = {
      ...sendAnswer,
      _id: this.props.user._id,
      age:  this.props.user.age,
      gender:  this.props.user.gender,
      sayYesNo:  this.props.user.sayYesNo,
      animationType:  this.props.user.animationType,
      model:  this.props.user.model,
      object:  this.props.user.object,
      positionX:  this.props.user.positionX,
      positionY:  this.props.user.positionY,
      positionZ:  this.props.user.positionZ,
      image:  this.props.user.image,
      section:  this.props.user.section,
      movement:  this.props.user.movement,
      speed:  this.props.user.speed,
      distance:  this.props.user.distance,
      numberOfBalls: [answer],
      status: false
    };
    console.log('LALALALALALLA', updatedAnswer)

    updateUser(updatedAnswer)
     

  
  }catch (error) {
    console.error('Błąd przesyłania danych formularza:', error);
  }


  };
  
 
  render() {
    const { showCards, showThankYouMessage, showAnimationList} = this.state;
    const {question, showCard, showContainer, user } = this.props;

    return (
      <AnimationListContainer style={{display: showContainer? "grid": "none"}} >
        <AnimationListRowFirst  style={{ display: showCard ? "none" : "grid" }} >

        {showCards === false && (
          <Form >
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
        <input type="submit" value="Zatwierdź" onClick={this.handleButtonClick}
 />

       </Form>

        )}
          </AnimationListRowFirst>
            {showAnimationList &&  (
         <AnimationList  
            num={generateRandomAnimation(0, 15)} showCards={true} showContainer={true} user={user}/>
       
       )}
        {showCards && !showThankYouMessage }
        {showThankYouMessage && <p>Dziękuję za wypełnienie formularza oraz wzięcia udziału w badaniu!</p>}
      </AnimationListContainer>
    );
  }
}


export default ChangeAcceptQuestions;


