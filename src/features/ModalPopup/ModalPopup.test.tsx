import ModalPopup from 'features/ModalPopup/ModalPopup';
import { render, screen, act } from '../../config/test-utils';
import userEvent from '@testing-library/user-event';

const postUsername = jest.fn();

describe('Testing ModalPopup component', () => {
  it('Modal popup inital UI', () => {
    render(<ModalPopup postUsername={postUsername} />);
    const modalSubtext = screen.getByText(/fill in your username/i);
    expect(modalSubtext).toBeInTheDocument();
    const userNameInput = screen.getByRole('textbox');
    expect(userNameInput).toBeInTheDocument();
    expect(userNameInput).toHaveValue('');
    expect(userNameInput.getAttribute('placeholder')).toMatch(/username/i);
  });

  it('Action button for modal popups', async () => {
    render(<ModalPopup postUsername={postUsername} />);
    expect(screen.queryByText(/clear text/i)).not.toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
    await act(async () => {
      await userEvent.type(screen.getByRole('textbox'), 'Utsav');
    });
    expect(await screen.findByText(/submit/i)).not.toBeDisabled();
    expect(screen.getByText(/clear text/i)).toBeInTheDocument();
  });

  it('Submitting username for API request call to have been made', async () => {
    render(<ModalPopup postUsername={postUsername} />);
    await userEvent.type(screen.getByRole('textbox'), 'Utsav');
    await userEvent.click(
      screen.getByRole('button', {
        name: /submit/i,
      })
    );
    expect(postUsername).toHaveBeenCalledTimes(1);
  });
});
