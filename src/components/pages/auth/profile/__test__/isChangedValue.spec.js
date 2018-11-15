import isChangedValue from '../isChangedValue';

const initialValues = {
    displayName: 'React Firebase Authentication',
    email: 'react.firebase.authentication@90milesbridge.com',
    phoneNumber: undefined,
    password: undefined,
};

const anyValueChanged = {
    displayName: 'React Firebase Authentication',
    email: 'react.firebase.authentication@90milesbridge.com',
    phoneNumber: undefined,
    password: undefined,
};

const displayNameChanged = {
    displayName: 'React Firebase',
    email: 'react.firebase.authentication@90milesbridge.com',
    phoneNumber: undefined,
    password: undefined,
};

const emailChanged = {
    displayName: 'React Firebase Authentication',
    email: 'react.authentication@90milesbridge.com',
    phoneNumber: undefined,
    password: undefined,
};

const phoneNumberChanged = {
    displayName: 'React Firebase Authentication',
    email: 'react.firebase.authentication@90milesbridge.com',
    phoneNumber: '12345678',
    password: undefined,
};

const passwordChanged = {
    displayName: 'React Firebase Authentication',
    email: 'react.firebase.authentication@90milesbridge.com',
    phoneNumber: undefined,
    password: '90milesbridge',
};

describe('isChangedValue in <Profile/> page', () => {
    it('should return "false" when any values is changed', () => {
        expect(isChangedValue(anyValueChanged, initialValues)).toBe(false);
    });
    it('should return "true" when the displayName value is changed', () => {
        expect(isChangedValue(displayNameChanged, initialValues)).toBe(true);
    });
    it('should return "true" when the email value is changed', () => {
        expect(isChangedValue(emailChanged, initialValues)).toBe(true);
    });
    it('should return "true" when the phoneNumber value is changed', () => {
        expect(isChangedValue(phoneNumberChanged, initialValues)).toBe(true);
    });
    it('should return "true" when the password value is changed', () => {
        expect(isChangedValue(passwordChanged, initialValues)).toBe(true);
    });
});
