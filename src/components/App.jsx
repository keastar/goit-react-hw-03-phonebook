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


//ВЫЗЫВАЕТСЯ ПРИ ПЕРВИЧНОМ ИЗМЕНЕНИИ СОСТОЯНИЯ, при первом рендере
  componentDidMount() {
    const contacts = localStorage.getItem('contacts');

    // из строк МЕТОД parse преобразует в объект контакт
    const parsedContacts = JSON.parse(contacts);
    // this.setState({ contacts: parsedContacts });

//УСЛОВИЕ СТАВИМ В ТОМ СЛУЧАЕ, КОГДА ДОБАВЛЯЕТСЯ 1-Й КОНТАКТ
    if (parsedContacts) {
    //меняем состояние контактов и записываем запарсенный первый объект в локалсторадж
      this.setState({ contacts: parsedContacts });
    }
  };


//ВЫЗЫВАЕТСЯ ПОСЛЕ КАЖДОГО ОБНОВЛЕНИЯ СОСТОЯНИЯ
  componentDidUpdate(prevProps, prevState) {

    if (this.state.contacts !== prevState.contacts) {
      console.log('Обновилось поле контактов');

// если добавляется контакт, то он в виде строки записывается в локалсторадж
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
}
    console.log('App componentDidUpdate');
    console.log(prevState);
    console.log(this.state);
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


