import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the product showcase heading', () => {
  render(<App />);
  expect(screen.getByText(/Product List/i)).toBeInTheDocument();
});
