/// <reference types="Cypress" />
import Constants from '../../support/Locators/locators'
export function login() {
    cy.clearCookies()
    cy.clearLocalStorage()
    cy.visit(Cypress.config().baseUrl)
    cy.fixture('login.json').then((user) => {
        cy.get(Constants.txt_username).as('username')
        cy.get('@username').type(user.Username)
        cy.get(Constants.txt_password).as('password')
        cy.get('@password').type(user.Password)
        cy.get(Constants.btn_login).as('login')
        cy.get('@login').click()
    })
}
export function add_employee() {
    cy.get(Constants.btn_admin).as('Admin_PIM')
    cy.get('@Admin_PIM').should('be.visible').click({ force: true })
    cy.get(Constants.btn_addemployee).as('Add_Employee')
    cy.get('@Add_Employee').should('be.hidden').click({ force: true })
}
export function logout() {
    cy.get(Constants.lbl_dashboard).as('dashboard')
    cy.get('@dashboard').click()
    cy.get(Constants.lnk_anchor).as('link')
    cy.get('@link').contains('Logout').click()
}
