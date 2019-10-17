import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBomZLkN1uVFQLP3edgbQiaAovzp63xzBM",
    authDomain: "burger-b7fa8.firebaseapp.com",
    databaseURL: "https://burger-b7fa8.firebaseio.com",
    projectId: "burger-b7fa8",
    storageBucket: "burger-b7fa8.appspot.com",
    messagingSenderId: "388726341922",
    appId: "1:388726341922:web:0750ea77a061792506657b"
}

firebase.initializeApp(config);
const databaseRef = firebase.database().ref();
export const todosRef = databaseRef.child("state");