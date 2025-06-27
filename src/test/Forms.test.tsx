import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react'
import { page, userEvent } from '@vitest/browser/context';
import App from '../App';
import { Provider } from 'react-redux';
import { store } from '../app/store';

test('Add task form rendered', async () => {
    render(<Provider store={store}><App /></Provider>);

    const grid = page.getByTestId('projectListContainer');
    const link = grid.getByText(/Website Redesign/i);
    await userEvent.click(link);

    const button = page.getByRole('button');
    await userEvent.click(button);

    const input = page.getByLabelText('Task Title');
    expect(input).toBeRequired();
});
