import { createBrowserHistory } from 'history';

const instance = createBrowserHistory();

export const navigateTo = (path) => instance.push(path);

export default instance;
