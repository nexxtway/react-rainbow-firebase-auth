const values = [
    'displayName',
    'email',
    'phoneNumber',
    'password',
];

export default function isChangedValue(currentValues, initialValues) {
    return values.some((value) => currentValues[value] !== initialValues[value]);
}
