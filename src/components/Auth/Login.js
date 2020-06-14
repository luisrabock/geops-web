import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { GraphQLClient, ClientError } from 'graphql-request';
import { GoogleLogin } from 'react-google-login';

import appContext from '../../contexts/context';
// import Typography from "@material-ui/core/Typography";

const ME_QUERY = `
{
  me{
      _id
      name
      email
      picture
  }
}`;

const Login = ({ classes }) => {
    const { dispatch } = useContext(appContext);
    const onSuccess = async googleUser => {
        const idToken = googleUser.getAuthResponse().id_token;
        const client = new GraphQLClient('http://localhost:4000/graphql', {
            headers: { authorization: idToken },
        });
        const data = await client.request(ME_QUERY);

        dispatch({ type: 'LOGIN_USER', payload: data.me });
    };
    return (
        <GoogleLogin
            clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}
            onSuccess={onSuccess}
            isSignedIn={true}
        />
    );
};

const styles = {
    root: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
    },
};

export default withStyles(styles)(Login);
