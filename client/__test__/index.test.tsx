import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Home from '../src/pages/index';
import mockRouter from 'next-router-mock';
import singletonRouter, { useRouter } from 'next/router';

//loading
//render correct amount of universities
jest.mock('next/router', () => require('next-router-mock'));
describe('Home', () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl('/');
  });

  it('displays loading', () => {
    const result = render(<Home />);
    const spinner = result.container.querySelector('#spinner');
    expect(spinner).toBeInTheDocument();
  });
  it('empty query string returns nothing',()=>{
    const result = render(<Home />);
    screen.getByLabelText('no-results')
  })
});
