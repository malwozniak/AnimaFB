import React, { useEffect, useState } from 'react'
import AddUser from './components/AddUser'
import { getUser, addUser, updateUser, getUserId, getAnimationId, getAnimation, addAnimation } from './API'
import ChangeAcceptQuestions from './components/ChangeAcceptQuestions'
import AddAnimation from './components/AddAnimation'
import { IAnimation } from './types/animation'

const AppAPI: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([])
  const [allAnimations, setAnimations] = useState<IAnimation[]>([])


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

  const handleUpdateUser = (user: IUser): void => {
    updateUser(user)
    .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error('Błąd! Użytkownik nie zaktualizowany!')
        }
        setUsers(data.users)
      })
      .catch((err) => console.log(err))
  }


  const fetchAnimations = (): void => {
    getAnimation()
    .then(({ data: { allAnimations } }: IAnimation[] | any) => setAnimations(allAnimations))
    .catch((err: Error) => console.log(err, "Błąd!"))
  }
  
  const fetchAnimationId= (): void => {
    allAnimations.forEach((animation: IAnimation) => {
      getAnimationId(String(animation.id))
    .then(({ data: {  allAnimations } }: IAnimation[] | any) => setAnimations(allAnimations))
    .catch((err: Error) => console.log(err, "Błąd! Animacja nie znaleziona."))})
  }

  const handleSaveAnimation = (formDataAnimation: IAnimation): void => {
    addAnimation(formDataAnimation)
      .then(({ status, data }) => {
        if (status !== 201) {
          throw new Error('Błąd! Animacja nie zapisana!');
        }
        setAnimations(data.allAnimations);
        console.log(allAnimations, "Dane", formDataAnimation);
      })
      .catch((err) => console.log(err));
  };

  // const handleUpdateAnimation = (animation: IAnimation): void => {
  //   updateAnimation(animation)
  //   .then(({ status, data }) => {
  //       if (status !== 200) {
  //         throw new Error('Błąd! Animacja nie zaktualizowana!')
  //       }
  //       setAnimations(data.allAnimations)
  //     })
  //     .catch((err) => console.log(err))
  // }



  return (
    <>
      <AddUser saveUser={handleSaveUser} />
      {users.map((user: IUser) => (
        <>
        <ChangeAcceptQuestions question={''} showCard={false} showContainer={false} sendAnswer={handleUpdateUser} user={user} indexBoard={0} />
       
        <AddAnimation saveAnimation={handleSaveAnimation} user={user} />
        </>
      ))}
    </>
  )
}

export default AppAPI