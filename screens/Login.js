import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from 'react-native';
import { Form, Item, Label, Input, Button, Icon } from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppBar from '../components/AppBar';
import IsLoading from '../components/IsLoading';
import { login } from '../auth/Auth';
import colors from '../layouts/colors';
import { mapStateToProps } from '../redux/mapStateToProps';
import { setUser } from '../redux/actions';

const LoginError = (props) => {
  return (
    <View style={login_error_styles.card}>
      <Text style={login_error_styles.text_msg}>{props.msg}</Text>

      <Icon name="warning" style={login_error_styles.icon} />
      <Button
        full
        style={login_error_styles.btn}
        onPress={() => props.setLoginErrors(null)}
      >
        <Text style={login_error_styles.btn_text}>TRY AGAIN</Text>
      </Button>
    </View>
  );
};

const login_error_styles = StyleSheet.create({
  card: {
    height: hp('40%'),
    marginVertical: hp('30%'),
    marginHorizontal: wp(5),
    elevation: 10,
    backgroundColor: '#fff',
    borderRadius: wp(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  text_msg: {
    fontWeight: 'bold',
    marginVertical: hp(6),
    alignSelf: 'center',
  },
  icon: {
    alignSelf: 'center',
    color: colors.primary,
    fontSize: 50,
  },
  btn: {
    marginVertical: hp(6),
    marginHorizontal: wp(5),
    backgroundColor: colors.primary,
  },
  btn_text: {
    fontWeight: 'bold',
    color: '#fff',
  },
});

const Login = (props) => {
  const [loginDetails, setLoginDetails] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [login_errors, setLoginErrors] = useState(null);
  const [displayLoginButton, setDisplayLoginButton] = useState('flex');

  const { setUser } = props;

  const _keyboardDidShow = () => {
    setDisplayLoginButton('none');
  };
  const _keyboardDidHide = () => {
    setDisplayLoginButton('flex');
  };

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  // log in button styles
  const login_btn_styles = StyleSheet.create({
    form_button_wrapper: {
      position: 'absolute',
      right: wp(4),
      left: wp(4),
      bottom: hp(4),
      zIndex: 2,
      display: displayLoginButton,
    },
    form_button: {
      backgroundColor: colors.primary,
      height: hp(8),
      borderRadius: hp(1.5),
      display: displayLoginButton,
    },
    form_button_text: {
      fontWeight: 'bold',
      color: '#fff',
      display: displayLoginButton,
    },
    privacy_policy_note: {
      marginVertical: hp(2),
      display: displayLoginButton,
    },
  });

  if (login_errors) {
    return (
      <LoginError
        setLoginErrors={setLoginErrors}
        msg={login_errors}
        {...props}
      />
    );
  }

  return (
    <>
      <AppBar
        content_right={
          <TouchableOpacity onPress={() => props.navigation.navigate('Signup')}>
            <Text style={styles.content_right}>Sign up</Text>
          </TouchableOpacity>
        }
        navigation={props.navigation}
      />

      <ScrollView style={{ flex: 1 }}>
        <View style={styles.logo_container}>
          <Image
            style={styles.logo_login}
            source={require('../assets/icon.png')}
          />
        </View>
        <View>
          <Text style={styles.form_head_text}>
            Login with email and password
          </Text>
        </View>

        <View style={styles.form_wrapper}>
          <Form style={styles.form}>
            <View style={styles.form_input_wrapper}>
              <Item style={styles.form_input} floatingLabel>
                <Label>Email</Label>
                <Input
                  onChangeText={(value) =>
                    setLoginDetails({ ...loginDetails, email: value })
                  }
                />
              </Item>
            </View>

            <View style={styles.form_input_wrapper}>
              <Item style={styles.form_input} floatingLabel>
                <Label>Password</Label>
                <Input
                  secureTextEntry={true}
                  onChangeText={(value) =>
                    setLoginDetails({ ...loginDetails, password: value })
                  }
                />
              </Item>
            </View>

            <View style={[styles.center_content, styles.privacy_policy_note]}>
              <Text>By logining in, you are agreeing to our</Text>
              <Text style={styles.text_link}>Privacy Policy</Text>
            </View>
          </Form>
        </View>
      </ScrollView>

      <View style={login_btn_styles.form_button_wrapper}>
        <Button
          onPress={() => {
            if (
              !loginDetails.email ||
              !loginDetails.password 
            ) {
              return setLoginErrors('all fields are required');
            }
            if (!loginDetails.email || loginDetails.email === '') {
              return setLoginErrors('Email is required');
            }
            if (!loginDetails.password || loginDetails.password === '') {
              return setLoginErrors('Password is required');
            }
            

            setLoading(true);
            login(loginDetails)
              .then((user) => {
                setUser(user);
                setLoading(false);
                props.navigation.navigate('Location');
              })
              .catch((error) => {
                setLoginErrors(error);
                setLoading(false);
              });
          }}
          style={login_btn_styles.form_button}
          full
        >
          <Text style={login_btn_styles.form_button_text}>LOGIN</Text>
        </Button>
      </View>

      {isLoading ? <IsLoading /> : null}
    </>
  );
};

const styles = StyleSheet.create({
  content_right: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  center_content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLogin: {
    fontSize: 50,
  },
  logo_login: {
    flex: 1,
    width: wp('80%'),
    resizeMode: 'contain',
  },
  logo_container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp('2%'),
    height: hp('15%'),
    width: wp('100%'),
  },
  form_wrapper: {
    flex: 1,
  },
  form: {
    flex: 1,
  },

  form_head_text: {
    alignSelf: 'center',
    marginVertical: hp('1%'),
  },
  form_input_wrapper: {
    borderBottomWidth: 0.5,
    borderColor: colors.primary,
    padding: 0,
    marginHorizontal: wp(10),
  },
  form_input: {
    borderBottomWidth: 0,
    paddingBottom: hp(2),
  },
  form_forgot_password: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(15),
    marginVertical: hp('3'),
  },
  text_link: {
    color: colors.primary,
  },
  privacy_policy_note: {
    marginVertical: hp(9),
  },
  form_button_wrapper: {
    position: 'absolute',
    right: wp(4),
    left: wp(4),
    bottom: hp(4),
    zIndex: 2,
  },
});

export default connect(
  mapStateToProps,
  { setUser }
)(Login);
