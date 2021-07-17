import Layout from '@components/layout'
import { sendDangerNotification } from '@components/notifications/Notification'
import React from 'react'
import { v4 as uuid4 } from 'uuid'

function PuzzleButton({
  index,
  state,
  updateBoard,
}: {
  index: number
  state: number
  updateBoard: (arg0: number) => void
}): React.ReactElement {
  let status
  let value
  if (state > 0) {
    status = 'success'
    value = 'O'
  } else if (state < 0) {
    status = 'danger'
    value = 'X'
  } else {
    status = 'info'
    value = 'N'
  }

  return (
    <button
      type="button"
      className={`btn ${status} py-0 px-1 sm:py-1.5 sm:px-3 focus:ring-0 disabled:cursor-not-allowed`}
      onClick={() => updateBoard(index)}
      disabled={state < 0}
    >
      <p className={`${value === 'N' ? 'invisible' : 'visible'}`}>{value}</p>
    </button>
  )
}

export default function HomePage(): React.ReactElement {
  const [boardSize, setBoardSize] = React.useState(5)
  const [boardState, setBoardState] = React.useState<number[]>(
    new Array(boardSize * boardSize).fill(0)
  )
  const [moves, setMoves] = React.useState(0)
  const [highScores, setHighScores] = React.useState(
    Object.fromEntries([...Array(12).keys()].splice(3).map((i) => [i + 1, -1]))
  )

  const handleReset = (value: number = boardSize) => {
    setBoardSize(value)
    setBoardState(new Array(value * value).fill(0))
    setMoves(0)
  }

  React.useEffect(() => {
    handleReset()
  }, [])

  const handleUpdate = (index: number) => {
    let temp = new Array(boardState.length).fill(0)
    boardState[index] = boardState[index] === 0 ? 1 : 0
    boardState.forEach((n, i) => {
      if (n === 1) temp[i] = 1
    })

    temp.forEach((state, idx) => {
      if (state === 1) {
        const quotient = Math.trunc(idx / boardSize)
        const remainder = idx % boardSize
        const lDiagonal = quotient - remainder
        const rDiagonal = quotient + remainder

        temp = temp.map((n, i) =>
          Math.trunc(i / boardSize) === quotient ? -1 : n
        )
        temp = temp.map((n, i) => (i % boardSize === remainder ? -1 : n))
        temp = temp.map((n, i) =>
          Math.trunc(i / boardSize) - (i % boardSize) === lDiagonal ? -1 : n
        )
        temp = temp.map((n, i) =>
          Math.trunc(i / boardSize) + (i % boardSize) === rDiagonal ? -1 : n
        )
        temp[idx] = 1
      }
    })

    setBoardState(temp)
    setMoves(moves + 1)

    if (boardState.filter((n) => n === 1).length === boardSize) {
      const currentScore = highScores[boardSize]
      if (currentScore < 0 || moves + 1 < currentScore) {
        highScores[boardSize] = moves + 1
        setHighScores(highScores)
      }
    }
  }

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event
    const value = parseInt(target.value || '4', 10)

    if (value < 4 || value > 12)
      sendDangerNotification('Board Size limited from 4 to 12')
    else {
      handleReset(value)
    }
  }

  // grid-cols-4 grid-cols-5 grid-cols-6 grid-cols-7 grid-cols-8
  // grid-cols-9 grid-cols-10 grid-cols-11 grid-cols-12
  return (
    <Layout title="Checker board puzzle" description="Run checker board puzzle">
      <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between m-10">
        <div className="space-y-2 hidden sm:block">
          <h1>High Scores</h1>
          {Object.entries(highScores).map(
            ([k, v]) =>
              v > 0 && (
                <div key={uuid4()} className="flex justify-evenly">
                  <h2>
                    {k}x{k}
                  </h2>
                  <h2>{v}</h2>
                </div>
              )
          )}
        </div>

        <div className="flex flex-col items-center">
          <div className="max-w-sm space-y-2">
            <h1>Checker board puzzle</h1>
            <p className="text-justify">
              The goal of the puzzle is to place the checkers such that no
              checker is in the same row, column or diagonal
            </p>

            <div className="flex items-center justify-between sm:justify-center w-full">
              <input
                type="number"
                className="form-input w-16"
                value={boardSize}
                onChange={(e) => handleSizeChange(e)}
              />

              <p className="font-bold sm:hidden">Moves: {moves}</p>
            </div>
          </div>

          <div className="flex flex-col items-center pt-10 space-y-5">
            <div className={`grid grid-cols-${boardSize} gap-1`}>
              {boardState.map((currentState, index) => (
                <PuzzleButton
                  key={uuid4()}
                  index={index}
                  state={currentState}
                  updateBoard={handleUpdate}
                />
              ))}
            </div>

            <button
              type="button"
              className="btn danger"
              onClick={() => handleReset()}
            >
              Reset
            </button>

            <div
              className={`flex flex-col sm:flex-row text-success-700 text-center sm:space-x-2 ${
                boardState.filter((n) => n === 1).length === boardSize
                  ? 'visible'
                  : 'invisible'
              }`}
            >
              <h2>Congratulations!!!</h2>
              <h2>You Win!</h2>
            </div>
          </div>
        </div>

        <div className="text-center hidden sm:block">
          <h1>Moves</h1>
          <h1>{moves}</h1>
        </div>

        <div className="mt-4 space-y-2 sm:hidden">
          <h1>High Scores</h1>
          {Object.entries(highScores).map(
            ([k, v]) =>
              v > 0 && (
                <div key={uuid4()} className="flex justify-evenly">
                  <h2>
                    {k}x{k}
                  </h2>
                  <h2>{v}</h2>
                </div>
              )
          )}
        </div>
      </div>
    </Layout>
  )
}
