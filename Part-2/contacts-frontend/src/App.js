import { useState } from 'react'
import Filter from './components/Filter'
import NewPersonForm from './components/NewPersonForm'
import Contacts from './components/Contacts'


const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    const addNewName = (event) => {
        event.preventDefault()
        for (let index = 0; index < persons.length; index++) {
            const person = persons[index];
            if (person.name === newName && person.number === newNumber) {
                alert(`Name ${newName} with number ${newNumber} already in list.`)
                return;
            }
        }
        const newNameObj = { name: newName, number: newNumber }
        setPersons(persons.concat(newNameObj))
        // event.target.input.value = "";
        // setNewName("")
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter updater={setFilter} />

            <h2>Add a new contact</h2>
            <NewPersonForm updater_name={setNewName} updater_number={setNewNumber} f_submit={addNewName} />

            <h2>Contacts</h2>
            <Contacts persons={persons} filter={filter} />
        </div>
    )
}

export default App