describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user1 = {
      name: 'root',
      username: 'root',
      password: 'root'
    };
    const user2 = {
      name: 'root2',
      username: 'root2',
      password: 'root2'
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user1);
    cy.request('POST', 'http://localhost:3003/api/users/', user2);
    cy.visit('http://localhost:3000');
  });

  it('Login from is shown', function() {
    cy.contains('log in to application');
    cy.contains('login');
  });

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('root');
      cy.get('#password').type('root');
      cy.get('#login-button').click();

      cy.contains('root logged in');
    });

    it('fails with wrong credentials', function() {
      cy.get('#username').type('root');
      cy.get('#password').type('wrong');
      cy.get('#login-button').click();

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid');

      cy.get('html').should('not.contain', 'root logged in');
    });
  });

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'root', password: 'root' });
    });

    it('A blog can be created', function() {
      cy.createBlog({
        title: 'HHHHHHHHH',
        author: 'Zach',
        url: 'https://www.google.com'
      });
      cy.contains('HHHHHHHHH');
      cy.contains('Zach');
    });
  });

  describe('When several blogs creaded by many people exist', function() {
    beforeEach(function() {
      cy.login({ username: 'root', password: 'root' });
      cy.createBlog({
        author: 'John Doe',
        title: 'test1',
        url: 'http://example.com./test1'
      });
      cy.contains('logout').click();
      cy.login({ username: 'root2', password: 'root2' });
      cy.createBlog({
        author: 'Jane Doe',
        title: 'test2',
        url: 'http://example.com./test2'
      });

      cy.contains('test1')
        .parent()
        .as('blog1');
      cy.contains('test2')
        .parent()
        .as('blog2');
    });

    it('Blogs can be liked', function() {
      cy.get('@blog2')
        .contains('view')
        .click();
      cy.get('@blog2')
        .contains('like')
        .click();
      cy.get('@blog2').contains('1 likes');
    });

    it('The creator can delete a blog', function() {
      cy.get('@blog2')
        .contains('view')
        .click();
      cy.get('@blog2')
        .contains('remove')
        .click();
      cy.get('html').should('not.contain', 'test2');

      cy.get('@blog1')
        .contains('view')
        .click();
      cy.get('@blog1').should('not.contain', 'remove');
    });

    it('they are ordered by number of likes', function() {
      cy.get('@blog1')
        .contains('view')
        .click();
      cy.get('@blog2')
        .contains('view')
        .click();
      cy.get('@blog1')
        .contains('like')
        .as('like1');
      cy.get('@blog2')
        .contains('like')
        .as('like2');

      cy.get('@like2').click();
      cy.get('@like2').click();
      cy.get('@like2').click();
      cy.get('@like1').click();

      cy.get('.blog').then(blogs => {
        cy.wrap(blogs[0]).contains('3 likes');
        cy.wrap(blogs[1]).contains('1 likes');
      });
    });
  });
});
