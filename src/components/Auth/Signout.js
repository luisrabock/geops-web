import React, { useContext } from 'react';
import { GoogleLogout } from 'react-google-login';
import { withStyles } from '@material-ui/core/styles';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Typography from '@material-ui/core/Typography';
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';

import context from '../../contexts/context';

const Signout = ({ classes }) => {
    const mobileSize = useMediaQuery('(max-width: 650px)');
    const { dispatch } = useContext(context);

    const onSignout = () => {
        dispatch({ type: 'SIGNOUT_USER' });
    };
    return (
        <GoogleLogout
            onLogoutSuccess={onSignout}
            buttonText="Signout"
            render={({ onClick }) => (
                <span className={classes.root} onClick={onClick}>
                    <Typography
                        variant="body1"
                        className={classes.buttonText}
                        style={{ display: mobileSize ? 'none' : 'block' }}
                    >
                        Signout
                    </Typography>
                    <ExitToApp className={classes.buttonIcon} />
                </span>
            )}
        />
    );
};

const styles = {
    root: {
        cursor: 'pointer',
        display: 'flex',
    },
    buttonText: {
        color: 'white',
    },
    buttonIcon: {
        marginLeft: '5px',
        color: 'white',
    },
};

export default withStyles(styles)(Signout);
