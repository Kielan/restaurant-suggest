//import { default as cy } from 'cypress';
import { assert } from 'sinon';

// @ts-check
describe('Suggest Card Component API', () => {

    const reset = () => {
        cy.visit('http://localhost:8000/protected')
        cy.reload(true);
    }
    
    afterEach(reset);
    beforeEach(reset);

    it('should render the home page', () => {
        cy.get('form').should('be.visible'); // change it to your content
    });

    it('should make textarea visible after click form', () => {
        cy.get('form').click()
        .get('textarea').should('be.visible');
    });

    it('should make input active after click form empty textarea', () => {
        cy.get('form').click()
        .get('textarea').should('be.empty'); // change it to your content
    });

    it('should make input active after click form and insert text providing suggestions', () => {
        cy.get('form').click()
        .get('textarea').type('Ike')
        .get('li').should('be.visible'); // change it to your content
    });

    it('should make input active after click form and textinput be focused', () => {
        cy.get('form').click()
        .get('textarea').type('Ike')
        .get('textarea').should('be.focused'); // change it to your content
    });

    it('should make input active after click form insert text click item and close list', () => {
        cy.get('form').click()
        .get('textarea').type('Ike')
        .get('li').should('be.visible')
        .get('li').first().click()
        .get('li').should('not.be.visible');
    });

    it('should make input active after click form insert text click item and textarea should not be visible', () => {
        cy.get('form').click()
        .get('textarea').type('Ike')
        .get('li').should('be.visible')
        .get('li').first().click()
        .then(async() => await setTimeout(() => {}, 5))
        .get('textarea').should('not.be.visible');
    });

    it('should make input active after click form insert text click item and form should then be visible', () => {
        cy.get('form').click()
        .get('textarea').type('Ike')
        .get('li').should('be.visible')
        .get('li').first().click()
        .get('form').should('be.visible');
    });

    it('generate random should generate a random location ', () => {
        cy.get('button').contains('random suggestion').click()
        .get('textarea').should('not.be.visible')
    //     .get('li').should('be.visible')
    //     .get('li').first().click()
    //     //.get('form').should('be.visible');
    //    // console.log('check global window object ', window);
    //    //cy.assert(true).to.be.true;
    });
});