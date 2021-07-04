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
  const { id, type, message } = props

  const [exit, setExit] = React.useState(false)
  const [width, setWidth] = React.useState(0)
  const [intervalID, setIntervalID] =
    React.useState<ReturnType<typeof setInterval>>()

  const dispatch = useDispatch()

  const handleStartTimer = () => {
    const newIntervalID = setInterval(() => {
      setWidth((prev) => {
        if (prev < 100) {
          return prev + 0.5
        }

        return prev
      })
    }, 20)

    setIntervalID(newIntervalID)
  }

  const handlePauseTimer = () => {
    if (intervalID) clearInterval(intervalID)
  }

  const handleCloseNotification = () => {
    handlePauseTimer()
    setExit(true)

    setTimeout(() => {
      dispatch(removeNotification(id))
    }, 400)
  }

  React.useEffect(() => {
    handleStartTimer()

    return handleCloseNotification
  }, [])

  React.useEffect(() => {
    if (width === 100) {
      handleCloseNotification()
    }
  }, [width])

  return (
    <div
      className={`notification ${type.toLowerCase()} ${exit && 'exit-right'}`}
      onMouseEnter={handlePauseTimer}
      onMouseLeave={handleStartTimer}
    >
      <div className="p-1 flex items-center space-x-1">
        {NotificationIcons[type]}
        <span className="">{message}</span>
      </div>
      <div style={{ width: `${width}%` }} className="notification-bar" />
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
