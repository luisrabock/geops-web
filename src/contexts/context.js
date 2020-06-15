import { createContext } from 'react';

const appContext = createContext({
    currentUser: null,
    isAuth: false,
});

export default appContext;
