describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'Superuser',
      username: 'root',
      password: 'salainen'
    }

    cy.request('POST', 'http://localhost:3003/api/users', user)

    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function () {
    cy.contains('login').click()
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()

      cy.get('#username').type('root')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.get('html', { timeout: 5000 })
        .should('contain', 'Superuser logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()

      cy.get('#username').type('root')
      cy.get('#password').type('qwerty')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html', { timeout: 5000 })
        .should('not.contain', 'Superuser logged in')
    })

    describe('When logged in', function () {
      beforeEach(function () {
        cy.login({ username: 'root', password: 'salainen' })
      })

      it('a blog can be created', function () {
        cy.contains('create new blog').click()

        cy.get('#title').type('React patterns')
        cy.get('#author').type('Michael Chan')
        cy.get('#url').type('https://reactpatterns.com')

        cy.get('#create-button').click()
        cy.get('html', { timeout: 5000 })
          .should('contain', 'React patterns Michael Chan')
      })

      describe('and several blogs exist', function () {
        beforeEach(function () {
          cy.createBlog({
            title: 'React patterns',
            author: 'Michael Chan',
            url: 'https://reactpatterns.com'
          })
          cy.createBlog({
            title: 'First class tests',
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html'
          })
          cy.createBlog({
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
          })
        })

        it('a blog can be liked', function () {
          cy.contains('First class tests')
            .contains('view')
            .click()

          cy.contains('http://blog.cleancoder.com')
            .contains('likes 0')
            .contains('like')
            .click()

          cy.contains('likes 1')
        })

        it('a blog can be removed by creator', function () {
          cy.contains('Canonical string reduction')
            .contains('view')
            .click()

          cy.contains('http://www.cs.utexas.edu')
            .contains('remove')
            .click()

          cy.get('html', { timeout: 5000 })
            .should('not.contain', 'Canonical string reduction')
        })

        it('a blog cannot be removed by other user', function () {
          const user = {
            name: 'Aku Ankka',
            username: 'aku',
            password: 'salainen'
          }

          cy.request('POST', 'http://localhost:3003/api/users', user)

          cy.login({ username: 'aku', password: 'salainen' })

          cy.contains('Canonical string reduction')
            .contains('view')
            .click()

          cy.contains('http://www.cs.utexas.edu')
            .contains('remove')
            .should('not.exist')
        })

        it('blogs are sorted by likes in descending order', function () {
          cy.contains('React patterns')
            .contains('view')
            .click()

          cy.contains('First class tests')
            .contains('view')
            .click()

          cy.contains('Canonical string reduction')
            .contains('view')
            .click()

          cy.contains('https://reactpatterns.com')
            .contains('likes 0')
            .contains('like')
            .click()
          cy.contains('https://reactpatterns.com')
            .contains('likes 1')

          cy.contains('http://blog.cleancoder.com')
            .contains('likes 0')
            .contains('like')
            .click()
          cy.contains('http://blog.cleancoder.com')
            .contains('likes 1')
            .contains('like')
            .click()
          cy.contains('http://blog.cleancoder.com')
            .contains('likes 2')
            .contains('like')
            .click()
          cy.contains('http://blog.cleancoder.com')
            .contains('likes 3')

          cy.contains('http://www.cs.utexas.edu')
            .contains('likes 0')
            .contains('like')
            .click()
          cy.contains('http://www.cs.utexas.edu')
            .contains('likes 1')
            .contains('like')
            .click()
          cy.contains('http://www.cs.utexas.edu')
            .contains('likes 2')

          cy.get('#blogDiv').should('contain', 'likes 3')
            .next().should('contain', 'likes 2')
            .next().should('contain', 'likes 1')
        })
      })
    })
  })
})
