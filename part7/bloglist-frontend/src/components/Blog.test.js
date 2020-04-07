import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog />', () => {
  const blog = {
    title: 'R.I.P Kobe 24',
    author: 'ABC He',
    url: 'https://www.google.com',
    likes: 3,
    user: {
      name: 'Zhe He'
    }
  };
  const user = {
    username: 'uop123',
    name: 'Zhe He'
  };

  let component;
  const increaseLikes = jest.fn();
  const deleteBlog = jest.fn();

  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        user={user}
        increaseLikes={increaseLikes}
        deleteBlog={deleteBlog}
      />
    );
  });

  test('at start only the title and author of the blog post are shown by default', () => {
    const div = component.container.querySelector('.defaultInfo');
    expect(div).not.toHaveStyle('display: none');
    expect(div).toHaveTextContent('R.I.P Kobe 24');
    expect(div).toHaveTextContent('ABC He');
  });

  test('after clicking, url and likes are displayed', () => {
    const viewButton = component.getByText('view');
    fireEvent.click(viewButton);
    const div = component.container.querySelector('.moreInfo');
    expect(div).toHaveTextContent('https://www.google.com');
    expect(div).toHaveTextContent('3 likes');
    expect(div).not.toHaveStyle('display: none');
  });

  test('when liked twice, the event handler gets called twice', () => {
    const viewButton = component.getByText('view');
    fireEvent.click(viewButton);
    const likeButton = component.getByText('like');
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);
    expect(increaseLikes.mock.calls.length).toBe(2);
  });
});
