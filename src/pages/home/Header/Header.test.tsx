import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import Header from './Header';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { SnackbarProvider } from 'notistack';

const renderWithHistory = () => {
  const history = createMemoryHistory();

  const wrapper = render(
    <SnackbarProvider>
      <Router history={history}>
        <Header />
      </Router>
    </SnackbarProvider>
  );
  return { ...wrapper, history };
};

test('should show the name of the logged user', () => {
  localStorage.setItem('first_name', 'Renato');
  const { getByText } = renderWithHistory();
  expect(getByText('Renato')).toBeInTheDocument();
});

test('should show the email of the logged user', () => {
  localStorage.setItem('email', 'renatop@hotmail.com.br');
  const { getByText } = renderWithHistory();
  expect(getByText('renatop@hotmail.com.br')).toBeInTheDocument();
});
