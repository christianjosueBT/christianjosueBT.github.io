import wordBank from '../word-bank.json'

const words = new Map(
  wordBank.valid.concat(wordBank.invalid).map(word => [word, word])
)

enum LetterState {
  Empty = 1,
  Miss,
  Present,
  Match,
}

function getRandomWord() {
  return wordBank.valid[Math.floor(Math.random() * wordBank.valid.length)]
}

const computeStateArray = (guess: string, answer: string): LetterState[] => {
  if (guess.length !== 5 || answer.length !== 5) return []

  const stateArray: LetterState[] = Array(5)
  const answerLetterCount = {}
  const ignore = {}
  let continueOuterLoop = false

  for (let i = 0; i < answer.length; i++) {
    if (guess[i] === answer[i]) {
      stateArray[i] = LetterState.Match
      ignore[i] = true
      continue
    }
    answerLetterCount[answer[i]] = (answerLetterCount[answer[i]] ?? 0) + 1
  }

  for (let i = 0; i < guess.length; i++) {
    if (ignore[i]) continue
    continueOuterLoop = false

    for (let j = 0; j < answer.length; j++) {
      if (
        guess[i] === answer[j] &&
        answerLetterCount[guess[i]] &&
        answerLetterCount[guess[i]] !== 0
      ) {
        answerLetterCount[guess[i]]--
        stateArray[i] = LetterState.Present
        continueOuterLoop = true
        break
      }
    }

    if (continueOuterLoop) continue

    stateArray[i] = LetterState.Miss
  }

  return stateArray
}

export { words, LetterState, getRandomWord, computeStateArray }
