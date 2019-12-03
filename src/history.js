import { createBrowserHistory } from 'history';

const instance = createBrowserHistory();

export const navigateTo = (path) => instance.push(path);
export const goBack = () => instance.goBack();

export default instance;
