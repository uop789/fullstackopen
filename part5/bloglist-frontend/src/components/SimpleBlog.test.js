import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SimpleBlog from './SimpleBlog';

const blog = {
  title: 'Component testing is done with react-testing-library',
  author: 'Zach He',
  likes: 5
};

test('renders title, author and amount of likes', () => {
  const component = render(<SimpleBlog blog={blog} />);

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library Zach He'
  );

  const element = component.getByText('blog has 5 likes');
  expect(element).toBeDefined();
});

test('clicking the like button twice calls event handler twice', () => {
  const mockHandler = jest.fn();

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  );

  const button = getByText('like');
  fireEvent.click(button);
  fireEvent.click(button);

  expect(mockHandler.mock.calls.length).toBe(2);
});
