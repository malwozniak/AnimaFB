import React, { useEffect, useState } from 'react'
import AddUser from '../components/AddUser/AddUser'
import { getUser, addUser, updateUser, getUserId, getAnimationId, getAnimation, saveUpdateAnimation } from './API'
import ChangeAcceptQuestions from '../components/QuestionsAndLastPage/ChangeAcceptQuestions'
import { IAnimation } from '../components/types/Animation'
// import AnimationList from './components/AnimationList'
// import { AnimationListRow } from './constants/style'
import { gsap } from 'gsap';
const AppAPI: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([])
  const [animations, setAnimations] = useState<IAnimation[]>([])


  useEffect(() => {
    fetchUsers()
    fetchUsersId()
    fetchAnimations()
    fetchAnimationId()
  }, [])

  const fetchUsers = (): void => {
    getUser()
    .then(({ data: { users } }: IUser[] | any) => setUsers(users))
    .catch((err: Error) => console.log(err, "Błąd!"))
  }
  
    const fetchUsersId= (): void => {
    users.forEach((user: IUser) => {
      getUserId(user._id)
    .then(({ data: { users } }: IUser[] | any) => setUsers(users))
    .catch((err: Error) => console.log(err, "Błąd! Użytkownik nie znaleziony."))})
  }

  const handleSaveUser = (formData: IUser): void => {
    addUser(formData)
      .then(({ status, data }) => {
        if (status !== 201) {
          throw new Error('Błąd! Użytkownik nie zapisany!');
        }
        setUsers(data.users);
        console.log(users, "Dane", formData);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateUser = (user: IUser) => {
    try {
      const response = updateUser(user);
      console.log('User updated successfully:', response);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const fetchAnimations = (): void => {
    getAnimation()
    .then(({ data: { animations } }: IAnimation[] | any) => setAnimations(animations))
    .catch((err: Error) => console.log(err, "Błąd!"))
  }
  
  const fetchAnimationId= (): void => {
    animations.forEach((animation: IAnimation) => {
      getAnimationId(String(animation.id))
    .then(({ data: {  animations } }: IAnimation[] | any) => setAnimations(animations))
    .catch((err: Error) => console.log(err, "Błąd! Animacja nie znaleziona."))})
  }


  const handleSaveAnimation = async (objects: HTMLElement[]): Promise<void> => {
    try {
      const animations = objects.map((object) =>
        gsap.to(object, { /* animation properties */ })
      );
  
      // Await all animations to complete
      await Promise.all(animations);
  
      console.log('Animations saved successfully!');
    } catch (error) {
      console.error('Error saving animations:', error);
    }
  };
  const handleUpdateAnimation = async (objects: IAnimation[]): Promise<void> => {
    try {
      if (!Array.isArray(objects)) {
        throw new Error('Objects is not an array');
      }
  
      const response = saveUpdateAnimation(objects);
      console.log('User updated successfully:', response);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };



  return (
    <>
      <AddUser saveUser={handleSaveUser}  saveAnimation={handleSaveAnimation} saveUpdateAnimation={handleUpdateAnimation} />
      {/* <AddAnimation saveAnimation={handleSaveAnimation } /> */}
      {users.map((user: IUser) => (
        <>
        <ChangeAcceptQuestions question={''} showCard={false} showContainer={false} saveUpdate={handleUpdateUser} user={user} indexBoard={0} saveUser={handleSaveUser} saveUpdateAnimation={handleUpdateAnimation} saveAnimation={handleSaveAnimation} />
       
       
     </>
      ))}
    </>
  )
}

export default AppAPI