import { getCurrentUser, getOnce } from './../firebase';

export default function resolveUserRoles() {
    const { uid } = getCurrentUser();
    return getOnce(`/users/${uid}`)
        .then((user) => {
            if (user) {
                const { roles } = user;
                if (roles) {
                    return roles;
                }
                return null;
            }
            return null;
        });
}
