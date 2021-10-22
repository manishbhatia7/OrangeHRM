/// <reference types="Cypress" />
import { add_employee, login, logout } from '../support/Helper/helper'
import {
    add_first_employee_basic,
    add_first_employee_personal,
    add_reporting_structure,
    add_second_employee_basic,
    add_second_employee_personal,
} from '../support/PageObjects/employee'

describe('Orange HRM functionality', () => {
    beforeEach(() => {
        login()
        add_employee()
    })
    afterEach(() => {
        logout()
    })

    it('Add First Employee', () => {
        add_first_employee_basic()
        add_first_employee_personal()
    })
    it('Add Second Employee', () => {
        add_second_employee_basic()
        add_second_employee_personal()
        add_reporting_structure()
    })
})
