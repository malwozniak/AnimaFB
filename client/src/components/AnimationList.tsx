/**
 * Utworzenie komponentu z  macierzą wyświtlającą obiekty z animacjami
 */

import React from 'react';
import { AnimationListBox
, AnimationListRow, AnimationListRowFirst, CardContainer, Card, BallShow, GlobalStyle, CardBorder } from '../constants/style';
import { Canvas } from '@react-three/fiber';
import {  nameObjects, ballType, questions } from '../constants';
import ChangeAcceptQuestions from './ChangeAcceptQuestions';
import { IAnimation } from '../types/animation';
import { generateRandomAnimation, generateUniqueID } from '../utils/functions';
// import RandomMove from './animationsObjects/move/RandomMove';
import AnimationMotion from './animationsObjects/AnimationMotion';
// import SphereMove from './animationsObjects/AnimationThreeD';
// import RandomMove3D from './animationsObjects/move/RandomMove3D';



type AnimationListProps = {
indexBoard: number;
showCards: boolean;
showContainer: boolean;
user: IUser;
};

type AnimationListState = {
  AnimationData: IAnimation[];
  timeElapsed: number;
  showLabel:  boolean;
  showLabelEmpty: boolean;
  showChangeAcceptQuestion: boolean,
  question: string;
  loading: boolean;
  cardNumber: number;
  uniqueObject: JSX.Element;
  x: number;
  y: number;
  z: number;
  speed: string;
  move: string;
  distance: string;
  SetImg: string;
  img: string,
  created: boolean;
  indexBoard: number;
};

class AnimationList extends React.Component<
  AnimationListProps,
  AnimationListState
> {
  interval: any;
  components: JSX.Element[];

  constructor(props: AnimationListProps | Readonly<AnimationListProps>) {
    super(props);
   
    this.state = {
      AnimationData: [],
      timeElapsed: 0, 
      showLabel: true,
      showLabelEmpty:false,
      showChangeAcceptQuestion: false,
      question: questions[Math.floor(Math.random() * questions.length)],
      loading: true,
      cardNumber:0,
      uniqueObject: {
        type: undefined,
        props: undefined,
        key: null
      },
      x: 0,
      y: 0,
      z: 0,
      speed: '',
      move: '',
      distance: '',
      SetImg: '',
      img: '',
      created: false,
      indexBoard: this.props.indexBoard +1,
  

    };
    this.components = [
      // <Canvas camera={{ position: [0, 0, 5] }}>
      // <ambientLight intensity={1} />
      // <pointLight position={[40, 40, 40]} />
      //     <SphereMove/>
      //     </Canvas>,
      
      <AnimationMotion updatePositions={this.handleUpdatePositions}/>,
      // <Canvas camera={{ position: [0, 0, 5] }}>
      // <ambientLight intensity={1} />
      // <pointLight position={[40, 40, 40]} />
      //  <RandomMove3D />aa
      //  </Canvas>,

];
  }

  getAnimationDataList() {
    if(this.state.created === true){
    return this.state.AnimationData;
    }
  }

    
  componentDidMount() {
  
    this.interval = setInterval(() => {
      this.setState((prevState) => ({
        timeElapsed: prevState.timeElapsed + 1,
        AnimationData: [],
        
      }));
  
      console.log("Time laps:", this.state.timeElapsed);
      if (this.state.timeElapsed > 1) {
        clearInterval(this.interval);
        this.setState({
          showLabelEmpty: true,
          showChangeAcceptQuestion: true,
        });
      } else {
        
          this.drawAnimationListData();
        
      
        }
      }, 6000);
    }
  componentWillUnmount() {
    clearInterval(this.interval);
  }



  handleUpdatePositions = (x: any, y: any, z: any, img: any, s: any, m: any, d: any) => {
      this.setState({
        x,
        y,
        z,
        img: img,
        speed: s,
        move: m,
        distance: d,

    });
    // console.log("LALAL", z,y,img,x)
  };



drawAnimationListData() {

 
 const {AnimationData, x, y, z, img, speed, move, distance} = this.state;
 let { uniqueObject } = this.state;
//  const randomIndex = generateRandomAnimation(0, this.components.length - 1);
//  const selectedComponent = this.components[randomIndex];
//   uniqueObject = React.cloneElement(selectedComponent, {
//    updatePositions: this.updatePositions,
//  });



  if (AnimationData.length <= 9) {


    // console.log("ANIMATION",AnimationData.length)


    const animationData: {
      id: number;
      userId: string;
      name: string;
      model: string;
      object: string;
      positionX: number[];
      positionY: number[];
      positionZ: number[];
      image: string;
      section: string;
      movement: string;
      speed: string;
      information: any;
      status: boolean;
    }[] = [];


    for (let i = 0; i < 9; i++) {
     uniqueObject=this.components[generateRandomAnimation(0,this.components.length-1)]     

     this.handleUpdatePositions(x, y, z, img, speed, move, distance);

// console.log(uniqueObject,"PO")      
       
       const balltype =
        uniqueObject.type.name === "RandomMove" ||
        uniqueObject.type.name === "AnimationMotion"
          ? ballType[0]
          : ballType[1];

      
          // console.log("IMAGEwe",this.state.SetImage)

          // console.log("PositionX",this.state.SetPositionX)
      const animationObject = {
        id: Number(generateUniqueID()),
        userId: this.props.user._id,
        name: nameObjects[i],
        model: "kula",
        object: balltype,
        positionX: [x],
        positionY: [y],
        positionZ: [z],
        image: img,
        section: String(i+1),
        movement: move,
        speed: speed,
        information: uniqueObject,
        status: false,
      };

      animationData.push(animationObject);
    }


    const AnimationDataArray = [...animationData];
    console.log("Tablica z animacjami", AnimationDataArray);

    this.setState((state) => ({
      ...state,
      AnimationData: AnimationDataArray,
      showCards: false,
      showLabel: false,
      uniqueObject: uniqueObject,
      loading: false,
      created: true,
    }));
    
  }
}


  render() {
    const { showCards, showContainer, user} = this.props;
    const {showLabel, loading, showLabelEmpty, showChangeAcceptQuestion} = this.state;
    const cardsToShow = this.state.AnimationData;


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
        
         {cardsToShow != undefined && cardsToShow.map((item: IAnimation, index: number ) => {
            return (
            
              <AnimationListBox
                key={item.name}
              >
                <CardContainer>
                  <Card>

           
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

         <ChangeAcceptQuestions 
            question={''} showCard={false} showContainer={true} sendAnswer={function (): void {
              throw new Error('Function not implemented.');
            } } user={user} indexBoard={this.state.indexBoard}/>
        
          
       )}
          </>
    );
  }



  isBottom(el: { getBoundingClientRect: () => { (): any; new(): any; bottom: number; }; }) {
    return el.getBoundingClientRect().bottom - 10 <= window.innerHeight;
  }
}

export default AnimationList;
