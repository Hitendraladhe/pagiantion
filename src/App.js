import React  from 'react';
import Table from './components/Table'
import TaskForm from './components/TaskForm'
import EditForm from './components/EditForm'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css';

function App(){

  return(
    <div className="App">
      <BrowserRouter>
      <Routes>
          <Route path='/' element={<Table/>}/>
          <Route path="taskform" element={<TaskForm />} />
          <Route path="editform/:id" element={<EditForm />} />
      </Routes>
    </BrowserRouter>
    </div>
 )
}

export default App;
