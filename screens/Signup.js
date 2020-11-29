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
import { signup } from '../auth/Auth';
import colors from '../layouts/colors';
import { mapStateToProps } from '../redux/mapStateToProps';
import { setUser } from '../redux/actions';

const SignupError = (props) => {
  return (
    <View style={login_error_styles.card}>
      <Text style={login_error_styles.text_msg}>{props.msg}</Text>

      <Icon name="warning" style={login_error_styles.icon} />
      <Button
        full
        style={login_error_styles.btn}
        onPress={() => props.setSignupErrors(null)}
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

const Signup = (props) => {
  const [signupDetails, setSignupDetails] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [signup_errors, setSignupErrors] = useState(null);
  const [displaySignupButton, setDisplaySignupButton] = useState('flex');

  const { setUser } = props;

  const _keyboardDidShow = () => {
    setDisplaySignupButton('none');
  };
  const _keyboardDidHide = () => {
    setDisplaySignupButton('flex');
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
  const signup_btn_styles = StyleSheet.create({
    form_button_wrapper: {
      position: 'absolute',
      right: wp(4),
      left: wp(4),
      bottom: hp(4),
      zIndex: 2,
      display: displaySignupButton,
    },
    form_button: {
      backgroundColor: colors.primary,
      height: hp(8),
      borderRadius: hp(1.5),
      display: displaySignupButton,
    },
    form_button_text: {
      fontWeight: 'bold',
      color: '#fff',
      display: displaySignupButton,
    },
    privacy_policy_note: {
      marginVertical: hp(2),
      display: displaySignupButton,
    },
  });

  if (signup_errors) {
    return (
      <SignupError
        setSignupErrors={setSignupErrors}
        msg={signup_errors}
        {...props}
      />
    );
  }

  return (
    <>
      <AppBar
        content_right={
          <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
            <Text style={styles.content_right}>Login</Text>
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
            Sign up with email and password
          </Text>
        </View>

        <View style={styles.form_wrapper}>
          <Form style={styles.form}>
            <View style={styles.form_input_wrapper}>
              <Item style={styles.form_input} floatingLabel>
                <Label>Email</Label>
                <Input
                  onChangeText={(value) =>
                    setSignupDetails({ ...signupDetails, email: value })
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
                    setSignupDetails({ ...signupDetails, password: value })
                  }
                />
              </Item>
            </View>
            <View style={styles.form_input_wrapper}>
              <Item style={styles.form_input} floatingLabel>
                <Label>Confirm Password</Label>
                <Input
                  secureTextEntry={true}
                  onChangeText={(value) =>
                    setSignupDetails({
                      ...signupDetails,
                      confirm_password: value,
                    })
                  }
                />
              </Item>
            </View>

            <View style={[styles.center_content, styles.privacy_policy_note]}>
              <Text>By signuping up, you are agreeing to our</Text>
              <Text style={styles.text_link}>Privacy Policy</Text>
            </View>
          </Form>
        </View>
      </ScrollView>

      <View style={signup_btn_styles.form_button_wrapper}>
        <Button
          onPress={() => {
            if (
              !signupDetails.email ||
              !signupDetails.password ||
              !signupDetails.confirm_password
            ) {
              return setSignupErrors('all fields are required');
            }
            if (!signupDetails.email || signupDetails.email === '') {
              return setSignupErrors('Email is required');
            }
            if (!signupDetails.password || signupDetails.password === '') {
              return setSignupErrors('Password is required');
            }
            if (signupDetails.confirm_password !== signupDetails.password) {
              return setSignupErrors('Passwords do not match');
            }

            setLoading(true);
            signup(signupDetails)
              .then((user) => {
                setUser(user);
                setLoading(false);
                props.navigation.navigate('Location');
              })
              .catch((error) => {
                setSignupErrors(error);
                setLoading(false);
              });
          }}
          style={signup_btn_styles.form_button}
          full
        >
          <Text style={signup_btn_styles.form_button_text}>SIGN UP</Text>
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
  textSignup: {
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
)(Signup);
