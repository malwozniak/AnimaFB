import React, { useEffect, useState } from 'react'
import AddUser from './components/AddUser'
import { getUser, addUser, updateUser, getUserId } from './API'
import ChangeAcceptQuestions from './components/ChangeAcceptQuestions'

const AppAPI: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([])

  useEffect(() => {
    fetchUsers()
    fetchUsersId()
  }, [])

  const fetchUsers = (): void => {
    getUser()
    .then(({ data: { users } }: IUser[] | any) => setUsers(users))
    .catch((err: Error) => console.log(err, "Błąd"))
  }
  
  const fetchUsersId= (): void => {
    users.forEach((user: IUser) => {
      getUserId(user._id)
    .then(({ data: { users } }: IUser[] | any) => setUsers(users))
    .catch((err: Error) => console.log(err, "Błąd"))})
  }

  const handleSaveUser = (formData: IUser): void => {
    addUser(formData)
      .then(({ status, data }) => {
        if (status !== 201) {
          throw new Error('Error! User not saved');
        }
        setUsers(data.users);
        console.log(users, "For", formData);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateUser = (user: IUser): void => {
    updateUser(user)
    .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error('Error! User not updated')
        }
        setUsers(data.users)
      })
      .catch((err) => console.log(err))
  }


  return (
    <>
      <AddUser saveUser={handleSaveUser} />
      {users.map((user: IUser) => (
        <ChangeAcceptQuestions question={''} showCard={false} showContainer={false} sendAnswer={handleUpdateUser} user={user} />
      ))}
    </>
  )
}

export default AppAPI