import React from 'react';
import { render, waitForElement } from '@testing-library/react';
jest.mock('./services/blogs');
import App from './App';

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(<App />);
    component.rerender(<App />);

    await waitForElement(() => component.getByText('login'));

    const blogs = component.container.querySelectorAll('.defaultInfo');
    expect(blogs.length).toBe(0);
  });

  test('when the user is logged in, 3 blogs are rendered to the page', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    };
    localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
    const component = render(<App />);
    component.rerender(<App />);

    await waitForElement(() => component.getByText('blogs'));

    const blogs = component.container.querySelectorAll('.defaultInfo');
    expect(blogs.length).toBe(3);
    expect(component.container).toHaveTextContent(
      'Limiting creating new notes to logged in users'
    );
    expect(component.container).toHaveTextContent('try try try');
    expect(component.container).toHaveTextContent('Heath can walk alone!');
  });
});
