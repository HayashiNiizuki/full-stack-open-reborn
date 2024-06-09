const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className='notion'>
            {message}
        </div>
    )
}

export default Notification