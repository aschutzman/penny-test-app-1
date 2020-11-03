import { render, screen } from '@testing-library/react';
import App from './App';


test('the searchVal state value is set on input type', ()=> {
  render(<App />);
  let inputElement = screen.getByPlaceholderText(/search show titles/);
  expect(inputElement).toBeInTheDocument();

  inputElement.setAttribute("value", "bad");
  
})
