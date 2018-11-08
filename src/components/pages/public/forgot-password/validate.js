
export default function validate(values) {
    const errors = {};
    if (!values.email) {
        errors.email = 'Looks like you forget your email.';
    }
    return errors;
}
