import { useSelector } from 'react-redux'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const notification = useSelector((state) => {
    return state.notification
  })
  if (notification.showing) return <div style={style}>{notification.message}</div>
  else return <div></div>
}

export default Notification
