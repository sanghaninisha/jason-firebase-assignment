import React, { useEffect, useState } from 'react'
import {db} from '../Firebase'
import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, query, updateDoc } from 'firebase/firestore'
import './UserForm.css'
const UserForm = () => {
    const [data,setData] = useState({
        name:"",
        age:""
    })
    const [allData,setAllData] = useState([])
    const [id,setId] = useState("")

    const handleChange = (e)=>{
        const {name,value} = e.target
        setData({
            ...data,
            [name]:value
        })
    }
    
    useEffect (()=>{
        let a = query(collection(db,"useinfo"))
        let info = onSnapshot(a,(i)=>{
            let arr = []
            i.forEach((j)=>{
                arr.push({...j.data(),id:j.id})
            })
            setAllData(arr);
        })
        return () => info()
    },[])
    
    const saveData = async(e)=>{
        e.preventDefault()
        let ins
        if(id!=''){
            ins = await updateDoc(doc(db,"useinfo",id),data);
        }
        else{
            ins = await addDoc(collection(db,"useinfo"),data)
        }
        if(ins){
            console.log("Inserted/Updated  Successfully...")
        }
        setData({
            name:"",
            age:""
        })
        setId('')
    };

    const delData = async(id)=>{
        let res = await deleteDoc(doc(db,"useinfo",id))
        if(res){
            console.log("Data Deleted")
        }
    }

    const editData = async (id)=>{
        try {
            let doc1 = await getDoc(doc(db,"useinfo",id))
            if(doc1.exists){
                console.log('Document data:', doc1.data());
                setData(doc1.data())
                setId(id)
            }else{
                console.log('No such decument!');
            }
        } catch (error){
            console.error('Error getting document:',error);
        }
    };
    return (
    <div>
        <h1 className='tital'>FireBase Crud</h1>
        <form action="#" method='post' name='frm' onSubmit={saveData}>
            <label htmlFor="" className='name'>Name:</label>
            <input type="text" name="name" id="name" value={data.name} onChange={handleChange}/><br /><br />
            <label htmlFor="" className='name'>Age:</label>
            <input type="number" name="age" id="age" value={data.age} onChange={handleChange} /><br /><br />
            <input type="submit" value="Save" className='submit' /><br /><br />
        </form>
        <table border={'2'} align='center'>
            <thead className='table'>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody className='user'>
                {
                    allData.map((i,index)=>{
                        return (
                            <tr>
                                <td>{i.id}</td>
                                <td>{i.name}</td>
                                <td>{i.age}</td>
                                <td>
                                    <button onClick={()=>editData(i.id)} className='edit'>Edit</button>
                                    <button onClick={()=>delData(i.id)} className='del'>Delete</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    </div>
  )
}

export default UserForm
