const blogs = [
  {
    title: 'Limiting creating new notes to logged in users',
    author: 'ABC He',
    url: 'wwww.google.com',
    likes: 6,
    user: {
      username: 'uop789',
      name: 'Zhe He',
      id: '5e42f85259b58837645d5e66'
    },
    id: '5e4568549484f71e8c3bb156'
  },
  {
    title: 'try try try',
    author: 'Heather He',
    url: 'https://www.amazon.com',
    likes: 4,
    user: {
      username: 'uop123',
      name: 'Heather He',
      id: '5e42f88959b58837645d5e67'
    },
    id: '5e4c1389482eca1c8c5c5f26'
  },
  {
    title: 'Heath can walk alone!',
    author: 'Yan Ma',
    url: 'adadad',
    likes: 1,
    user: {
      username: 'uop123',
      name: 'Heather He',
      id: '5e42f88959b58837645d5e67'
    },
    id: '5e4c8cda482eca1c8c5c5f28'
  }
];

const getAll = () => {
  return Promise.resolve(blogs);
};

// eslint-disable-next-line no-unused-vars
let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

export default { getAll, setToken };
