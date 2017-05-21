import React from 'react';
import ReactBlocker from 'react-blocker';
import UserStore from '../stores/UserStore';
import HttpError from '../components/HttpError';
import Loading from '../components/Loading';

export const noLogin = ReactBlocker({
  blockFunc: (props) => {
    if (UserStore.user.auth) {
      props.history.push('/');
    }
  },
});


export const requireLogin = ReactBlocker({
  blockFunc: (props) => {
    if (UserStore.loading) {
      return <Loading />;
    }

    if (!UserStore.user.auth) {
      props.history.push('/user/login/');
    }
  },
});

