// navigationService.ts
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export const navigate = (path: string) => {
 history.push(path);
};

export default history;
