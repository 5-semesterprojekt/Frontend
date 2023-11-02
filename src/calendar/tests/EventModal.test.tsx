import { act, screen, render, waitFor } from '@testing-library/react';
import NiceModal from '@ebay/nice-modal-react';
import showEventModal from '../components/Event.modal';

beforeAll(() => {
  beforeEach(() => {
    render(<NiceModal.Provider />);
  });
});

test('it can render the modal', async () => {
  act(() => {
    showEventModal();
  });

  await waitFor(() => {
    expect(screen.getByText('Ny begivenhed')).toBeDefined();
  });
});
