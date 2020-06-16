import { createContext } from 'react';

const appContext = createContext({
    currentUser: null,
    isAuth: false,
    draft: null,
    pins: [],
    currentPin: null,
});

export default appContext;
