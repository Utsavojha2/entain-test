import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from './App';

describe('App tests', () => {
  it('Testing react router routing for App', () => {
    const history = createMemoryHistory();
    history.push('/random-page');
    render(
      <Router location={history.location} navigator={history}>
        <App />
      </Router>
    );
    expect(
      screen.getByText(/The page you're looking for doesnt exist/i)
    ).toBeInTheDocument();
  });
});
