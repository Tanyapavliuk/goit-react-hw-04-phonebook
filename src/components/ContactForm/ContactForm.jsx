import { Component } from "react";
import FillAlert from "./FillAlert";
import { ButtonClose } from "./FillAlert.styled";
import PropTypes from 'prop-types'; 

import { Input, Label, Button, Form, Title} from '../App.styled'
import { nanoid } from "nanoid";
import {ReactComponent as CloseIcon} from '../../icons/close.svg'

class ContactForm extends Component{
    state = {
      name: '',
      number: '',
      disabled: true,
  }
 
    handleInputChange = (e) => {
      const name = e.target.name; // динамічне визначення назви поля
      this.setState({ [name]: e.currentTarget.value })// інтуп залежить від state.name, при введенні прослуховуємо подію + записуємо нове значення в state 
    }
    handlerClickAdd = (event) => {
      event.preventDefault()// Відмінити перезавантаження сторінки
      
      if (!this.state.name || !this.state.number) {
        this.setState({ name: '', })
        return;
      }
        
    const newContact = { //створення нового контакту
    name: this.state.name,
    number: this.state.number,
    id: nanoid() // рандомний id
      };


    this.props.onSubmit(newContact);//передача данних до Арр, через передану в прапсах функцію, яка приймає дані
        
    this.setState((prevState) => ({ // від поточного стану 
      name: '', //очищення поля
      number: '',//очищення поля
      disabled: true,
    })); 
  }

    render() {
      return (
        <>
        <Title style={{paddingLeft:'50px', marginBottom:'0'}}>Add a new contact</Title>
        <Form >
          <Label>Name
            <Input
            value={this.state.name}//прив'язна імпуту до зачення в стейті 
            type="text"
              name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            onChange={this.handleInputChange}
            required />
          </Label>
          <Label>Number
            <Input
            type="tel"
            onChange={this.handleInputChange}
              value={this.state.number}
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            />
          </Label>
          {!this.state.name||!this.state.number?<FillAlert/>:null}
          <Button type='submit' onClick={this.handlerClickAdd} disabled={!this.state.name || !this.state.number} aria-label="Add a contact">Add</Button>
          <ButtonClose aria-label="icon close" onClick={this.props.onClose}><CloseIcon width='10px' height='10px'/></ButtonClose>
          </Form>
          </>)
    }
}

export default ContactForm;

ContactForm.propTypes = {
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
}