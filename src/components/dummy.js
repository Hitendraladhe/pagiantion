import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Table from '../Table';
import './index.css';


const EditForm =()=>{

  const [user, setUser] = useState([]);
  const {id} = useParams()

    const users ={
      name:'',
      email: '',
      password: '',
    }

    const inputHandler=(e)=>{
      const {name, value} = e.target;
      setUser({...user, [name]:value});
      console.log(name, value);
    }

    useEffect(() => {
      const response =  fetch(`http://localhost:8000/api/getOne/${id}`, {method: "GET","Content-Type": "application/json"});
      const jsonData =  response;
      setUser(jsonData);
      console.log(jsonData);
    },[id]);

    const submiForm = async(event)=>{
      event.preventDefault();
      const response = await fetch(`http://localhost:8000/api/update/${id}`, {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
  }
  
  return(
    <div className='conForm' >
    <form onSubmit={submiForm} className='form'>
      <button type='button' className='backBtn'><Link to='/' className='Btn'>Back</Link></button>
      <h3>Update</h3>
      <label htmlFor='name' className='label' >Name</label>
      <input id="name" className='input' value={user.name}  onChange={inputHandler} name="name" autoComplete='off' />
      <label htmlFor='email' className='label'>Email</label>
      <input id="email" value={user.email} className='input'  onChange={inputHandler} name="email" autoComplete='off'/>
      <label htmlFor='password' className='label' >Password</label>
      <input id="password" value={user.password} className='input' onChange={inputHandler} name="password" autoComplete='off' />
      <button type='submit' className='submitBtn'>Submit</button>
    </form>
    </div>
  )   
}

export default EditForm