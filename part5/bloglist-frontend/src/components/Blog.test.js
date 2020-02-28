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

  beforeEach(() => {
    component = render(<Blog blog={blog} user={user} />);
  });

  test('at start only the name and author of the blog post are shown by default', () => {
    const div = component.container.querySelector('.defaultInfo');
    expect(div).not.toHaveStyle('display: none');
    expect(div).toHaveTextContent('R.I.P Kobe 24 ABC He');
  });

  test('after clicking, more infos are displayed', () => {
    const clickArea = component.getByText('R.I.P Kobe 24 ABC He');
    fireEvent.click(clickArea);
    const div = component.container.querySelector('.moreInfo');
    expect(div).not.toHaveStyle('display: none');
  });
});
