import React, { useContext, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import FaceIcon from '@material-ui/icons/Face';
import format from 'date-fns/format';

import CreateComment from '../Comment/CreateComment';
import Comments from '../Comment/Comments';

import context from '../../contexts/context';

const PinContent = ({ classes }) => {
    const { state } = useContext(context);
    const { title, content, author, createdAt, comments } = state.currentPin;
    state && console.log(state.currentPin);
    return (
        <div className={classes.root}>
            <Typography
                component="h2"
                variant="h4"
                color="primary"
                gutterBottom
            >
                {title}
            </Typography>
            <Typography
                component="h3"
                className={classes.text}
                variant="h6"
                color="inherit"
                gutterBottom
            >
                <FaceIcon className={classes.icon} /> {author.name}
            </Typography>
            <Typography
                component="h3"
                className={classes.text}
                variant="subtitle2"
                color="inherit"
                gutterBottom
            >
                <AccessTimeIcon className={classes.icon} />
                {format(Number(createdAt), 'MM/DD/YYYY')}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                {content}
            </Typography>
            <CreateComment />
            <Comments comments={comments} />
        </div>
    );
};

const styles = theme => ({
    root: {
        padding: '1em 0.5em',
        textAlign: 'center',
        width: '100%',
    },
    icon: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    text: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default withStyles(styles)(PinContent);
