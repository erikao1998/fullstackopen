describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Testi Käyttäjä',
      username: 'testi',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Blogilista')
    cy.contains('log in').click()
    cy.contains('Login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('testi')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Testi Käyttäjä is logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('virheellinen')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('wrong username or password')

    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.contains('log in').click()
      cy.get('#username').type('testi')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('add a new blog').click()
      cy.get('#title').type('test blog')
      cy.get('#author').type('testi')
      cy.get('#url').type('test_url')
      cy.get('#addBlog').click()
      cy.contains('test blog')

    })

    it('A blog can be liked', function() {
      cy.contains('add a new blog').click()
      cy.get('#title').type('test blog')
      cy.get('#author').type('testi')
      cy.get('#url').type('test_url')
      cy.get('#addBlog').click()
      cy.contains('test blog')
      cy.contains('view').click()
      cy.contains('like').click()

      cy.get('#fullBlog').contains('1')

    })

    it('A blog can be deleted', function() {
      cy.contains('add a new blog').click()
      cy.get('#title').type('test blog')
      cy.get('#author').type('testi')
      cy.get('#url').type('test_url')
      cy.get('#addBlog').click()
      cy.contains('view').click()
      cy.contains('delete').click()
      cy.contains('Deleted test blog')
    })

    describe('Create many blogs', function() {
      beforeEach(function() {
        cy.contains('add a new blog').click()
        cy.get('#title').type('test blog 1')
        cy.get('#author').type('testi')
        cy.get('#url').type('test_url_2')
        cy.get('#addBlog').click()

        cy.get('#title').type('test blog 2')
        cy.get('#author').type('testi')
        cy.get('#url').type('test_url_2')
        cy.get('#addBlog').click()

        cy.get('#title').type('test blog 3')
        cy.get('#author').type('testi')
        cy.get('#url').type('test_url_3')
        cy.get('#addBlog').click()
      })


      it('Blogs are organized by likes', function() {
        cy.contains('test blog 3 by').contains('view').click()
        cy.contains('test_url_3').parent().contains('like').click()
        cy.contains('test_url_3').parent().contains('hide').click()

        cy.wait(2000)

        cy.get('#blog').then( blogs => {
          cy.wrap(blogs[0]).contains('test blog 3')
        })


      })

    })


  })
})
