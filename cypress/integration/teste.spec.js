
describe('Amazon Test', function() {
    this.beforeEach(function() {
        cy.visit('https://www.amazon.com')

    })

   it('Selecionando um produto e add ele', function() {
    cy.get('#twotabsearchtextbox')
      .type('Playstation DualSense Wireless Controller – Midnight Black', {delay:0})
      .should('have.value', 'Playstation DualSense Wireless Controller – Midnight Black')
  
    cy.get('#nav-search-submit-button').click()
  
    cy.contains('.a-size-medium.a-color-base.a-text-normal', 'Playstation DualSense Wireless Controller – Midnight Black')
    .click()

    cy.get('#title > #productTitle')
        .should('contain', 'Playstation DualSense Wireless Controller – Midnight Black' )


    //cy.get('#availability')
    //    .should('be.visible')
    //    .contains('span.a-size-medium.a-color-success', 'In Stock')   

    cy.get('#add-to-cart-button')  
            .click()

            cy.get('.a-padding-medium')   
                .should('be.visible')    
                    .contains('h1', 'Added to Cart') 
  })
  

})

