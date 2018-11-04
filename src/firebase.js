import * as firebase from 'firebase';

const config = {
    apiKey: 'AIzaSyAEQeK7m80EKVJUgWqmbeOaaGGbVvYAsNU',
    authDomain: 'react-rainbow-firebase-auth.firebaseapp.com',
    databaseURL: 'https://react-rainbow-firebase-auth.firebaseio.com',
    projectId: 'react-rainbow-firebase-auth',
    storageBucket: '',
    messagingSenderId: '35988928846',
};

const instance = firebase.initializeApp(config);
export default instance;
