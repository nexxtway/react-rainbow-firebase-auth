const SIGN_IN_URL = '/home/signin';
const FORGOT_PASSORD_URL = '/home/forgot-password';
const FORGOT_PASSWORD_LINK = '[data-cy="forgot-password-link"]';
const GO_BACK_BUTTON = '[data-cy="go-back-link"]';

describe('Login page', () => {
    beforeEach(() => {
        cy.visit('/home/signin');
    });
    it('should navigate to forgot password and then go back to sign in when press back link', () => {
        cy.get(FORGOT_PASSWORD_LINK).click();
        cy.url().should('contain', FORGOT_PASSORD_URL);
        cy.get(GO_BACK_BUTTON).click();
        cy.url().should('contain', SIGN_IN_URL);
    });
});
