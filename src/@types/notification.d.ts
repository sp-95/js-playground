import NotificationType from '../constants/NotificationType'

interface INotification {
  id: string
  type: NotificationType
  message: string
}

export default INotification
