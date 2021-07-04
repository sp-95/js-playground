import { selectNotifications } from '@/slices/notificationsSlice'
import React from 'react'
import { useSelector } from 'react-redux'
import Notification from './Notification'

function NotificationContainer(): React.ReactElement {
  const notifications = useSelector(selectNotifications)

  return (
    <div className="notification-container">
      {notifications.map(({ id, type, message }) => {
        return <Notification key={id} id={id} type={type} message={message} />
      })}
    </div>
  )
}

export default NotificationContainer
