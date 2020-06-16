import React, { useState, useEffect, useContext } from 'react';
import ReactMapGl, { NavigationControl, Marker, Popup } from 'react-map-gl';
import { withStyles } from '@material-ui/core/styles';
import differenceInMinuts from 'date-fns/difference_in_minutes';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/DeleteTwoTone';
import { useClient } from '../services/services';
import PinIcon from './PinIcon';
import Blog from './Blog';
import context from '../contexts/context';
import { GET_PINS_QUERY } from '../graphql/queries';

const INITIAL_VIEWPORT = {
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 13,
};

const Map = ({ classes }) => {
    const client = useClient();
    const { state, dispatch } = useContext(context);

    useEffect(() => {
        getPins();
    }, []);

    const [viewport, setViewport] = useState(INITIAL_VIEWPORT);
    const [userPosition, setUserPosition] = useState(null);

    useEffect(() => {
        getUserposition();
    }, []);

    const [popup, setPopup] = useState(null);

    const getPins = async () => {
        const { getPins } = await client.request(GET_PINS_QUERY);
        console.log('getPins..', getPins);
        dispatch({ type: 'GET_PINS', payload: getPins });
    };

    const getUserposition = () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;
                setViewport({ ...viewport, latitude, longitude });
                setUserPosition({ latitude, longitude });
            });
        }
    };

    const handleClickMap = ({ lngLat, leftButton }) => {
        if (!leftButton) return;
        if (!state.draft) dispatch({ type: 'CREATE_DRAFT' });

        const [longitude, latitude] = lngLat;
        dispatch({
            type: 'UPDATE_DRAFT_LOCATION',
            payload: { longitude, latitude },
        });

        if (state) console.log('state', state.draft);
    };

    const highlightNewPin = pin => {
        const isNewPin =
            differenceInMinuts(Date.now(), Number(pin.createdAt)) <= 30;
        return isNewPin ? 'limegreen' : 'darkblue';
    };

    const handleSelectPin = pin => {
        setPopup(pin);
        dispatch({ type: 'SET_PIN', payload: pin });
    };

    const isAuthUser = () => state.currentUser._id === popup.author._id;
    return (
        <div className={classes.root}>
            <ReactMapGl
                width="100vw"
                height="calc(100vh - 64px)"
                mapStyle="mapbox://sprites/mapbox/streets-v8"
                mapboxApiAccessToken={process.env.REACT_APP_MAP_TOKEN}
                onViewportChange={newViewport => setViewport(newViewport)}
                {...viewport}
                onClick={handleClickMap}
            >
                <div className={classes.navigationControl}>
                    <NavigationControl
                        onViewportChange={newViewport =>
                            setViewport(newViewport)
                        }
                    />
                </div>
                {userPosition && (
                    <Marker
                        latitude={userPosition.latitude}
                        longitude={userPosition.longitude}
                        offsetLeft={-19}
                        offsetTop={-37}
                    >
                        <PinIcon size={40} color="red" />
                    </Marker>
                )}

                {state.draft && (
                    <Marker
                        latitude={state.draft.latitude}
                        longitude={state.draft.longitude}
                        offsetLeft={-19}
                        offsetTop={-37}
                    >
                        <PinIcon size={40} color="hotpink" />
                    </Marker>
                )}
                {state.pins.map(pin => (
                    <Marker
                        key={pin._id}
                        latitude={pin.latitude}
                        longitude={pin.longitude}
                        offsetLeft={-19}
                        offsetTop={-37}
                    >
                        <PinIcon
                            onClick={() => handleSelectPin(pin)}
                            size={40}
                            color={highlightNewPin(pin)}
                        />
                    </Marker>
                ))}

                {popup && (
                    <Popup
                        anchor="top"
                        latitude={popup.latitude}
                        longitude={popup.longitude}
                        closeOnClick={false}
                        onClose={() => setPopup(null)}
                    >
                        <img
                            className={classes.popupImage}
                            src={popup.image}
                            alt={popup.title}
                        />
                        <div className={classes.popupTab}>
                            <Typography>
                                {popup.latitude.toFixed(6)},{' '}
                                {popup.latitude.toFixed(6)}
                            </Typography>
                            {isAuthUser() && (
                                <Button>
                                    <DeleteIcon
                                        className={classes.deleteIcon}
                                    />
                                </Button>
                            )}
                        </div>
                    </Popup>
                )}
            </ReactMapGl>
            <Blog />
        </div>
    );
};

const styles = {
    root: {
        display: 'flex',
    },
    rootMobile: {
        display: 'flex',
        flexDirection: 'column-reverse',
    },
    navigationControl: {
        position: 'absolute',
        top: 0,
        left: 0,
        margin: '1em',
    },
    deleteIcon: {
        color: 'red',
    },
    popupImage: {
        padding: '0.4em',
        height: 200,
        width: 200,
        objectFit: 'cover',
    },
    popupTab: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
};

export default withStyles(styles)(Map);
