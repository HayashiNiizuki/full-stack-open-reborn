import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector((state) => state.errorMessage)
  if (message === null) {
    return null
  }

  return <div className="error">{message}</div>
}

export default Notification
