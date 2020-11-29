import * as fb from 'firebase/app';
import config from './config/firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebase = !fb.apps.length ? fb.initializeApp(config) : fb.app();

export default firebase;