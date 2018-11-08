
export default function validate(values) {
    const errors = {};
    if (!values.username) {
        errors.username = 'Looks like you forget your username.';
    }
    if (!values.email) {
        errors.email = 'Looks like you forget your email.';
    }
    if (!values.password) {
        errors.password = 'Looks like you forget your password.';
    }
    return errors;
}
