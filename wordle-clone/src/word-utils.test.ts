import getRandomWord from './word-utils'
import { render, screen, userEvent } from './test/test-utils'

describe('word-utils', () => {
  it('random word', () => {
    expect(getRandomWord().length).toEqual(5)
  })
})
