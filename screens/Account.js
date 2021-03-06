import React, { useState } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '../redux/mapStateToProps';
import { setUser } from '../redux/actions';
import { View, Image, ActivityIndicator, StyleSheet } from 'react-native';
import NavHeader from '../components/NavHeader';
import { login, logout, signup } from '../auth/Auth';
import {
  Container,
  Card,
  CardItem,
  Content,
  Right,
  Icon,
  Button,
  Text,
} from 'native-base';
import colors from '../layouts/colors';

const Account = (props) => {
  const [isloading, setIsloading] = useState(false);
  const [error, setError] = useState(null);

  const loggedin = props.redux_state.user.isLoggedin;

  if (isloading) {
    return (
      <View style={styles.isloading}>
        <Text style={{ color: '#fff' }}>Loading...</Text>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (loggedin) {
    const user = props.redux_state.user.userInfo;
    return (
      <Container>
        <NavHeader navigation={props.navigation} />
        <View style={{ flex: 1 }}>
          <View style={{ alignItems: 'center' }}>
            <Text>{user.email}</Text>
          </View>
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Button
              full
              style={{ backgroundColor: colors.primary, margin: 40 }}
              onPress={() => {
                setIsloading(true);
                logout(props.setUser, setIsloading, setError);
              }}
            >
              <Text>LOGOUT</Text>
            </Button>
          </View>
        </View>
      </Container>
    );
  }
  return (
    <Container>
      <NavHeader navigation={props.navigation} />

      <View style={{ flex: 1 }}>
        <Button
          full
          style={{ backgroundColor: colors.primary, margin: 50 }}
          onPress={() => {
            setIsloading(true);
            signup(props.setUser, setIsloading, setError);
          }}
        >
          <Text>SIGN UP</Text>
        </Button>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  isloading: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default connect(
  mapStateToProps,
  { setUser }
)(Account);
