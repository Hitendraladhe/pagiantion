import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './index.css'

const headings  = [
  {
    id: 1,
    heading: "id",
  },
  {
    id: 2,
    heading: "title",
  },
  {
    id: 3,
    heading: "description",
  },
  {
    id: 4,
    heading: "category",
  },
  {
    id: 5,
    heading: "sold",
  },
  {
    id: 6,
    heading: "price",
  },
  {
    id: 7,
    heading: "image",
  },
]

class TaskForm extends Component{
  constructor(){
    super();
    this.state={
      id: '',
      price: '',
      description:'',
      sold: '',
      category: '',
      image: '',
      title: '',
    }
  }
  
  onIdChange=(e)=>{
    this.setState({id: e.target.value});
  }

  onTitleChange=(e)=>{
    this.setState({title: e.target.value});
  }

  ondesChange=(e)=>{
    this.setState({description: e.target.value});
  }

  onCatChange=(e)=>{
    this.setState({category: e.target.value});
  }

  onPriceChange=(e)=>{
    this.setState({price: e.target.value});
  }

  onSoldChange=(e)=>{
    this.setState({sold: e.target.value});
  }

  onImgChange=(e)=>{
    this.setState({image: e.target.value});
  }

  

  onSubmit=async(event)=>{
    event.preventDefault()
    const {title, id, description, sold, image, category,price} = this.state
    const taskDetails = { id,title, price,description, category, image,sold}
    try{
      const response = await fetch("http://localhost:7000/empo",  {method: 'POST',
      body: JSON.stringify(taskDetails),
      headers: {
        'Content-Type': 'application/json'
    }})

    } catch (error) {
       console.log(error)      
    }  
  }  

  

  render(){
    const {title, id, description, sold, image, category,price} = this.state
    return(
        <>
         <div className='con'>
         <h5>Add Task</h5>
            <form onSubmit={this.onSubmit}>
            <button className='backBtn'><Link to="/">Back</Link></button>
            <div className='col'>
            <label htmlFor='id'>id</label>
            <input id='id' type='text' onChange={this.onIdChange} value={id}/>
            <label htmlFor='title'>title</label>
            <input id='title' type='text'  onChange={this.onTitleChange} value={title}/>
            <label htmlFor='category'>category</label>
            <input id='category' type='text'  onChange={this.onCatChange} value={category}/>
            <label htmlFor='description'>description</label>
            <input id='description'  onChange={this.ondesChange} type='text' value={description}/>
            </div>
            <div className='col' >
            <label htmlFor='price'>price</label>
            <input id='price'  onChange={this.onPriceChange} type='text' value={price}/>
            <label htmlFor='sold'>sold</label>
            <input id='sold'  onChange={this.onSoldChange} type='text' value={sold}/>
            <label htmlFor='image'>image</label>
            <input id='image'  onChange={this.onImgChange} type='text' value={image}/>
            <button type='submit' className='submit'>Submit</button>
            </div>
            </form>
         </div>
        </>
    )
  }
}

export default TaskForm