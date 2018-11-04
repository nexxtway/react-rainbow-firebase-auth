import { getCurrentUser, update } from '../firebase';

export default function saveUserLocale(locale) {
    const user = getCurrentUser();
    if (user) {
        return update(`/users/${user.uid}/i18n`, { locale });
    }
    return Promise.resolve();
}
