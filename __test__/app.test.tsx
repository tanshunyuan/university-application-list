import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '../src/pages/index';
//loading
//render correct amount of universities
describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', {
      name: 'Universities',
    });

    expect(heading).toBeInTheDocument();
  });
});
