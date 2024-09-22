describe('User Registration Form', () => {

  beforeEach(() => {
    cy.visit('/admin/user-profile');
  });

  it('should display the registration form', () => {
    cy.get('form').should('be.visible');
    cy.get('input[id="first_name"]').should('be.visible');
    cy.get('input[id="last_name"]').should('be.visible');
    cy.get('input[id="username"]').should('be.visible');
    cy.get('input[id="isAdmin"]').should('be.visible');
    cy.get('select[id="department"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('should validate required fields', () => {
    cy.get('button[type="submit"]').click();
    console.log(cy.contains('This is required Field'))
    cy.contains('This is required Field').should('have.length', 1);
  });

  it('should show error for invalid username format', () => {
    cy.get('input[id="username"]').type('InvalidUser@Name');
    cy.get('button[type="submit"]').click();

    cy.contains('Username can only have lowercase letter [a-z], numbers(0-9), dots(.) and underscores(_).');
  });

  it('should register successfully when valid data is entered', () => {
    cy.intercept('POST', 'http://localhost:3000/user', { statusCode: 201 }).as('submitUserForm');

    cy.get('input[formControlName="first_name"]').type('John');
    cy.get('input[formControlName="last_name"]').type('Doe');
    cy.get('input[formControlName="username"]').type('johndoe_123');

    cy.get('input[formControlName="isAdmin"]').check();

    cy.get('select[formControlName="department"]').select(2);

    cy.get('button[type="submit"]').click();

    cy.get('button[id="proceed"]').click();

    cy.wait('@submitUserForm').then((interception) => {
      expect(interception.response.statusCode).to.eq(201);
    });
  });

});
