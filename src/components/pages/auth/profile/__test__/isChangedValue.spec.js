import isChangedValue from '../isChangedValue';

const initialValues = {
    displayName: 'React Firebase Authentication',
    email: 'react.firebase.authentication@90milesbridge.com',
    phoneNumber: undefined,
    password: undefined,
};

describe('isChangedValue in <Profile/> page', () => {
    it('should return "false" when any values is changed', () => {
        const currentValues = {
            displayName: 'React Firebase Authentication',
            email: 'react.firebase.authentication@90milesbridge.com',
            phoneNumber: undefined,
            password: undefined,
        };
        expect(isChangedValue(currentValues, initialValues)).toBe(false);
    });
    it('should return "true" when the displayName value is changed', () => {
        const currentValues = {
            displayName: 'React Firebase',
            email: 'react.firebase.authentication@90milesbridge.com',
            phoneNumber: undefined,
            password: undefined,
        };
        expect(isChangedValue(currentValues, initialValues)).toBe(true);
    });
    it('should return "true" when the email value is changed', () => {
        const currentValues = {
            displayName: 'React Firebase Authentication',
            email: 'react.authentication@90milesbridge.com',
            phoneNumber: undefined,
            password: undefined,
        };
        expect(isChangedValue(currentValues, initialValues)).toBe(true);
    });
    it('should return "true" when the phoneNumber value is changed', () => {
        const currentValues = {
            displayName: 'React Firebase Authentication',
            email: 'react.firebase.authentication@90milesbridge.com',
            phoneNumber: '12345678',
            password: undefined,
        };
        expect(isChangedValue(currentValues, initialValues)).toBe(true);
    });
    it('should return "true" when the password value is changed', () => {
        const currentValues = {
            displayName: 'React Firebase Authentication',
            email: 'react.firebase.authentication@90milesbridge.com',
            phoneNumber: undefined,
            password: '90milesbridge',
        };
        expect(isChangedValue(currentValues, initialValues)).toBe(true);
    });
});
