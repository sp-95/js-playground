import React from 'react'

const Home: React.FunctionComponent = () => {
  return (
    <main className="btn-container">
      <button type="button" className="btn-success">
        Success
      </button>
      <button type="button" className="btn-danger">
        Danger
      </button>
      <button type="button" className="btn-warning">
        Warning
      </button>
      <button type="button" className="btn-info">
        Info
      </button>
    </main>
  )
}

export default Home
