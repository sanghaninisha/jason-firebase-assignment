import React, {useEffect, useState}  from 'react'
import axios from 'axios'

const Crud = () => {
    const [data,setData] = useState({
        name:"",
        age:""
    })

    const [allData, setAllData] = useState([])
    const [id,setId] = useState('')
    const handlChange = (e)=>{
        const {name,value}= e.target
        console.log(value);
        setData({
            ...data,
            [name]:value
        })
    }

    const saveData = (e)=>{
        e.preventDefault()
        if(id != ''){
            axios.put("http://localhost:3000/users/"+id,data)
            .then(()=>console.log("Updated Successfully..."))
        }else{
            axios.post("http://localhost:3000/users/",data)
            .then(()=>console.log("Updated successfully..."))
        }
        setData({
            name:'',
            age:''
        })
        setId('')
    }

    const disp=()=>{
        axios.get("http://localhost:3000/users")
        .then((res)=>setAllData(res.data))
    }
    useEffect(()=>{
        disp()
    })

    const delData = (id)=>{
        axios.delete("http://localhost:3000/users/"+id)
        .then(()=>console.log("Deleted Successfully..."))
        disp()
    }

    const editData = (id)=>{
        axios.patch("http://localhost:3000/users/"+id)
        .then((res)=>setData(res.data))
        setId(id)
    }
  return (
    <div>
      <h1 className='head'>LocalStorage Crud Example...</h1>
        <form action="#" name='frm' method='post' onSubmit={saveData}>
            <label htmlFor="" className='ftital'>Name: </label>
            <input type="text" name="name" id="name" value={data.name} onChange={handlChange} /><br /><br />
            <label htmlFor="" className='ftital'>Age: </label>
            <input type="number" name="age" id="age" value={data.age} onChange={handlChange} /><br /><br />
            <input type="submit" name="save" id="save" value="Save" className='button' /><br /><br />
        </form>
        <table border={'2'} align='center'>
            <thead>
                <tr className='heading'>
                    <td>Id</td>
                    <td>Name</td>
                    <td>Age</td>
                    <td>Action</td>
                </tr>
            </thead>
            
            <tbody>
                {
                    allData.map((i,index)=>{
                        return(
                            <tr className='ftital' key={index+1}>
                                <td>{i.id}</td>
                                <td>{i.name}</td>
                                <td>{i.age}</td>
                                <td>
                                    <button onClick={()=>delData(i.id)} className='button1'>Delete</button>
                                    <button onClick={()=>editData(i.id)} className='button2'>Edit</button>
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

export default Crud
