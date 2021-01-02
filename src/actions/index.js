import firebase from "firebase";

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

// Создание доски
export const createDesk = (name) => {
    const db = firebase.firestore()

    return db.collection("desks")
        .add({ name })
        .then((docRef) => docRef.get())
}

// Получение досок
export const getDesks = () => {
    const db = firebase.firestore()

    return db.collection("desks")
        .get()
        .then((querySnapshot) => {
            const desks = []

            querySnapshot.forEach((doc) => {
                desks.push({
                    id: doc.id,
                    name: doc.data().name
                })
            })

            return desks
        })
}

// Удаление доски
export const deleteDesk = (id) => {
    const db = firebase.firestore()

    return db.collection("desks")
        .doc(id)
        .delete()
}

// Создание колонки
export const createColumn = (name, deskId) => {
    const db = firebase.firestore()

    return db.collection("columns")
        .add({ name, deskId })
        .then((docRef) => docRef.get())
}

// Получение колонок
export const getColumns = (deskId) => {
    const db = firebase.firestore()

    return db.collection("columns").where("deskId", "==", deskId).get().then((querySnapshot) => {
        const columns = []

        querySnapshot.forEach((doc) => {
            const { deskId, name } = doc.data()
            columns.push({
                id: doc.id,
                deskId,
                name
            })
        })

        return columns
    })
}

// Удаление колонки
export const deleteColumn = (id) => {
    const db = firebase.firestore()

    return db.collection("columns")
        .doc(id)
        .delete()
}

// Создание новой карточки
export const createCard = (name, columnId) => {
    const db = firebase.firestore()

    return db.collection("cards")
        .add({ name, columnId })
        .then((docRef) => docRef.get())
}

// Получение карточек
export const getCards = (columnId) => {
    const db = firebase.firestore()

    return db.collection("cards")
        .where("columnId", "==", columnId)
        .get()
        .then((querySnapshot) => {
            const cards = []

            querySnapshot.forEach((doc) => {
                const { columnId, name } = doc.data()
                cards.push({
                    id: doc.id,
                    columnId,
                    name
                })
            })

            return cards
        })
}

// Удаление карточки
export const deleteCard = (id) => {
    const db = firebase.firestore()

    return db.collection("cards")
        .doc(id)
        .delete()
}
