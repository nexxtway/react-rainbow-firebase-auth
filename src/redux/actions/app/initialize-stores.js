import { updateUserData } from '../authentication';
import { loadTopups } from '../topups';
import { loadOptions } from '../options';
import updateUserPhoneNumber from '../user/update-user-phone-number';

export default function initializeStores({
    baseOptions, roles, topups, phoneNumber,
}) {
    return (dispatch) => {
        dispatch(loadOptions(baseOptions));
        dispatch(updateUserData({ roles }));
        dispatch(loadTopups(topups));
        dispatch(updateUserPhoneNumber(phoneNumber));
    };
}
