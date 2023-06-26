/**
 * Utworzenie komponentu z  macierzą wyświtlającą obiekty z animacjami
 */

import React, { Component } from "react";
import { AnimationListBox, AnimationListRow, AnimationListRowFirst, AnimationMotion, BallShow, Canvas, Card, CardBorder, CardContainer, ChangeAcceptQuestions, GlobalStyle, IAnimation, RandomImage, RandomImage3D, RandomMove, SphereMove, ballType, generateRandomAnimation, generateUniqueID, nameObjects, questions } from "../../library/library/allImports";
import { addAnimation } from "../../API/API";
// import AddAnimation from "./AddAnimation";
import RandomMove3D from "../AnimationsObjects/move/RandomMove3D";



class AnimationList extends Component<
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
      position: [], 
      speed: [],
      move: '',
      distance: '',
      SetImg: '',
      img:String(generateRandomAnimation(1,16)),
      created: false,
      imageNumber: 0,
      indexBoard: this.props.indexBoard +1,
  

    };
    this.components = [
      <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={1} />
      <pointLight position={[40, 40, 40]} />
      
      <RandomImage3D num={this.state.img} />
          <SphereMove updatePositions={this.handleUpdatePositions}/>
          </Canvas>,
       <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={1} />
      <pointLight position={[40, 40, 40]} />
      <RandomImage3D num={this.state.img} />
      <RandomMove3D updatePositions={this.handleUpdatePositions}/>
       </Canvas>,
     <Card>
        <AnimationMotion updatePositions={this.handleUpdatePositions} />
        {/* <RandomImage num={this.state.img}/> */}
        </Card>
       ,      
       <Card>
        <RandomMove updatePositions={this.handleUpdatePositions}/>
        <RandomImage num={this.state.img}/>
        </Card>
        
   

];
  }



    
  componentDidMount() {
    this.setState(() => ({
        
      AnimationData: [],
      
    }));
    this.interval = setTimeout(() => {
      this.setState(() => ({
        
        AnimationData: [],
        
      }));


     if(this.state.timeElapsed == 0){
      this.drawAnimationListData();
      
    
        setTimeout(() => {
          this.showCardsWithoutChangingObjects();
          this.setState(() => ({
            timeElapsed: this.state.timeElapsed + 1,
            AnimationData: [],
            
          }));
         // this.handleUpdatePositions(this.state.position, this.state.speed, this.state.move, this.state.distance)
     
            console.log(this.state.timeElapsed)
        }, 10000)
       } else{

        this.setState(() => ({
          AnimationData: [],
          
        }));

        
       }
     
  
  }, 10000);
        
  }

  showCardsWithoutChangingObjects(){
    clearInterval(this.interval);
    this.setState({
      showLabelEmpty: true,
      showChangeAcceptQuestion: true,
      AnimationData: [],
    });
  }

  handleUpdatePositions = ( position: number[],  speed: number[], move: string, distance: string) => {
      this.setState({
        position: position,
        speed: speed,
        move: move,
        distance: distance,

    });
    // this.drawAnimationListData()
    // console.log("LALAL", z,y,img,x)
  };
 

drawAnimationListData () {

   
 const { position,  speed, move, distance} = this.state;
 let { uniqueObject } = this.state;
//  
const animationData: {
  id: string;
  userId: string;
  name: string;
  object: string;
  position: number[]
  image: string;
  section: string;
  movement: string;
  speed: number[];
  distance: string;
  information: any;
  status: boolean;
}[] = [];

    for (let i = 0; i < 9; i++) {
      
    //imageNumber = generateRandomAnimation(0,16)
     uniqueObject=this.components[generateRandomAnimation(0,this.components.length-1)]     

    

// console.log(uniqueObject,"PO")      
       
          
          console.log("IMAGEwe",uniqueObject.props.children[3])
        this.handleUpdatePositions( uniqueObject.props.position, uniqueObject.props.speed, uniqueObject.props.move, uniqueObject.props.distance);
          console.log("UniqueNAme",uniqueObject)
      const animationObject = {
        id: String(generateUniqueID()),
        userId: this.props.user._id,
        name: nameObjects[i],
       object:  uniqueObject.type.name === "RandomMove" ||
        uniqueObject.type.name === "AnimationMotion"
          ? ballType[0]
          : ballType[1],
        position: position,
        image: this.state.img,
        section: String(i+1),
        movement: move,
        speed: speed,
        distance: distance,
        information: uniqueObject,
        status: false,
      };
  this.handleResponse(animationData[i]);
  console.log("NANA", animationData[i])
      animationData.push(animationObject);
  
    }

    const AnimationDataArray = [...animationData];
  
    this.setState((state: any) => ({
      ...state,
      AnimationData: AnimationDataArray,
      showCards: false,
      showLabel: false,
      loading: false,
      created: true,
    }));
    
  console.log("Tablica z animacjami", AnimationDataArray);


    

}





  async handleResponse(DataAnimation: IAnimation){
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
        
      {  cardsToShow.slice(0, this.state.isFirstRenderComplete ? 1 : undefined).map((item: IAnimation, index: number ) => {
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

         <ChangeAcceptQuestions saveUpdate={()=>{}}  question={''} showCard={false} showContainer={true} indexBoard={this.state.indexBoard} saveUser={this.props.saveUser} saveAnimation={this.props.saveAnimation} user={user} />
        
          
       )}
          </>
    );
  }

}

export default AnimationList;
