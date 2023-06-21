import React, { useEffect, useState } from 'react'
import AddUser from './components/AddUser'
import { getUser, addUser } from './API'

const AppAPI: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([])

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = (): void => {
    getUser()
    .then(({ data: { users } }: IUser[] | any) => setUsers(users))
    .catch((err: Error) => console.log(err, "Błąd"))
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

  return (
    <>
      <AddUser saveUser={handleSaveUser} />
     
    </>
  )
}

export default AppAPI