import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCUxfAvcVoiNwOOUsJV-1TgSqJxldOHOmw",
    authDomain: "blog-app-69c7b.firebaseapp.com",
    projectId: "blog-app-69c7b",
    storageBucket: "blog-app-69c7b.appspot.com",
    messagingSenderId: "554384509690",
    appId: "1:554384509690:web:c2919dd9131efb3ef85743"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;