import {
  sendDangerNotification,
  sendInfoNotification,
  sendSuccessNotification,
  sendWarningNotification,
} from '@components/notifications/Notification'
import React from 'react'

const Home: React.FunctionComponent = () => {
  return (
    <main className="btn-container">
      <button
        type="button"
        className="btn success"
        onClick={() => sendSuccessNotification('Mission Successful')}
      >
        Success
      </button>

      <button
        type="button"
        className="btn danger"
        onClick={() => sendDangerNotification('Mission Failed')}
      >
        Danger
      </button>

      <button
        type="button"
        className="btn warning"
        onClick={() => sendWarningNotification('WARNING!!!')}
      >
        Warning
      </button>

      <button
        type="button"
        className="btn info"
        onClick={() => sendInfoNotification('For your information')}
      >
        Info
      </button>
    </main>
  )
}

export default Home
