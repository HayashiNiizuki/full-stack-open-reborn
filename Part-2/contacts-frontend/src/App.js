import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import NewPersonForm from './components/NewPersonForm'
import Contacts from './components/Contacts'
import contactService from './services/contacts'
import Notification from './components/Notification'
import './App.css'

const App = () => {
  const [contacts, setContacts] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notion, setNotion] = useState(null)

  useEffect(() => {
    contactService
      .getAll()
      .then(initContact => { setContacts(initContact) })
  })

  const addNewName = (event) => {
    event.preventDefault()
    for (let index = 0; index < contacts.length; index++) {
      const person = contacts[index]
      if (person.name === newName) {
        if (person.number === newNumber) {
          alert(`Name ${newName} with number ${newNumber} already in list.`)
          return
        } else if (window.confirm(`${person.name} is exist in contacts, wanna update his/her number?`)) {
          contactService.update(person.id, { number: newNumber })
            .then(res => {
              let newC = contacts
              newC[index] = res
              setContacts(newC)
              event.target.reset()
              setNotion(`${person.name}'s number is updated to${newNumber}`)
              setTimeout(() => {
                setNotion(null)
              }, 5000)
              setNewName('')
              setNewNumber('')
            })
          return
        } else {
          return
        }
      }
    }

    const newNameObj = { name: newName, number: newNumber }
    contactService.create(newNameObj)
      .then(returnContact => {
        setContacts(contacts.concat(returnContact))
        event.target.reset()
        setNewName('')
        setNewNumber('')
      })
  }

  return (
    <div>
      <Notification message={notion} />
      <h2>Phonebook</h2>
      <Filter updater={setFilter} />

      <h2>Add a new contact</h2>
      <NewPersonForm updater_name={setNewName} updater_number={setNewNumber} f_submit={addNewName} />

      <h2>Contacts</h2>
      <Contacts persons={contacts} filter={filter} delFunc={contactService.deleteContact} />
    </div>
  )
}

export default App