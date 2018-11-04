import { update } from './../firebase';

export default function updateUser(user, profile) {
    return user.updateProfile({
        displayName: profile.displayName,
    }).then(
        () => update(`/users/${user.uid}`, profile),
    );
}
