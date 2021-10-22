/// <reference types="Cypress" />
var txt_firstname = '#firstName'
var txt_lastname = '#lastName'
var btn_file_upload = '#photofile'
var btn_save = '#btnSave'
var txt_emp_id = '#employeeId'
var edit_txt_licenseno = '#personal_txtLicenNo'
var edit_txt_licenseexpdate = '#personal_txtLicExpDate'
var rd_gender = 'input[name="personal[optGender]"]'
var edit_save_bloodgroup = '//input[@id="btnEditCustom"]'
var edit_save_personaldetails = '//input[@id="btnSave"]'
var dd_bloodgroup = '//select[@name="custom1"]'
var dd_maritalstatus = '#personal_cmbMarital'
var dd_nationality = '#personal_cmbNation'
import Constants from '../Locators/locators'
var btn_add_supervisor_detail = '#btnAddSupervisorDetail'
var txt_add_supervisior_name = '#reportto_supervisorName_empName'
var dd_reporting_structure = '#reportto_reportingMethodType'
var btn_save_reporting_manager = '#btnSaveReportTo'

export function add_first_employee_basic() {
    cy.fixture('new_employee_supervisor').then((newuser) => {
        cy.get(txt_firstname).should('be.visible').type(newuser.firstname)
        cy.get(txt_lastname).should('be.visible').type(newuser.lastname)
        cy.get(txt_emp_id)
            .invoke('val')
            .then((text) => {
                const new_text = text
                cy.readFile(
                    'cypress/fixtures/new_employee_supervisor.json'
                ).then((data) => {
                    data.empid = new_text
                    cy.writeFile(
                        'cypress/fixtures/new_employee_supervisor.json',
                        JSON.stringify(data)
                    )
                })
            })

        cy.get(btn_file_upload).attachFile('pp_jln.jpg')
        cy.get(btn_save).click()
    })
}
export function add_first_employee_personal() {
    cy.xpath(edit_save_personaldetails).as('save')
    cy.get('@save').click()
    cy.fixture('new_employee_supervisor_personaldetails').then((data) => {
        cy.get(edit_txt_licenseno).as('licno')
        cy.get('@licno').type(data.LicenseNo)
        cy.get(edit_txt_licenseexpdate).as('expdate')
        cy.get('@expdate').clear().type(data.LicenseExpiryDate)
        cy.get(rd_gender).as('gender')
        cy.get('@gender').check(data.Sex)
        cy.get(dd_maritalstatus).as('maritalstatus')
        cy.get('@maritalstatus').select(data.MaritalStatus)
        cy.get(dd_nationality).as('nationality')
        cy.get('@nationality').select(data.Nationality)
    })
    cy.get('@save').click()
    cy.get(Constants.lbl_saved).as('labelsaved')
    cy.get('@labelsaved').contains('Successfully Saved')
}
export function add_second_employee_basic() {
    cy.fixture('new_employee_subordinate').then((newuser) => {
        cy.get(txt_firstname).should('be.visible').type(newuser.firstname)
        cy.get(txt_lastname).should('be.visible').type(newuser.lastname)
        cy.get(txt_emp_id)
            .invoke('val')
            .then((text) => {
                const new_text = text
                cy.readFile(
                    'cypress/fixtures/new_employee_subordinate.json'
                ).then((data) => {
                    data.empid = new_text
                    cy.writeFile(
                        'cypress/fixtures/new_employee_subordinate.json',
                        JSON.stringify(data)
                    )
                })
            })

        cy.get(btn_file_upload).attachFile('pp_sg.jpg')
        cy.get(btn_save).click()
    })
}
export function add_second_employee_personal() {
    cy.xpath(edit_save_personaldetails).as('save')
    cy.get('@save').click()
    cy.fixture('new_employee_subordinate_personaldetails').then((data) => {
        cy.get(edit_txt_licenseno).as('licno')
        cy.get('@licno').type(data.LicenseNo)
        cy.get(edit_txt_licenseexpdate).as('expdate')
        cy.get('@expdate').clear().type(data.LicenseExpiryDate)
        cy.get(rd_gender).as('gender')
        cy.get('@gender').check(data.Sex)
        cy.get(dd_maritalstatus).as('maritalstatus')
        cy.get('@maritalstatus').select(data.MaritalStatus)
        cy.get(dd_nationality).as('nationality')
        cy.get('@nationality').select(data.Nationality)
    })
    cy.get('@save').click()
    cy.get(Constants.lbl_saved).as('labelsaved')
    cy.get('@labelsaved').contains('Successfully Saved')
}
export function add_reporting_structure() {
    cy.get(Constants.lnk_anchor)
        .contains('Report-to')
        .should('be.visible')
        .click()
    cy.get(btn_add_supervisor_detail).as('addsupervisor')
    cy.get('@addsupervisor').click()
    cy.fixture('new_employee_supervisor').then((supervisor) => {
        cy.get(txt_add_supervisior_name)
            .type(supervisor.firstname)
            .type('{downarrow}{enter}')
    })
    cy.fixture('new_employee_supervisor_personaldetails').then((personal) => {
        cy.get(dd_reporting_structure).as('reporting')
        cy.get('@reporting').select(personal.ReportingMethod)
    })
    cy.get(btn_save_reporting_manager).as('reportingmgr')
    cy.get('@reportingmgr').click()
    cy.get('@labelsaved').contains('Successfully Saved')
}
