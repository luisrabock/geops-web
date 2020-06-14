import { createContext } from 'react';

const appContext = createContext({
    currentUser: null,
});

export default appContext;
