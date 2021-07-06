import type INotification from '@/@types/notification'
import { store } from '@/app/store'
import NotificationType from '@/constants/NotificationType'
import {
  addNotification,
  removeNotification,
} from '@/slices/notificationsSlice'
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from '@heroicons/react/outline'
import { XCircleIcon as SolidXCircleIcon } from '@heroicons/react/solid'
import React from 'react'
import { useDispatch } from 'react-redux'
import { v4 as uuid4 } from 'uuid'

const NotificationIcons = {
  [NotificationType.Success]: <CheckCircleIcon className="notification-icon" />,
  [NotificationType.Danger]: <XCircleIcon className="notification-icon" />,
  [NotificationType.Warning]: (
    <ExclamationCircleIcon className="notification-icon" />
  ),
  [NotificationType.Info]: (
    <InformationCircleIcon className="notification-icon" />
  ),
}

function Notification(props: INotification): React.ReactElement {
  const { id, type, message, autohide = true, delay = 3000 } = props
  const animationStyle = {
    '--notification-autohide-delay': `${delay}ms`,
  } as React.CSSProperties

  const [exit, setExit] = React.useState(false)

  const dispatch = useDispatch()

  const handleCloseNotification = () => {
    setExit(true)
    setTimeout(() => {
      dispatch(removeNotification(id))
    }, 500)
  }

  return (
    <div
      style={animationStyle}
      className={`notification border ${type.toLowerCase()} ${
        exit ? 'exit-right' : 'enter-right'
      }`}
    >
      <div className={`notification-message ${autohide && 'pr-5'}`}>
        {NotificationIcons[type]}
        <span>{message}</span>
      </div>

      {autohide ? (
        // <div
        //   className="notification-bar"
        //   onAnimationEnd={handleCloseNotification}
        // />
        <div
          className="notification-border"
          onAnimationEnd={handleCloseNotification}
        />
      ) : (
        <SolidXCircleIcon
          className="notification-close-btn"
          onClick={handleCloseNotification}
        />
      )}
    </div>
  )
}

export default Notification

export function sendSuccessNotification(message: string): void {
  store.dispatch(
    addNotification({
      id: uuid4(),
      type: NotificationType.Success,
      message,
    })
  )
}

export function sendDangerNotification(message: string): void {
  store.dispatch(
    addNotification({
      id: uuid4(),
      type: NotificationType.Danger,
      message,
    })
  )
}

export function sendWarningNotification(message: string): void {
  store.dispatch(
    addNotification({
      id: uuid4(),
      type: NotificationType.Warning,
      message,
    })
  )
}

export function sendInfoNotification(message: string): void {
  store.dispatch(
    addNotification({
      id: uuid4(),
      type: NotificationType.Info,
      message,
    })
  )
}
