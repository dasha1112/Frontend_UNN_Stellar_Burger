describe('TESTS', () => {
  beforeEach(() => {
      cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('ingredients');
      cy.intercept('GET', 'api/orders/all', { fixture: 'feed.json' }).as('feed');
      cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('user');
      cy.intercept('POST','api/orders', { fixture: 'order.json' }).as('order');
      cy.fixture('ingredients.json');
      cy.fixture('feed.json');
      cy.fixture('user.json');
      cy.fixture('order.json');
      cy.setCookie('accessToken', 'mockAccessTokenDavid');
      localStorage.setItem('refreshToken', 'mockTokenForDavid');
      cy.visit('/');
      cy.wait('@ingredients');
      cy.wait('@user');
  });
  afterEach(() => {
      cy.clearCookies();
      cy.clearLocalStorage();
  });
  describe('TESTS2', function () {
    beforeEach(function () {
    cy.get('ul').find('[href^="/ingredients"]').first().click();
    });
    it('tests open', function () {
    cy.get('#modals').within(() => {
    cy.get('h3').contains('Детали ингредиента').should('be.visible');
    cy.get('h3').contains('Краторная булка N-200i').should('exist');
    //состав
    cy.get('p').contains('Калории, ккал').next().should('not.be.empty');
    cy.get('p').contains('Белки, г').next().should('not.be.empty');
    cy.get('p').contains('Жиры, г').next().should('not.be.empty');
    cy.get('p').contains('Углеводы, г').next().should('not.be.empty');
    });
    })
    it('tests close', function () {
    cy.get('#modals').find('button').click();
    cy.get('#modals').should('be.empty');
    cy.get('div').contains('Детали ингредиента').should('not.exist');
    });
  });

  describe('TESTS3', function () {
    it('test auth', function () {
      cy.visit('/profile');
      cy.get(`[data-cy='profile-name']`).should('have.value', 'Dasha');
      cy.get(`[data-cy='profile-email']`).should('have.value', 'Dasha@yandex.ru');
    });
    it('test add ingradients', function () {
      cy.get('[data-cy="burger-constructor"]').contains('Краторная булка N-200i').should('not.exist');
      cy.get('h3').contains('Булки').next('ul').children().first().contains('Добавить').click();
      cy.get('[data-cy="burger-constructor"]').contains('Краторная булка N-200i').should('exist');
      cy.get('[data-cy="burger-constructor"]').contains('Биокотлета из марсианской Магнолии').should('not.exist');
      cy.get('h3').contains('Начинки').next('ul').children().first().contains('Добавить').click();
      cy.get('[data-cy="burger-constructor"]').contains('Биокотлета из марсианской Магнолии').should('exist');
      cy.get('[data-cy="burger-constructor"]').contains('Соус Spicy-X').should('not.exist');
      cy.get('h3').contains('Соусы').next('ul').children().first().contains('Добавить').click();
      cy.get('[data-cy="burger-constructor"]').contains('Соус Spicy-X').should('exist');
      cy.get('div').contains('Выберите булки').should('not.exist');
      cy.get('div').contains('Выберите начинку').should('not.exist');
      cy.get('button').contains('Оформить заказ').click();
      cy.wait('@order');
      cy.get('[data-cy="modal"]').find('h2').contains('46208').should('exist');
      cy.get('#modals').find('button').click();
      cy.get('#modals').should('be.empty');
      cy.get('div').contains('Выберите булки').should('exist');
      cy.get('div').contains('Выберите начинку').should('exist');
    });
  });
})