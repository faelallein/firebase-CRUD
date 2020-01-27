import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyDwNoW7_htpvqSduSl9YgtOXMxhYanqiDw",
    authDomain: "todo-list-17248.firebaseapp.com",
    databaseURL: "https://todo-list-17248.firebaseio.com",
    projectId: "todo-list-17248",
    storageBucket: "todo-list-17248.appspot.com",
    messagingSenderId: "643932837453",
    appId: "1:643932837453:web:768cfaec0aade02915ae04"
};
// Initialize Firebase
firebase.initializeApp(config);

export default firebase;