import Axios from 'axios';

const lutrade_backend_url = 'https://lutrade-backend.herokuapp.com';

const login = (setUser, setIsloading, setError) => {
  Axios.post(`${lutrade_backend_url}/login`, {
    email: 'kharljay15@gmail.com',
    password: 'test123',
  })
    .then((res) => {
      if (res.data.error) {
        setIsloading(false);
        return setError(res.data.error);
      }

      const { user } = res.data.user;

      setUser({
        isLoggedin: true,
        userInfo: {...user},
      });
      setIsloading(false);
    })
    .catch((error) => {
      const errorMessage = error.message;

      setError(errorMessage);
      setIsloading(false);
    });
};

const logout = (setUser, setIsloading, setError) => {
  Axios.post(`${lutrade_backend_url}/logout`)
    .then((res) => {
      if (res.data.error) {
        setIsloading(false);
        return setError(res.data.error);
      }

      const { status } = res.data;

      if (status) {
        setUser({
          isLoggedin: false,
          userInfo: null,
        });
      } else setError('Failed to logout, please try again');

      setIsloading(false);
    })
    .catch((error) => {
      const errorMessage = error.message;

      setError(errorMessage);
      setIsloading(false);
    });
};

const signup = (setUser, setIsloading, setError) => {
  Axios.post(`${lutrade_backend_url}/signup`, {
    email: 'kharljay15@gmail.com',
    password: 'test123',
  })
    .then((res) => {
      if (res.data.error) {
        setIsloading(false);
        return setError(res.data.error);
      }

      const { user } = res.data.user;

      if (user) {
        setUser({
          isLoggedin: true,
          userInfo: {...user},
        });
      }

      setIsloading(false);
    })
    .catch((error) => {
      const errorMessage = error.message;

      setError(errorMessage);
      setIsloading(false);
    });
};

export { login, logout, signup };
