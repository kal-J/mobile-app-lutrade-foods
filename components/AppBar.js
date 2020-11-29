import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  Header,
  Left,
  Button,
  Icon,
  Body,
  Right,
  Container,
} from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  //listenOrientationChange as loc,
  //removeOrientationListener as rol
} from 'react-native-responsive-screen';
import colors from '../layouts/colors';

const AppBar = (props) => {
  return (
    <View style={styles.appbar}>
      <Left>
        {props.content_left ? (
          props.content_left
        ) : (
          <Button transparent onPress={() => props.navigation.openDrawer()}>
            <Icon style={styles.icons} name="menu" />
          </Button>
        )}
      </Left>

      {props.content_body ? <Body>{props.content_body}</Body> : <Body />}

      <Right>
        {props.content_right ? (
          props.content_right
        ) : (
          <Icon style={styles.icons} name="notifications" />
        )}
      </Right>
    </View>
  );
};

const styles = StyleSheet.create({
  appbar: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icons: {
    color: colors.primary,
  },
});

export default AppBar;