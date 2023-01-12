import App from './App'
import { render, screen, userEvent } from './test/test-utils'

describe('Simple working test', () => {
  it('the title is visible', () => {
    render(<App />)
    expect(screen.getByText(/Wordle!/i)).toBeInTheDocument()
  })
})
