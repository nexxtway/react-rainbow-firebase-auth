
export default function validate(values) {
    const errors = {};
    if (!values.email) {
        errors.email = 'This field is required.';
    }
    if (!values.password) {
        errors.password = 'This field is required.';
    }
    return errors;
}
