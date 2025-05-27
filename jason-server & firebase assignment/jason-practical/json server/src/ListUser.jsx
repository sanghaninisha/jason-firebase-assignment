import React, { useEffect, useState } from 'react'

const ListUser = () => {
    const [data,setData]=useState("")
  
    useEffect(() => {
      fetch('https://fakestoreapi.com/users')
            .then(res=>res.json())
            .then(json=>setData(json))
    }, []);
  
  return (
    <div>
        <h2>Users List</h2>
        <table border={2}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Company</th>
                </tr>
            </thead>
            <tbody>
              {
                data.map((i)=>{
                  return(
                    <tr>
                      <td>{i.id}</td>
                      <td>{i.username}</td>
                      <td>{i.email}</td>
                      <td>{i.address.city}</td>
                    </tr>
                  )
                })
              }
            </tbody>
        </table>
    </div>
)
}

export default ListUser
