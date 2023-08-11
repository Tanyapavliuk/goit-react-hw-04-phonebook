import { useState, useEffect } from 'react';

import { Wrapper, Title, Button } from './App.styled';
import ListContact from './ListContact/ListContact';
import Filter from './Filter/Filter';
import ListItem from './ListContact/ListItem';
import DeliteBtn from './DeliteBtn/DeliteBtn';
import Modal from './Modal/Modal';
import ContactForm from './ContactForm/ContactForm';

//---функція ініціації масиву для сонтактів з локального сховища
const initContact = () => {
  if (localStorage.getItem('contactsArray')) {
    return JSON.parse(localStorage.getItem('contactsArray'));
  }
  return [];
};

export function App() {
  const [contacts, setContacts] = useState(initContact);
  const [filter, setFilter] = useState('');
  const [showModal, setShowModal] = useState(false);

  //----- useEffect викликається при зміні масиву контактів
  useEffect(() => {
    localStorage.setItem('contactsArray', JSON.stringify(contacts));
  }, [contacts]);

  const toggleModal = () => setShowModal(modal => !modal); //переключення модалки
  const deliteAllContacts = () => setContacts([]); //видалення всіх контактів

  //--------функція додавання контакту
  const handlerAddContact = newContact => {
    // з ContactForm приймаємо данні про новий контакт
    if (contacts !== []) {
      if (
        contacts.some(el =>
          el.name.toLowerCase().includes(newContact.name.toLowerCase())
        )
      ) {
        // якщо масив має така ім'я виводимо повідомлення
        alert(`${newContact.name} is alredy in contacs`);
        return;
      }
    }
    //-----змінюємо масив контактів [...розпилюємо попередне значенняб додаємо новий контакт]
    setContacts(cont => [...cont, newContact]);

    toggleModal(); //закриття модалки після додавання контакту
  };

  //------ приймаємо значення фільтру і змінюємо стейт
  const handleInputChange = e => setFilter(e.target.value);

  // фільтрація
  const handleDeleteContact = contactId => {
    setContacts(contacts =>
      contacts.filter(contact => contact.id !== contactId)
    );
  };

  return (
    <Wrapper>
      <Title>Phonebook</Title>
      <Button type="button" onClick={toggleModal}>
        Add contact
      </Button>
      <Title>Contact</Title>
      <Filter value={filter} handleInputChange={handleInputChange} />
      <ListContact>
        <ListItem
          data={contacts}
          filter={filter}
          handleDeleteContact={handleDeleteContact}
        />
      </ListContact>
      <DeliteBtn
        delite={deliteAllContacts}
        aria-label="button for delite a contact"
      />
      {showModal && (
        <Modal onClose={toggleModal}>
          <ContactForm onSubmit={handlerAddContact} onClose={toggleModal} />
        </Modal>
      )}
    </Wrapper>
  );
}
