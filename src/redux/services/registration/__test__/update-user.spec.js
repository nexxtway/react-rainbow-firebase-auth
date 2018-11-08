import updateUser from '../update-user';
import update from '../../firebase/update';

jest.mock('./../../firebase/update', () => jest.fn());
const user = {
    uid: 'user_10',
    updateProfile: jest.fn(() => Promise.resolve()),
};
const profile = {
    displayName: 'Pepe',
};

describe('updateUser service', () => {
    it('should call user updateProfile with the right data', () => {
        expect.assertions(1);
        return updateUser(user, profile)
            .then(() => expect(user.updateProfile).toHaveBeenCalledWith({
                displayName: profile.displayName,
            }));
    });
    it('should call update with the user database ref and the profile data', () => {
        expect.assertions(1);
        update.mockReset();
        return updateUser(user, profile)
            .then(() => expect(update).toHaveBeenCalledWith(
                '/users/user_10',
                profile,
            ));
    });
});
