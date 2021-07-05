import NotificationType from '../constants/NotificationType'

interface INotification {
  id: string
  type: NotificationType
  message: string
  delay?: number
}

export default INotification
