const Filter = ({ updater }) => {
    return (
        <div>
            Filter shown with <input onChange={event => { updater(event.target.value) }} />
        </div>
    )
}

export default Filter