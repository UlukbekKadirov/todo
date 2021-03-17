import firebase from "firebase";

const firebaseApp = firebase.initializeApp({

    apiKey: "AIzaSyBaab7nEYfBHjB7Q2CgPhKrkP_HkS1IlgU",
    authDomain: "todo-app-25235.firebaseapp.com",
    projectId: "todo-app-25235",
    storageBucket: "todo-app-25235.appspot.com",
    messagingSenderId: "593506387593",
    appId: "1:593506387593:web:c8f0e0acfde244a5cba858",
    measurementId: "G-0Y4MWZCTDC"

})

const db = firebaseApp.firestore();

export default db; 