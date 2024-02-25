import {Link, useParams} from 'react-router-dom'
import { useState, useEffect } from 'react'
import './index.css'

const EditForm=()=>{

  const [user, setUser] = useState([]);
  const {id} = useParams();

    const users ={
      id:'',
      title: '',
      price: '',
      description: '',
      category: '',
      image: '',
      sold: ''
    } //{ id,title, price,description, category, image,sold}
     
    const inputHandler=(e)=>{
      const {name, value} = e.target;
      setUser({...user, [name]:value});
      console.log(name, value);
    }

    useEffect(() => {
      const response =  fetch(`http://localhost:7000/empo/one/${id}`, {method: "GET","Content-Type": "application/json"});
      const jsonData =  response;
      setUser(jsonData);
      console.log(jsonData);
    },[id]);

   const submitForm = async(event)=>{
      event.preventDefault();
      console.log(id)
      const response = await fetch(`http://localhost:7000/empo/${id}`, { method: 'PATCH', body: JSON.stringify(user),headers: {'Content-Type': 'application/json'}
   })
    
  }

  return(
    <>
     <div className='con'>
      <h5>Edit Task</h5>
      {console.log(id)}
        <form onSubmit={submitForm}>
        <button className='backBtn'><Link to="/">Back</Link></button>
        <div className='col'>
        <label htmlFor='id'>id</label>
        <input id='id' type='text' onChange={inputHandler} value={user.id} name="id"/>
        <label htmlFor='title'>title</label>
        <input id='title' type='text'  onChange={inputHandler} value={user.title} name="title" />
        <label htmlFor='category'>category</label>
        <input id='category' type='text'  onChange={inputHandler} value={user.category} name="category" />
        <label htmlFor='description'>description</label>
        <input id='description'  onChange={inputHandler} type='text' value={user.description} name="description"/>
        </div>
        <div className='col' >
        <label htmlFor='price'>price</label>
        <input id='price'  onChange={inputHandler} type='text' value={user.price} name="price"/>
        <label htmlFor='sold'>sold</label>
        <input id='sold'  onChange={inputHandler} type='text' value={user.sold} name="sold"/>
        <label htmlFor='image'>image</label>
        <input id='image'  onChange={inputHandler} type='text' value={user.image} name="image"/>
        <button type='submit' className='submit'>Submit</button>
        </div>
        </form>
        </div>
        </>
     )
}

export default EditForm