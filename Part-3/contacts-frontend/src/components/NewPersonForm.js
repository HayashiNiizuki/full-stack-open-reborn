const NewPersonForm = ({ updater_name, updater_number, f_submit }) => {
  return (
    <form onSubmit={f_submit}>
      <div style={{ width: '120px' }}>
        name:<input onChange={event => { updater_name(event.target.value) }} />
      </div>
      <div style={{ width: '120px' }}>
        number:<input onChange={event => { updater_number(event.target.value) }} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default NewPersonForm