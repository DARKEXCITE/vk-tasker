import firebase from "firebase"
import * as actionType from './types'
import { addDesk, removeDesk, setDesks, changeDesk } from "./actions"

const initialState = Object.freeze({
    list: []
})

export default (state = initialState, action) => {
    switch (action.type) {
        // Добавить доску
        case actionType.ADD_DESK: {
            const list = [...state.list, action.desk]

            return {
                ...state,
                list
            }
        }

        // Изменить доски
        case actionType.SET_DESKS: {
            return {
                ...state,
                list: action.desks
            }
        }

        // Удалить доску
        case actionType.REMOVE_DESK: {
            const desks = state.list.filter(({ id }) => action.removeID !== id)

            return {
                ...state,
                list: desks
            }
        }

        // Редактировать доску
        case actionType.EDIT_DESK: {
            const list = state.list.map(desk => desk.id !== action.id ? desk : { ...desk, name: action.name })

            return {
                ...state,
                list
            }
        }

        default: { return state }
    }
}

// Создание доски
export const createDesk = (name) => {
    return (dispatch) => {
        const db = firebase.firestore()

        return db.collection("desks")
            .add({name})
            .then((docRef) => docRef.get())
            .then((doc) => dispatch(addDesk({id: doc.id, ...doc.data()})))
            .catch(console.error)
    }
}

// Получение досок
export const fetchDesks = () => {
    return (dispatch) => {
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
            .then((desks) => dispatch(setDesks(desks)))
    }
}

// Удаление доски
export const deleteDesk = (id) => {
    return (dispatch) => {
        const db = firebase.firestore()

        return db.collection("desks")
            .doc(id)
            .delete()
            .then(() => dispatch(removeDesk(id)))
            .catch(console.error)
    }
}

// Редактирование доски
export const editDesk = (id, name) => {
    return (dispatch) => {
        const db = firebase.firestore()

        return db.collection("desks")
            .doc(id)
            .set({ name })
            .then(() => {
                dispatch({ type: actionType.EDIT_DESK_SUCCESS })
                dispatch(changeDesk(id, name))
            })
            .catch(() => dispatch({ type: actionType.EDIT_DESK_FAIL }))
    }
}
