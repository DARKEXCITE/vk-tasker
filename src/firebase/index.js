import firebase from "firebase"

// Инициализация БД
export const initializeFirebase = () => {
    firebase.initializeApp({
        apiKey: "AIzaSyBfzljAGXltJthOg5FLTb7uposMCxsP3vU",
        authDomain: "tasker-65ccc.firebaseapp.com",
        databaseURL: "https://tasker-65ccc-default-rtdb.firebaseio.com",
        projectId: "tasker-65ccc",
        storageBucket: "tasker-65ccc.appspot.com",
        messagingSenderId: "492629030239",
        appId: "1:492629030239:web:d3313fbd7efdf31442b2ea",
        measurementId: "G-SW4DBG53S2"
    })
    firebase.analytics()
}
