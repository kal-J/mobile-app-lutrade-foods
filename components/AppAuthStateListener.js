import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import firebase from '../firebase';
import { setUser } from '../redux/actions';
import { mapStateToProps } from '../redux/mapStateToProps';
import IsLoading from './IsLoading';

const AppAuthStateListener = (props) => {
  const [loading, setLoading] = useState();

  const { setUser } = props;

  useEffect(() => {
    setLoading(true);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });

    setLoading(false);

    // eslint-disable-next-line
  }, []);

  return (
    <>
      {loading && <IsLoading />}
      {props.children}
    </>
  );
};

export default connect(
  mapStateToProps,
  { setUser }
)(AppAuthStateListener);
