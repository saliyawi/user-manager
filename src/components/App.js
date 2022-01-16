import React,{useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import uniqid from 'uniqid';
import api from '../api/contacts';
import './App.css';
import Header from './Header';
import AddContact from './AddContact';
import EditContact from './EditContact';
import ContactList from './ContactList';
import ContactDetail from './ContactDetail';

function App() {

  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // RetrieveContacts
  const retrieveContacts = async () =>{
    const response = await api.get("/users");
    return response.data;
  }

  const addContactHandler = async (contact) =>{
    const request = {
      id: uniqid(),
      ...contact,
    }

    const response = await api.post("/users", request)
    setContacts([...contacts, response.data]);
  }

  const updateContactHandler = () =>{

  }

  const removeContactHandler = async (id) =>{

    await api.delete(`/users/${id}`);
    const newContactList = contacts.filter((contact)=>{
      return contact.id !== id;
    });

    setContacts(newContactList);
  }

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);

    if(searchTerm !== ''){
      const newContactList = contacts.filter((contact) => {
          return Object.values(contact.username)
            .join("")
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts);
    }
  }

  useEffect(()=>{
    // const retriveContact =  JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if(retriveContact) setContacts(retriveContact);
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if(allContacts) setContacts(allContacts);
    };

    getAllContacts();
  }, [])

  useEffect(()=>{
      //localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts])

  return (
    <div className="ui container">
      <Router>
        <Header/>
          <Routes>
            <Route 
              path="/" 
              element={<ContactList 
                        contacts={searchTerm.length < 1 ? contacts : searchResults} 
                        getContactId={removeContactHandler}
                        term={searchTerm}
                        searchKeyword={searchHandler}
                        />}
            />
            <Route
              path="/add" 
              element={<AddContact addContactHandler={addContactHandler}/>}
            />
            {/* <Route path="/edit/:id" element={<EditContact updateContactHandler={updateContactHandler}/>}/> */}
            <Route 
              path="/contact/:id" 
              element={<ContactDetail/>} 
            />
          </Routes>
        {/* <AddContact addContactHandler={addContactHandler}/>
        <ContactList contacts={contacts} getContactId={removeContactHandler}/> */}
      </Router>
    </div>
  );
}

export default App;
