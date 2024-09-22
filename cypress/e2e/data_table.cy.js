describe('Data Table Component', () => {
  beforeEach(() => {
    cy.visit('/admin/user-profile-list');
  });

  it('should render the table with correct headers', () => {
    cy.get('table').should('be.visible');
    cy.get('th').each((header, index) => {
      const expectedHeaders = ['Full Name', 'Department'];
      expect(header.text().trim()).to.equal(expectedHeaders[index]);
    });
  });



  it('should paginate through the data', () => {
    cy.get('span').contains('Page 1');
    cy.get('button').contains('Next').click();
    cy.get('span').contains('Page 2');
  });

  it('should disable the Previous button on the first page', () => {
    cy.get('button').contains('Previous').should('be.disabled');
  });

  it('should disable the Next button on the last page', () => {
    cy.get('button').contains('Next').click();
    cy.get('button').contains('Next').should('be.disabled');
    cy.get('tr').should('have.length.greaterThan', 1);
    cy.get('td').each((cell) => {
      console.log(cell)
      // expect(cell.text().toUpperCase()).to.include(searchTerm.toUpperCase());
    });
  });
  it('should allow searching through the table', () => {
    cy.get('button').contains('Previous').should('be.disabled');
    const searchTerm = 'hari';
    cy.get('input[placeholder="Search"]').first().type(searchTerm);

    cy.wait(1000);

    cy.get('tr').should('have.length.greaterThan', 1);

    cy.wait(1000);

    let foundMatch=false;
    cy.get('tr:not(:first-child) td').each((cell) => {
      if(cell.text().toUpperCase().includes(searchTerm.toUpperCase())){
        foundMatch=true
      }
      }).then(()=>{
      expect(foundMatch).to.be.true;
    });



  });

});
