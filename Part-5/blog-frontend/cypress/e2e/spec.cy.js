describe('Blog e2e test', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Max',
      username: 'max',
      password: '271828'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function () {
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username-input').type('max')
      cy.get('#password-input').type('271828')
      cy.get('#login-button').click()

      cy.contains('Max logged-in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username-input').type('max')
      cy.get('#password-input').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Login Fail')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Max logged in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'max', password: '271828' })
    })

    it('A blog can be created', function () {
      cy.contains('New blog').click()
      cy.get('#title-input').type('This is test title...')
      cy.get('#author-input').type('max')
      cy.get('#url-input').type('https://www.baidu.com')
      cy.get('#create-button').click()

      cy.contains('This is test title...')
    })
  })

  describe('When a blog is created', function () {
    beforeEach(function () {
      cy.login({ username: 'max', password: '271828' })
      cy.createBlog({ title: 'This is test title...', author: 'max', url: 'https://www.baidu.com' })
    })

    it('can like a blog', function () {
      cy.contains('This is test title...').parent().get('#show-hide-button').click()
      cy.contains('This is test title...').parent().get('#like-button').click()

      cy.contains('This is test title...').parent().contains('likes 1')
    })

    it('can delete a blog', function () {
      cy.contains('This is test title...').parent().get('#show-hide-button').click()
      cy.contains('This is test title...').parent().get('#delete-button').click()

      cy.get('html').should('not.contain', 'This is test title...')
    })
  })
})
