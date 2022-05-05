import '@testing-library/jest-dom';
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import React from 'react';
import Home from '../src/pages/index';
import mockRouter from 'next-router-mock';

//loading
//render correct amount of universities
jest.mock('next/router', () => require('next-router-mock'));
describe('Home', () => {
  // beforeEach(() => {
  //   mockRouter.setCurrentUrl('/');
  // });

  it('displays spinner on initial page load', () => {
    render(<Home />);
    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('hide spinner after data is loaded', async () => {
    render(<Home />);
    const spinner = screen.getByTestId('spinner');
    await waitForElementToBeRemoved(spinner);
  });

  it('no results when query params is empty', async () => {
    render(<Home />);
    await waitFor(() => {
      const noresult = screen.getByText(/no university display/i);
      expect(noresult).toBeInTheDocument();
    });
  });
  it('render results based on full query params', async () => {
    render(<Home />);
    await waitFor(() => {
      mockRouter.setCurrentUrl(
        'http://localhost:3000/?country=Malaysia&limit=1&page=1',
      );
      const result = screen.getByText(/Allianze College of Medical Sciences/i);
      expect(result).toBeInTheDocument();
    });
  });
});
