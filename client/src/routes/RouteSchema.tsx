import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AnimationList from '../components/AnimationList';
import ChangeAcceptQuestions from '../components/ChangeAcceptQuestions';
import AddUser from '../components/AddUser';
import axios from 'axios';

const RouteSchema: React.FC = () => {
  const [users] = useState<IUser[]>([])
  const saveUser = async (userData: any) => {
    try {
      const response = await axios.post('/users', userData);
      console.log(response.data); 
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
    {
      users.map((user: IUser) => (

<BrowserRouter>
      <Routes>
           <Route path="/" element={<AddUser saveUser={saveUser} />} />
           <Route path="/animation-list" element={<AnimationList num={0} showCards={true} showContainer={true} user={user}/>} />
           <Route path="/question" element={<ChangeAcceptQuestions question={''} showCard={true} showContainer={true} sendAnswer={function (): void {
          throw new Error('Function not implemented.');
        } } user={user}/>} />
      </Routes>
      </BrowserRouter>
    ))}
    </>
  );
};

export default RouteSchema;



