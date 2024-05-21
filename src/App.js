import './App.css';
import React from 'react';
import {Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/navbar/navbar';
import ContactList from './components/contacts/contactslist/contactsList';
import ViewContact from './components/contacts/viewcontact/viewcontact';
import EditContact from './components/contacts/editcontact/editcontact';
import AddContact from './components/contacts/addcontact/addcontact';
import Spinner from './components/spinner/spinner';

let App = ()=>{
  return (
    <React.Fragment>
      
    <NavBar/>
    <Routes>
      <Route path={'/'} element={<Navigate to={'/contacts/list'}/>}/>
      <Route path={'/contacts/list'} element={<ContactList/>}/>
      <Route path={'/contacts/add'} element={<AddContact/>}/>
      <Route path={'/contacts/view/:contactId'} element = {<ViewContact/>}/>
      <Route path={'/contacts/edit/:contactId'} element ={<EditContact/>}/>

    </Routes>
    
    </React.Fragment>
  );
}

export default App;
