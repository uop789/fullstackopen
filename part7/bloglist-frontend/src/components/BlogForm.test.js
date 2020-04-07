import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BlogForm from './BlogForm';

test('When created, the callback will be called with data entered to form', () => {
  const addBlog = jest.fn();

  const component = render(<BlogForm addBlog={addBlog} />);

  const blogData = {
    author: 'Zhe He',
    title: 'testing of forms could be easier',
    url: 'https://www.google.com'
  };

  const title = component.container.querySelector('#title');
  const author = component.container.querySelector('#author');
  const url = component.container.querySelector('#url');
  const form = component.container.querySelector('form');

  fireEvent.change(title, {
    target: { value: blogData.title }
  });
  fireEvent.change(author, {
    target: { value: blogData.author }
  });
  fireEvent.change(url, {
    target: { value: blogData.url }
  });
  fireEvent.submit(form);

  expect(addBlog.mock.calls.length).toBe(1);
  expect(addBlog.mock.calls[0][0]).toEqual(blogData);
});
