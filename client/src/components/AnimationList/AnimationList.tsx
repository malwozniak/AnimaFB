/**
 * Utworzenie komponentu z  macierzą wyświtlającą obiekty z animacjami
 */

import React, { Component } from "react";
import { AnimationListBox, AnimationListRow, AnimationListRowFirst, BallShow, Canvas, Card, CardBorder, CardContainer, ChangeAcceptQuestions, GlobalStyle, IAnimation,   generateRandomAnimation, generateUniqueID, nameObjects, questions } from "../../library/library/allImports";
import { addAddAnimation, addAnimation } from "../../API/API";
import SphereMove from "../AnimationsObjects/AnimationThreeD";
import AnimationMotion from "../AnimationsObjects/AnimationMotion";
import RandomMove from "../AnimationsObjects/move/RandomMove";
import RandomMove3D from "../AnimationsObjects/move/RandomMove3D";
import { AnimationListProps, AnimationListState } from "../types/AnimationList";


// import AddAnimation from "./AddAnimation";



class AnimationList extends Component<
  AnimationListProps,
  AnimationListState
> {
  interval: any;

  constructor(props: AnimationListProps | Readonly<AnimationListProps>) {
    super(props);
   
    this.state = {
      AnimationData: [],
      timeElapsed: 0, 
      showLabel: true,
      showLabelEmpty:false,
      isFirstRenderComplete: false,
      showForm: false,
      showChangeAcceptQuestion: false,
      question: questions[Math.floor(Math.random() * questions.length)],
      loading: true,
      cardNumber:0,
      uniqueObject: {
        type: undefined,
        props: undefined,
        key: null
      },
      animationObject:[],
      position: [], 
      speed: [],
      move: '',
      distance: '',
      setNum: 0,
      img: '',
      nameObject: '',
      created: false,
      imageNumber: 0,
      indexBoard: this.props.indexBoard +1,
  

    };
    
  }



    
componentDidMount() {
  this.setState(() => ({
    AnimationData: [],
  }));

  this.interval = setTimeout(() => {
    this.setState(() => ({
      AnimationData: [],
    }));

    if (this.state.timeElapsed === 0) {
      this.drawAnimationListData();
      console.log("AAA",this.state.AnimationData)
      setTimeout(() => {
        this.showCardsWithoutChangingObjects();
        this.setState((prevState) => ({
          timeElapsed: prevState.timeElapsed + 1,
        }));
      }, 3000);
    } else {
      this.setState({
        AnimationData: [],
      });
    }
  }, 2000);
}

  showCardsWithoutChangingObjects(){
    clearInterval(this.interval);
    this.setState({
      showLabelEmpty: true,
      showChangeAcceptQuestion: true,
      AnimationData: [],
    });
  }


 
  handleUpdatePositions = async (
    position: number[],
    speed: number[],
    move: string,
    distance: string,
    img: string
  ) => {
    const animationData: {
      id: string
      user_id :string
      name: string
      image: string
      position: number[]
      movement: string[]
      speed: number[]
      distance: string[]
    }[] = [];
    const updatedAnimationObject = {
      id: String(generateUniqueID()),
      user_id: this.props.user._id,
      position: position,
      name: '',
      speed: speed,
      movement: [move],
      distance: [distance],
      image: img
    };
   

    animationData.push(updatedAnimationObject);
    const AnimationDataArrayUp = [...animationData];
        this.props.saveUpdateAnimation(AnimationDataArrayUp);
        await this.handleResponseAddAnimations(AnimationDataArrayUp);
        console.log("FUNKCJA POSITIONS UPDATE", AnimationDataArrayUp)
        
      // this.props.saveUpdateAnimation(updatedAnimationObject);
      
    
  }
   
  drawAnimationListData = async () => {
    const {AnimationData,  position, speed, move, distance, img } = this.state;
  if(AnimationData.length <1){
    const animationData: {
      id: string;
      userId: string;
      name: string;
      object: string;
      section: string;
      information: any;
      status: boolean;
    }[] = [];
  
    for (let i = 0; i < 9; i++) {
      const setNum = generateRandomAnimation(0, 3);
      let uniqueObject: JSX.Element | null = null;
      let nameObject = "";
  
      if (setNum === 0) {
        nameObject = "SphereMove";
        uniqueObject = (
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={1} />
            <pointLight position={[40, 40, 40]} />
            <SphereMove
              updatePositions={this.handleUpdatePositions}
              key={String(generateUniqueID())}
              position={position} img={img}
              speed={speed}
              move={move}
              distance={distance}
            />
          </Canvas>
        );
      } else if (setNum === 1) {
        nameObject = "RandomMove";
        uniqueObject = (
          <Card>
            <RandomMove
              updatePositions={this.handleUpdatePositions}
              position={position}
              speed={speed}
              move={move}
              distance={distance} img={img}            />
          </Card>
        );
      } else if (setNum === 2) {
        nameObject = "AnimationMotion";
        uniqueObject = (
          <Card>
            <AnimationMotion
              updatePositions={this.handleUpdatePositions}
              position={position}
              speed={speed}
              move={move}
              distance={distance} img={img}            />
          </Card>
        );
      } else {
        nameObject = "RandomMove3D";
        uniqueObject = (
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={1} />
            <pointLight position={[40, 40, 40]} />
            <RandomMove3D
              updatePositions={this.handleUpdatePositions}
              position={position}
              speed={speed}
              move={move}
              distance={distance} img={img}            />
          </Canvas>
        );
      }
  
      // this.handleUpdatePositions(position, speed, move, distance, img);
  
      const animationObject = {
        id: String(generateUniqueID()),
        userId: this.props.user._id,
        name: nameObjects[i],
        object: nameObject,
        section: String(i + 1),
        information: uniqueObject,
        status: false,
      };
  
      animationData.push(animationObject);
  
      const AnimationDataArray = [...animationData];

this.props.saveAnimation(AnimationDataArray);
await this.handleResponse(AnimationDataArray);
this.setState((state: any) => ({
  ...state,
  AnimationData: animationData,
  showCards: false,
  showLabel: false,
  loading: false,
  created: true,
}));
      
    console.log("Tablica z animacjami", animationData);
    }
  }else{
    this.setState(()=>({
    AnimationData: []
  }))
  }
  };


  async handleResponseAddAnimations(DataAnimation: IAddAnimation[]){
    try {
      
        const response = await addAddAnimation(DataAnimation);
        
        if (response.status === 200 || response.status === 201) {
          console.log('Dane formularza przesłane pomyślnie');
        } else {
          console.error('Nie udało się przesłać danych formularza');
        }
      
    } catch (error) {
      console.error('Błąd przesyłania danych formularza:', error);
    }
    
  }

  async handleResponse(DataAnimation: IAnimation[]){
  try {
    
      const response = await addAnimation(DataAnimation);
      
      if (response.status === 200 || response.status === 201) {
        console.log('Dane formularza przesłane pomyślnie');
      } else {
        console.error('Nie udało się przesłać danych formularza');
      }
    
  } catch (error) {
    console.error('Błąd przesyłania danych formularza:', error);
  }
  
}



  render() {
    const { showCards, showContainer, user} = this.props;
    const {showLabel, loading, showLabelEmpty, showChangeAcceptQuestion} = this.state;
    const cardsToShow = this.state.AnimationData;
    // console.log("CARDS",cardsToShow.slice(0, this.state.isFirstRenderComplete ? 1: undefined))
    return (
      <>
     <div style={{display: showContainer? "grid": "none"}}>
      <div style={{display: showLabelEmpty? "none": "grid"}}> 
 
      <AnimationListRowFirst style={{ display: showLabel ? "grid" : "none" }}>
     
      { showCards === true && this.state.showLabel === true && (
            <>
            
            <label>
            <div dangerouslySetInnerHTML={{ __html: this.state.question }}></div>
            </label>
            <label>Poniżej przedstawiony jest model obiektu kuli w karcie:</label>
            {this.state.question.includes("3D") ? (
                <CardBorder >
                  <GlobalStyle/>
                    <Canvas camera={{ position: [0, 0, 5] }}>
                      <ambientLight intensity={1} />
                      <pointLight position={[40, 40, 40]} />
                      <mesh >
                          <sphereGeometry attach="geometry" args={[1, 16, 16]} />
                          <meshStandardMaterial
                            attach="material"
                            color="gray"
                            transparent
                            roughness={0.1}
                            metalness={0.1}
                          />
                        </mesh>          
                  </Canvas>
                  </CardBorder>
                  ) : (
                   
                      <CardBorder >
                      <GlobalStyle/>

                            <BallShow/>


                            </CardBorder>
                  )}
              
              
              </>
          )

      }
      </AnimationListRowFirst>
      {loading ? (
        <p>Przygotuj się! </p>
      ) : (
      <AnimationListRow style={{ display: showLabel ? "none" : "grid" }}>
        
      {  cardsToShow.slice(0, this.state.isFirstRenderComplete ? 0 : undefined).map((item: IAnimation, index: number ) => {
            return (
            
              <AnimationListBox
                key={item.name} 
              >
                <CardContainer>
                  <Card>
                  {/* <AddAnimation saveAnimation={this.props.saveAnimation} /> */}
           
                 {this.setState({ cardNumber: index + 1})}
                 {item.information}


                
                    </Card>
  
                </CardContainer>
              </AnimationListBox>
            );
          })}
          </AnimationListRow>
            )}




          </div>
          </div>
          {showChangeAcceptQuestion &&  (

         <ChangeAcceptQuestions saveUpdate={() => { } } question={''} showCard={false} showContainer={true} indexBoard={this.state.indexBoard} saveUser={this.props.saveUser} saveUpdateAnimation={this.props.saveUpdateAnimation} user={user} numberOBalls={this.props.numberOBalls} />
        
          
       )}
          </>
    );
  }

}

export default AnimationList;
