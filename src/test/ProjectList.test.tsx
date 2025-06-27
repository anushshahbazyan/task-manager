import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react'
import { page, userEvent } from '@vitest/browser/context';
import App from '../App';
import { Provider } from 'react-redux';
import { store } from '../app/store';

test('Projects List Rendered', async () => {
    render(<Provider store={store}><App /></Provider>);

    const header = page.getByText(/Welcome to Task Manager/i);
    await expect.element(header).toBeInTheDocument();
    expect(header).toBeInTheDocument();

    const grid = page.getByTestId('projectListContainer');
    expect(grid).toBeInTheDocument();
});

test('Task Item Rendered', async () => {
    render(<Provider store={store}><App /></Provider>);

    const grid = page.getByTestId('projectListContainer');
    const link = grid.getByText(/Website Redesign/i);
    await userEvent.click(link);

    const firstItem = page.getByTestId('taskList').getByText(/Fix login bug/i);
    expect(firstItem).toBeInTheDocument();
    await userEvent.click(firstItem);

    const detail = page.getByText(/Resolve issues with login./i);
    expect(detail).toBeInTheDocument();
});
