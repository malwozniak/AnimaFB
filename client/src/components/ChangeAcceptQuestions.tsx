import React, { Component } from 'react';
import {  AnimationListContainer, AnimationListRowFirst, Form } from '../constants/style';

import { generateRandomAnimation } from '../utils/functions';
import AnimationList from './AnimationList';
type QuestionProps = {
  question: string;
  showCard: boolean;
  showContainer: boolean;
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
  handleButtonClick = () => {
    const answer = this.state;
    fetch('/api/question',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({numberBalls: answer})
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });


    this.setState((prevState) => ({
      clickCount: prevState.clickCount + 1
    }), () => {
      if (this.state.clickCount === 3) {
        this.setState({ showThankYouMessage: true, showCards: true });
        console.log(this.state.clickCount)
      }
    });
  };
  
 
  render() {
    const { showCards, showThankYouMessage, showAnimationList} = this.state;
    const {question, showCard, showContainer} = this.props;

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
        <input type="submit" value="Zatwierdź" onClick={() => {
                          this.handleButtonClick 
          
          this.setState({ showCards: true,  showAnimationList: true})
        }
      }
 />

       </Form>

        )}
          </AnimationListRowFirst>
            {showAnimationList &&  (
         <AnimationList  
         num={generateRandomAnimation(0,15)} showCards={true} showContainer={true}/>
       
       )}
        {showCards && !showThankYouMessage }
        {showThankYouMessage && <p>Dziękuję za wypełnienie formularza oraz wzięcia udziału w badaniu!</p>}
      </AnimationListContainer>
    );
  }
}


export default ChangeAcceptQuestions;
