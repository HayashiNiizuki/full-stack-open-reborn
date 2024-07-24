describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Max',
      username: 'max',
      password: '271828'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2023')
  })

  it('login form can be opened and login', function () {
    cy.contains('log in').click()
    cy.get('#username').type('max')
    cy.get('#password').type('271828')
    cy.get('#login-button').click()

    cy.contains('Max logged in')
  })

  it('login fails with wrong password', function () {
    cy.contains('log in').click()
    cy.get('#username').type('Max')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'Max logged in')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'max', password: '271828' })
    })

    it('a new note can be created', function () {
      cy.contains('new note').click()
      cy.get('#new-note-input').type('a note created by cypress')
      cy.get('#save-new-note').click()
      cy.contains('a note created by cypress')
    })
  })
})
