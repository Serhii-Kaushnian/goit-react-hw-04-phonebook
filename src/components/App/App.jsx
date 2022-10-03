import React, { useState, useEffect } from 'react';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { AppWrapper, Wrapper } from './App.styled';

export default function App() {
  const LOCAL_STORAGE_KEY = 'contactList';

  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const isContactlreadyExist = ({ name }) => {
    const result = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    return !result;
  };

  const deleteContact = e => {
    const id = e.currentTarget.id;
    const newContacts = contacts.filter(contact => contact.id !== id);
    setContacts(newContacts);
  };
  const contactFormHadler = data => {
    if (isContactlreadyExist(data)) {
      setContacts(prev => [...prev, data]);
    } else {
      Notify.info(`Contact ${data.name} is already in Your Phonebook`);
    }
  };
  const handleFilter = e => {
    setFilter(e.currentTarget.value);
  };
  const getFilteredContacts = () => {
    const formatedNames = filter.toLowerCase().trim();

    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(formatedNames);
    });
  };

  const filteredContacts = getFilteredContacts();
  return (
    <AppWrapper>
      <Wrapper>
        <ContactForm
          title="Phonebook"
          onFormSubmit={contactFormHadler}
        ></ContactForm>
        <Filter filterChange={handleFilter} filterValue={filter}></Filter>
      </Wrapper>
      <ContactList
        title="Contacts"
        onContactDelete={deleteContact}
        contactsList={filteredContacts}
      ></ContactList>
    </AppWrapper>
  );
}
