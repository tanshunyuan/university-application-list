import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
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

  it('displays spinner on initial page load', async () => {
    render(<Home />);
    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('hide spinner after data is loaded', async () => {
    render(<Home />);
    const spinner = screen.getByTestId('spinner');
    expect(spinner).not.toBeInTheDocument();
  });
});
