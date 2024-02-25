import React ,{Component} from 'react';

import './index.css';
import { Link } from 'react-router-dom';

const options=[
  {
    id:1,
    names: "jan"
  },
  {
    id:2,
    names: "feb"
  },
  {
    id:3,
    names: "march"
  },
  {
    id:4,
    names: "April"
  },
  {
    id:5,
    names: "May"
  },
  {
    id:6,
    names: "june"
  },
  {
    id:7,
    names: "Jully"
  },
  {
    id:8,
    names: "Aug"
  },
  {
    id:9,
    names: "Sept"
  },
  {
    id:10,
    names: "Oct"
  },
  {
    id:11,
    names: "Nov"
  },
  {
    id:12,
    names: "Dec"
  }
]


class Table extends Component{ 
  constructor(){
    super();
    this.state={
      data: [],
      currentPage: 1,
      itemPerPage:5,
      inputChan: '',
    }
  }
  
  componentDidMount=()=>{  
    this.getAll();
  }
  
  getAll=()=>{
      fetch("http://localhost:7000/empo")
        .then(res => res.json())
        .then((rows) => {
          this.setState({ data: rows })
        })
  }
  

  getData= async() => {
    const {data} = this.state
    const response= await fetch("http://localhost:7000/empo", {method: "GET", "Content-Type": "application/json"})
      const ja = response.result
      console.log(ja)
      this.setState({data:response.json()});
    
  }

  onClickNxt=()=>{
    this.setState(prevState=>({currentPage: prevState.currentPage + 1}))
  }

  onClickPrev=()=>{
    this.setState(prevState=>({currentPage: prevState.currentPage - 1}))
  }

  onInput=(e)=>{
    const {data, inputChan} = this.state
    this.setState({inputChan: e.target.value})
    const updated = data.forEach(e=> e.filter(each=>(each === inputChan)));
    console.log(updated);
  }
  onDelete=(id)=>{
    const {data} = this.state
    this.setState({data: data.filter(each=>(each._id !== id))});
    console.log(id);
  }

  onSelect=(event)=>{
    console.log(event.target.value);
  }

  render(){
    const {data,currentPage,itemPerPage,inputChan} = this.state
    const lastIndex = currentPage * itemPerPage
    const firstIndex = lastIndex - itemPerPage
    const rows = data.slice(firstIndex, lastIndex)
    return (
      <div className="con">
        <h1>Transection Board</h1>
        <div>
          <input type="search" onChange={this.onInput} value={inputChan}/>
          <select onChange={this.onSelect}>
            {options.map(op=>(
              <option>{op.names}</option>
            ))}
          </select>
        </div>
        <button className='addBtn'><Link to="/taskform">Add Task</Link></button>
        <table className='table'>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Image</th>
            <th>Add||Delete</th>
          </tr>
          {rows.map(e=>(
            <tr>
            <td>{e.id}</td>
            <td>{e.title}</td>
            <td>{e.description}</td>
            <td>{e.price}</td>
            <td>{e.category}</td>
            <td>{e.sold}</td>
            <td><img src={e.image} className='img'/></td>
            <td>
              <button onClick={this.onEdit} className='edtBtn'><Link to={`/editform/`+ e._id}>Edit</Link></button>
              <button onClick={()=>this.onDelete(e._id)} className='dltBtn'>Delete</button>
            </td>
          </tr>
          ))}
        </table>
          
          <div className='BtnCon'>
            
            <button onClick={this.onClickPrev}>Prev</button>
            <button onClick={this.onClickNxt}>Next</button>
          </div>
      </div>
    );
  }

}
export default Table;
