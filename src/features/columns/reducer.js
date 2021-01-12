import firebase from "firebase"
import * as actionType from './types'
import { addColumn, removeColumn, setColumns } from "./actions"

const initialState = {
    list: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        // Добавить колонку
        case actionType.ADD_COLUMN: {
            const list = [...state.list, action.column]

            return {
                ...state,
                list
            }
        }

        // Изменить колонки
        case actionType.SET_COLUMNS: {
            return {
                ...state,
                list: action.columns
            }
        }

        // Удалить колонку
        case actionType.REMOVE_COLUMN: {
            const list = state.list.filter(({ id }) => action.removeID !== id)

            return {
                ...state,
                list
            }
        }

        default: { return state }
    }
}

// Создание колонки
export const createColumn = (name, deskId) => {
    return (dispatch) => {
        const db = firebase.firestore()

        return db.collection("list")
            .add({ name, deskId })
            .then((docRef) => docRef.get())
            .then((doc) => dispatch(addColumn({ id: doc.id, ...doc.data() })))
            .catch(console.error)
    }
}

// Получение колонок
export const fetchColumns = (deskId) => {
    return (dispatch) => {
        const db = firebase.firestore()

        return db.collection("list")
            .where("deskId", "==", deskId)
            .get()
            .then((querySnapshot) => {
                const list = []

                querySnapshot.forEach((doc) => {
                    const { deskId, name } = doc.data()
                    list.push({
                        id: doc.id,
                        deskId,
                        name
                    })
                })

                return list
            })
            .then((list) => dispatch(setColumns(list)))
    }
}

// Удаление колонки
export const deleteColumn = (id) => {
    return (dispatch) => {
        const db = firebase.firestore()

        return db.collection("list")
            .doc(id)
            .delete()
            .then(() => dispatch(removeColumn(id)))
            .catch(console.error)
    }
}
