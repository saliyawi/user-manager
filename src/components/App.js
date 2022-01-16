import React,{useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import uniqid from 'uniqid';
import './App.css';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';
import ContactDetail from './ContactDetail';

function App() {

  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);

  const addContactHandler = (contact) =>{
    setContacts([...contacts, { id: uniqid(), ...contact}]);
  }

  const removeContactHandler = (id) =>{
    const newContactList = contacts.filter((contact)=>{
      return contact.id !== id;
    });

    setContacts(newContactList);
  }

  useEffect(()=>{
    const retriveContact =  JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if(retriveContact) setContacts(retriveContact);
  }, [])

  useEffect(()=>{
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts])

  return (
    <div className="ui container">
      <Router>
        <Header/>
          <Routes>
            <Route path="/" element={<ContactList contacts={contacts} getContactId={removeContactHandler}/>}/>
            <Route path="/add" element={<AddContact addContactHandler={addContactHandler}/>}/>
            <Route path="/contact/:id" element={<ContactDetail/>} />
          </Routes>
        {/* <AddContact addContactHandler={addContactHandler}/>
        <ContactList contacts={contacts} getContactId={removeContactHandler}/> */}
      </Router>
    </div>
  );
}

export default App;
