describe('browser actions',()=>{
    it('should load correct url',()=>{
        // cy.visit('http://localhost:37263/?path=/story/calendar--default-calendar',{timeout:10000})
        cy.visit('http://google.com',{timeout:10000})
    })

})