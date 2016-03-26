import './Messages.scss'

export default ({hit, sunk, youWin, youLose}) => {
  let messages = []
  if (hit) {
    messages.push('Hit!')
  }
  if (sunk) {
    messages.push('You sunk my battleship!')
  }
  if (youWin) {
    messages.push('You win!!!!')
  }
  if (youLose) {
    messages.push('Loser! Trump doesn\'t like you')
  }
  return (
    <messages>
      {messages.map((message) => <div key={message}>{message}</div>)}
    </messages>
  )
}