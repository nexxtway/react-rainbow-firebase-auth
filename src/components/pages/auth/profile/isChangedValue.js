export default function isChangedValue(currentValues, initialsValues) {
    if (currentValues.displayName !== initialsValues.displayName) {
        return true;
    } if (currentValues.email !== initialsValues.email) {
        return true;
    } if (currentValues.phoneNumber !== initialsValues.phoneNumber) {
        return true;
    } if (currentValues.password !== initialsValues.password) {
        return true;
    }
    return false;
}
