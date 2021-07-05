import NotificationType from '../constants/NotificationType'

interface INotification {
  id: string
  type: NotificationType
  message: string
  autohide?: boolean
  delay?: number
}

export default INotification
