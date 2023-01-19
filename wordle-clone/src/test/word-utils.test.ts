import {
  getRandomWord,
  computeStateArray,
  LetterState,
} from '../utils/word-utils'

describe('getRandomWord', () => {
  test('random word', () => {
    expect(getRandomWord().length).toEqual(5)
  })
})

describe('computeStateArray', () => {
  test('works with all misses', () => {
    expect(computeStateArray('brisk', 'algae')).toEqual([
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
    ])
  })

  test('works with partial match', () => {
    expect(computeStateArray('chair', 'choir')).toEqual([
      LetterState.Match,
      LetterState.Match,
      LetterState.Miss,
      LetterState.Match,
      LetterState.Match,
    ])
  })

  test('works with match', () => {
    expect(computeStateArray('cried', 'cried')).toEqual([
      LetterState.Match,
      LetterState.Match,
      LetterState.Match,
      LetterState.Match,
      LetterState.Match,
    ])
  })

  test('works with match and present', () => {
    expect(computeStateArray('boost', 'brute')).toEqual([
      LetterState.Match,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Present,
    ])
  })

  test('works with all present', () => {
    expect(computeStateArray('steam', 'mates')).toEqual([
      LetterState.Present,
      LetterState.Present,
      LetterState.Present,
      LetterState.Present,
      LetterState.Present,
    ])
  })

  test('2 same letters in answer 1 in guess ', () => {
    expect(computeStateArray('mates', 'abate')).toEqual([
      LetterState.Miss,
      LetterState.Present,
      LetterState.Present,
      LetterState.Present,
      LetterState.Miss,
    ])
  })

  test('1 letter in answer 2 in guess ', () => {
    expect(computeStateArray('abate', 'mates')).toEqual([
      LetterState.Present,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Present,
      LetterState.Present,
    ])
  })

  test('edge case', () => {
    expect(computeStateArray('altar', 'amaze')).toEqual([
      LetterState.Match,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Present,
      LetterState.Miss,
    ])
  })

  test('only does one match when two letters exist', () => {
    expect(computeStateArray('solid', 'boost')).toEqual([
      LetterState.Present,
      LetterState.Match,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
    ])
  })

  test('returns empty array when given incomplete guess', () => {
    expect(computeStateArray('so', 'boost')).toEqual([])
  })

  test('when 2 letters are present but answer has only 1 of those letters', () => {
    expect(computeStateArray('allol', 'smelt')).toEqual([
      LetterState.Miss,
      LetterState.Present,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
    ])
  })
})
