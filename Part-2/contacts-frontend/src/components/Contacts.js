const PersonRow = ({name, number}) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{number}</td>
        </tr>
    )
}


const Contacts = ({persons, filter}) => {
    return (
        <table border="2">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Number</th>
                </tr>
            </thead>
            <tbody>
                {persons.filter(person => person.name.includes(filter)).map(person => PersonRow(person))}
            </tbody>
        </table>
    )
}

export default Contacts