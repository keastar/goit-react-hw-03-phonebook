import React, { Component } from "react";
import shortid from "shortid";
import Filter from './Filter';
import Form from "./Form";
import ContactList from "./ContactList";
import contacts from './todos.json';
import Container from "./Container";

class App extends Component {
  state = {
    contacts: contacts,
    filter: '',
  };

  //откидываем элемент, id которого совпадает с заявленным в (contactId)
  deleteContact = (contactId) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId)
    }))
  };

  formSubmitHandler = ({ name, number }) => {
    const { contacts } = this.state;

    const found = contacts.find((contact) => contact.name.toLowerCase() === name.toLowerCase());
   
    if (found) {
      alert('Already exist contact');
    } else {
      const contact = {
        id: shortid.generate(),
        name,
        number,
      };
      this.setState(({ contacts }) => ({
        contacts: [contact, ...contacts],
      }));
    }
    };

  changeFilter = (evt) => {
    this.setState({ filter: evt.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
  };

  render() {
    const {filter} = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <>
        <Container>
          <Form onSubmit={this.formSubmitHandler} />  
          <Filter value={filter} onChange={this.changeFilter} />
          <ContactList contacts={visibleContacts} ondeleteContact={this.deleteContact} />
        </Container>
      </> 
    )
  };
};

export default App;


