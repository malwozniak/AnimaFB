import React from 'react'
import { Card, Form } from '../constants/style'

type Props = UserProps & {
    updateUser: (todo: IUser) => void
    deleteUser: (_id: string) => void
}

const User: React.FC<Props> = ({ user, updateUser, deleteUser }) => {
  
  return (
    <Card>
      <Form>
        <input type="text" placeholder="płeć"
                value={user.gender} />
                <input type="number" placeholder="wiek"
                value={user.age} />
             
        </Form>
      <div className='Card--button'>
        <button
          onClick={() => updateUser(user)}
          className={user.status ? `hide-button` : 'Card--button__done'}
        >
          Complete
        </button>
        <button
          onClick={() => deleteUser(user._id)}
          className='Card--button__delete'
        >
          Delete
        </button>
      </div>
    </Card>
  )
}

export default User