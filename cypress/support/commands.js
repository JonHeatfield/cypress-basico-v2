Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function()  {
    cy.get('#firstName').type("Joao")
    cy.get('#firstName').should('have.value', 'Joao')
    cy.get('#lastName').type("Campos")
    // Delay = 0 serve para escrever no campo da maneira mais rapido possivel//
    cy.get('#email').type("joao@vpcamposgmail.com", {delay:0})
    cy.get("#open-text-area").type("Teste")
    cy.get('button[type="submit"]').click()

})
