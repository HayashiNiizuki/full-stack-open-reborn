const PersonRow = ({ name, number, id, delFunc }) => {
  return (
    <tr key={id}>
      <td>{name}</td>
      <td>{number}</td>
      <td><button onClick={() => {
        if (window.confirm(`Are you sure to delete contact of ${name}`)) { delFunc(id) }
      }}>-</button></td>
    </tr>
  )
}


const Contacts = ({ persons, filter, delFunc }) => {
  return (
    <table border="1" padding="10px">
      <thead>
        <tr>
          <th>Name</th>
          <th>Number</th>
        </tr>
      </thead>
      <tbody>
        {persons.filter(person => person.name.includes(filter)).map(person => PersonRow({ ...person, delFunc: delFunc }))}
      </tbody>
    </table>
  )
}

export default Contacts