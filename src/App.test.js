import { render, screen } from '@testing-library/react';
import App from './App';

test('that empty objects are not rendered on load', ()=> { 
  render(<App />);

  const inputElement = screen.getByPlaceholderText(/search show titles/);
  expect(inputElement).toBeInTheDocument();

});

test('the searchVal state value is set on input type', ()=> {
  render(<App />);
  const inputElement = screen.getByPlaceholderText(/search show titles/);
  expect(inputElement).toBeInTheDocument();

  inputElement.setAttribute("value", "bad");
});
