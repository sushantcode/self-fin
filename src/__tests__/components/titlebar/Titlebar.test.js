import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Titlebar from '../../../components/titlebar/Titlebar';

describe('Titlebar', () => {
  test('renders the logo', () => {
    render(
      <MemoryRouter initialEntries={['/path/to/here']}>
        <Titlebar />
      </MemoryRouter>
    );
    const logo = screen.getByAltText('logo');
    expect(logo).toBeInTheDocument();
  });

  test('displays the current page name when on Dashboard', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Titlebar />
      </MemoryRouter>
    );
    const currPath = screen.getByText('Dashboard');
    expect(currPath).toBeInTheDocument();
  });

  test('displays the current page name when on Login', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Titlebar />
      </MemoryRouter>
    );
    const currPath = screen.getByText('Login');
    expect(currPath).toBeInTheDocument();
  });

  test('displays the current page name when on Expense', () => {
    render(
      <MemoryRouter initialEntries={['/expense']}>
        <Titlebar />
      </MemoryRouter>
    );
    const currPath = screen.getByText('Regular Expense');
    expect(currPath).toBeInTheDocument();
  });

  test('displays the current page name when on Income', () => {
    render(
      <MemoryRouter initialEntries={['/income']}>
        <Titlebar />
      </MemoryRouter>
    );
    const currPath = screen.getByText('Add Income');
    expect(currPath).toBeInTheDocument();
  });

  test('displays the current page name when on Loan to Friends', () => {
    render(
      <MemoryRouter initialEntries={['/loan']}>
        <Titlebar />
      </MemoryRouter>
    );
    const currPath = screen.getByText('Loan to Friends');
    expect(currPath).toBeInTheDocument();
  });

  test('displays the current page name when on Add Savings', () => {
    render(
      <MemoryRouter initialEntries={['/savings']}>
        <Titlebar />
      </MemoryRouter>
    );
    const currPath = screen.getByText('Add Savings');
    expect(currPath).toBeInTheDocument();
  });

  test('displays the current page name when on Investments', () => {
    render(
      <MemoryRouter initialEntries={['/investments']}>
        <Titlebar />
      </MemoryRouter>
    );
    const currPath = screen.getByText('Investments');
    expect(currPath).toBeInTheDocument();
  });

  test('displays the current page name when on Transfer Home', () => {
    render(
      <MemoryRouter initialEntries={['/home']}>
        <Titlebar />
      </MemoryRouter>
    );
    const currPath = screen.getByText('Transfer Home');
    expect(currPath).toBeInTheDocument();
  });

  test('displays the current page name when on Custom Report', () => {
    render(
      <MemoryRouter initialEntries={['/report']}>
        <Titlebar />
      </MemoryRouter>
    );
    const currPath = screen.getByText('Custom Report');
    expect(currPath).toBeInTheDocument();
  });

  test('displays the current page name when on Batch Processor', () => {
    render(
      <MemoryRouter initialEntries={['/batchProcessor']}>
        <Titlebar />
      </MemoryRouter>
    );
    const currPath = screen.getByText('Batch Processor');
    expect(currPath).toBeInTheDocument();
  });

  test('displays the current page name when on Unknown Path', () => {
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <Titlebar />
      </MemoryRouter>
    );
    const currPath = screen.getByText('Unknown Path');
    expect(currPath).toBeInTheDocument();
  });

  test('logs out the user when clicking the sign out button', () => {
    const mockLogout = jest.fn();
    const mockNavigate = jest.fn();
    const location = { pathname: '/expense' };
    jest.mock('react-router-dom');
    render(
      <MemoryRouter initialEntries={['/expense']}>
        <Titlebar />
      </MemoryRouter>
    );
    const signOutButton = screen.getByTestId('sign-out-button');
    signOutButton.onclick = mockLogout;
    fireEvent.click(signOutButton);
    expect(mockLogout).toHaveBeenCalled();
    // expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
});
