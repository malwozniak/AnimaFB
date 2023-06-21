/**
 * Pobranie danych
 */
import * as React from 'react';
import { Component } from 'react';
import * as ReactDOM from 'react-dom/client';
import styled, { createGlobalStyle } from 'styled-components';
import { AnimationListContainer, AnimationListRowFirst } from './constants/style';
// import RouteSchema from './routes/RouteSchema';
import AppAPI from './AppAPI';


interface AppProps {}
interface AppState {
 showCards: boolean;
  answer: number;


}

// const animaTionArray = [9, 4, 2, 1];
class App extends Component<AppProps, AppState> {
  constructor(props: AppProps){
    super(props);
  this.state = {
    showCards: false,
    answer: 0,

  }
}
  render() {
  
   

    return (
    <>

    <GlobalStyle/>      
      <MainBody>
        <AnimationListContainer>
        
        <AnimationListRowFirst>
            {/* <RouteSchema /> */}
            <AppAPI/>

     </AnimationListRowFirst>
  
      </AnimationListContainer>
        </MainBody>
      </>
    );
  }
}
const GlobalStyle = createGlobalStyle`
  *,
  ::after,
  ::before {
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    padding: 0;
  }
`;

const MainBody = styled.div`
      min-height: 100vh;
      width: 100%;
      justify-content: center;
      display: flex;
`;
const rootElement = document.getElementById('root');
if (rootElement) {
const root = ReactDOM.createRoot(rootElement);
root.render(<App />)};
