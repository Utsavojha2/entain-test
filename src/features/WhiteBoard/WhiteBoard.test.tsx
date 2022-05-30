import { render, screen } from 'config/test-utils';
import WhiteBoard from './WhiteBoard';

describe('Testing ModalPopup component', () => {
  it('Rendering whiteboard on initial', () => {
    render(<WhiteBoard id={'asd'} username={'asd'} />);
    expect(screen.getByText(/online users/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('textbox').getAttribute('placeholder')).toMatch(
      /enter a note/i
    );
  });
});
