/**
 * Utworzenie komponentu z  macierzą wyświtlającą obiekty z animacjami
 */

import React from 'react';
import { Animation } from '../types/animation';
import { AnimationListBox
, AnimationListRow, AnimationListRowFirst, CardContainer, Card, BallShow, GlobalStyle, CardBorder } from '../constants/style';
import { Canvas } from '@react-three/fiber';
import arrayShuffle from 'array-shuffle';
import AnimationMotion from './animationsObjects/AnimationMotion';
import RandomMove from './animationsObjects/move/RandomMove';
import RandomMove3D from './animationsObjects/move/RandomMove3D';
import SphereMove from './animationsObjects/AnimationThreeD';
import { questions } from '../constants';
import ChangeAcceptQuestions from './ChangeAcceptQuestions';

// import {AnimationDBModel} from '../database/database';

type AnimationListProps = {
num: number;
showCards: boolean;
showContainer: boolean;

};

type AnimationListState = {
  AnimationData: Animation[];
  nextUrl: string;
  timeElapsed: number;
  showLabel:  boolean;
  showLabelEmpty: boolean;
  showChangeAcceptQuestion: boolean,
  question: string;
  loading: boolean;
  
};

class AnimationList extends React.Component<
  AnimationListProps,
  AnimationListState
> {
  interval: any;
  components: JSX.Element[];

  constructor(props: AnimationListProps | Readonly<AnimationListProps>) {
    super(props);

    this.components = [
          <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={1} />
          <pointLight position={[40, 40, 40]} />
          <SphereMove castShadow position={[0, 0, 0]} />
          </Canvas>,
          <RandomMove/>,
           <AnimationMotion/>,
           <Canvas camera={{ position: [0, 0, 5] }}>
           <ambientLight intensity={1} />
           <pointLight position={[40, 40, 40]} />
            <RandomMove3D />
            </Canvas>,
    ];
    
    this.state = {
      AnimationData: [],
      nextUrl:
        'https://raw.githubusercontent.com/malwozniak/react-ts-1dq1it/main/animation.json',
      timeElapsed: 0, 
      showLabel: true,
      showLabelEmpty:false,
      showChangeAcceptQuestion: false,
      question: questions[Math.floor(Math.random() * questions.length)],
      loading: true,

    };
  }

  getAnimationDataList() {
    return this.state.AnimationData;
  }

    
  componentDidMount() {
   

    this.interval = setInterval(() => {
      this.setState((prevState) => ({
        timeElapsed: prevState.timeElapsed + 1,
        AnimationData: []
      }));

      if (this.state.timeElapsed >= 1) {
      clearInterval(this.interval);
      this.setState({                     showLabelEmpty: true,
        showChangeAcceptQuestion: true }); // Update the state to show the ChangeAcceptQuestions component

}
    else{

      this.fetchAnimationListData();

     }

      
    }, 15000);
  
}
  
  fetchAnimationListData() {
   
    let newArr: any[] = [];

    fetch(this.state.nextUrl)
      .then((response) => response.json()
      )
      .then((data) => {
        this.setState((state) => ({
          ...state,
            nextUrl: data.next,
            AnimationData: newArr,
            timeElapsed: state.timeElapsed + 1,
            showLabel: true
        
        }))
        if (data.results) {

        // eslint-disable-next-line array-callback-return
        data.results.map((item: { url: RequestInfo | URL; }) => {
          fetch(item.url)
            .then((response) => {
              return response.json();
            })
            .then((data) => {
                newArr.push(data);
                const AnimationDataa= [...newArr];
                /** Mieszanie obiektów tablicy z obiektami animacji */
                if (AnimationDataa.length === 16) {
                
                  const AnimationData = arrayShuffle(AnimationDataa);
                  /** Usunięcie pozostałych elementów z tablicy */

                  AnimationData.splice(9, AnimationData.length);
                  console.log("AA",AnimationData)
                setTimeout(()=>{  this.setState((state) => ({
                  
                    ...state,
                    AnimationData: AnimationData,
                    showCards: false,
                    showLabel: false,
                    loading: false,
                  }));
                  console.log(AnimationData)

                  // AnimationDBModel.create(AnimationData);
                  }, 1000);
                
                }
              });
              
            });
          }
        });
        
  }

  render() {
    const { showCards, showContainer } = this.props;
    const {showLabel, loading, showLabelEmpty, showChangeAcceptQuestion} = this.state;
    const cardsToShow = showCards ? this.getAnimationDataList(): [];
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
        
         {cardsToShow.map((item) => {

            return (
              <AnimationListBox
                key={item.name}
              >
                <CardContainer>
                  <Card>
                    {/* <RandomImage className="card" num={item.order} /> */}
                    {this.components[Math.round(Math.random() * 3)]}
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
         question={''} showCard={false} showContainer={true} />
       
       )}
          </>
    );
  }



  isBottom(el: { getBoundingClientRect: () => { (): any; new(): any; bottom: number; }; }) {
    return el.getBoundingClientRect().bottom - 10 <= window.innerHeight;
  }
}

export default AnimationList;
