import React, { useEffect, useState } from 'react'

const UsersList = () => {

  const [users, setUsers] = useState([])

  const fetchUsers = async () => {
    const res = await fetch("https://e-commerce-y5p2.onrender.com/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className='main w-[70%] items-center mx-auto'>
      <div className='title'>
        <h1 className='flex p-4 text-4xl font-bold justify-center'>All Users</h1>

        <div className='flex p-4 justify-between'>
          <p>Name</p>
          <p>Email</p>
          <p>Password</p>
        </div>
      </div>

      <div className='bg-gray-200 font-bold'>
        {users.map((user, index) => {
          return (
            <div
              key={user._id || index}
              className='flex p-4 justify-between border-2 border-black overflow-auto'
            >
              <p className='uppercase'>{user.name}</p>
              <p className='px-2'>{user.email}</p>
              <p className='px-2'>{user.password}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default UsersList
