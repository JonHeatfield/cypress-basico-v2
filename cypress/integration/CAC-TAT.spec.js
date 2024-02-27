/// <reference types="Cypress" ///>

describe('Central de Atendimento ao Cliente TAT', function() {
    this.beforeEach(function() {
        cy.visit('./src/index.html')

    })
    it('verifica o título da aplicação', function() {

        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')        

    })

    it("Preencher os campos obrigatórios e enviar o formulário", function(){

        cy.get('#firstName').type("Joao")
        cy.get('#firstName').should('have.value', 'Joao')
        cy.get('#lastName').type("Campos")
        // Delay = 0 serve para escrever no campo da maneira mais rapido possivel//
        cy.get('#email').type("joao@vpcamposgmail.com", {delay:0})
        cy.get("#open-text-area").type("Teste")
        cy.get('button[type="submit"]').click()
        // validando se a mensagem de sucesso foi mostrada //
        cy.get('.success').should('be.visible')

        })

    it("validando mensagem de erro ao inserir email na formatação incoreta", function(){

        cy.get('#firstName').type("Joao")
        cy.get('#lastName').type("Campos")
        // Delay = 0 serve para escrever no campo da maneira mais rapido possivel//
        cy.get('#email').type("joaovpcamposgmail.com", {delay:0})
        cy.get("#open-text-area").type("Teste")
        cy.get('button[type="submit"]').click()
        // validando se a mensagem de sucesso foi mostrada //
        cy.get('.error').should('be.visible')

    })    

    it("Campo telefone continua vazio quando digitado não numeros", function(){

        cy.get('#phone')
            .type('ashdhasd')
                .should('have.value', '')

    })    

    it("validando mensagem de erro quabndo o telefone se torna obrigatório mas não é preenchido antes do envio", function(){

        cy.get('#firstName').type("Joao")
            .should('have.value', 'Joao')
                .clear()
        cy.get('#lastName').type("Campos")
            .should('have.value', 'Campos')
                .clear()
        // Delay = 0 serve para escrever no campo da maneira mais rapido possivel//
        cy.get('#email').type("joaovpcamposgmail.com", {delay:0})
            .should('have.value', 'joaovpcamposgmail.com')
                .clear()

    })    

    it("preenche e limpa os campos nome, sobrenome, email e telefone", function(){

        cy.get('#firstName').type("Joao")
        cy.get('#lastName').type("Campos")
        // Delay = 0 serve para escrever no campo da maneira mais rapido possivel//
        cy.get('#email').type("joaovpcamposgmail.com", {delay:0})
        cy.get("#open-text-area").type("Teste")
        cy.get('#phone-checkbox').click()
        cy.get('button[type="submit"]').click()
        // validando se a mensagem de erroro foi mostrada //
        cy.get('.error').should('be.visible')

    }) 

    it("Valida mensagem de erro ao dar submit sem preencher ps campos obrigat[orios", function(){

        cy.get('#firstName').type("Joao")
        cy.get('#lastName').type("Campos")
        // Delay = 0 serve para escrever no campo da maneira mais rapido possivel//
        cy.get('#email').type("joaovpcamposgmail.com", {delay:0})
        cy.get("#open-text-area").type("Teste")
        cy.get('#phone-checkbox').click()
        cy.get('button[type="submit"]').click()
        // validando se a mensagem de erroro foi mostrada //
        cy.get('.error').should('be.visible')

    }) 
    
    it("Comandos customizados", function(){

        cy.fillMandatoryFieldsAndSubmit()
        // validando se a mensagem de sucesso foi mostrada //
        cy.get('.success').should('be.visible')

    })    

    it("Verificando a usabilidade a função contains", function(){

        cy.get('#firstName').type("Joao")
        cy.get('#firstName').should('have.value', 'Joao')
        cy.get('#lastName').type("Campos")
        // Delay = 0 serve para escrever no campo da maneira mais rapido possivel//
        cy.get('#email').type("joao@vpcamposgmail.com", {delay:0})
        cy.get("#open-text-area").type("Teste")
        cy.contains('button', "Enviar").click()
        // validando se a mensagem de sucesso foi mostrada //
        cy.get('.success').should('be.visible')

    })    

    it("Selecionando um produto you tube pelo texto", function(){

        cy.get('#product').select('YouTube')
        cy.get('#product').should('have.value', 'youtube')
    })

    it("Selecionando um produto mentoria pelo seu valor", function(){

        cy.get('#product').select('mentoria')
            .should('have.value', 'mentoria')
    })

    it("Selecionando um produto blog pelo seu indice", function(){

        cy.get('#product').select(1)
            .should('have.value', 'blog')
    })

    it('Marca o tipo de atendimento Feedback', function(){

        cy.get('input[type="radio"][value=feedback]').check()
            .should('have.value', 'feedback')

    })

    it('Marca todos os radio buttons e valida se foram selecionados', function(){

        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio){
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })

    })

    it("Marcar ambas as checkbocs e depois desmarcar a ultima", function(){

        cy.get('input[type=checkbox]').check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })


    it("Mensagem de erro se o telefone for selecionado mas não preenchido", function(){

        cy.get('#firstName').type("Joao")
        cy.get('#firstName').should('have.value', 'Joao')
        cy.get('#lastName').type("Campos")
        // Delay = 0 serve para escrever no campo da maneira mais rapido possivel//
        cy.get('#email').type("joao@vpcamposgmail.com", {delay:0})
        cy.get("#open-text-area").type("Teste")
        cy.get('#phone-checkbox').check()
            .should('be.checked')
        cy.get('button[type="submit"]').click()  
        cy.get('.error').should('be.visible')
    })

    it("Selecionando um arquivo da pasta fixtures", function(){

        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
        
    })

    it("Selecionando um arquivo simulando um arquivo drag and drop", function(){

        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
        
    })

    it("Selecionando um arquivo simulando no qual foi dado um alias", function(){

        cy.fixture('example.json').as("sampleFile")
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile("@sampleFile")
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
        
    })

    it("Verifica que a politica de privacidade abre em uma outra aba sem precisar clicar", function(){
        // toda aplicação vai abrir em outro navegador se ela tiver o atributo href e _blank
        cy.get('#privacy a').should('have.attr', 'target' , "_blank")
            
        
    })

    it("Verifica que a politica de privacidade abre em uma outra aba retirando o atributo _blank", function(){
        // toda aplicação vai abrir em outro navegador se ela tiver o atributo href e _blank
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()

        cy.contains('Talking About Testing').should("be.visible") 
                   
    })

    it.only("Verifica a tela de politica de privacidade de forma idependente", function(){
        cy.visit('./src/privacy.html')
        cy.contains('CAC TAT - Política de privacidade').should("be.visible") 
        cy.screenshot()       
    })

  })