import firebase from "firebase"
import * as actionType from './types'
import { addColumn, changeColumn, removeColumn, setColumns } from "./actions"

const initialState = Object.freeze({
    list: []
})

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

        // Редактировать колонку
        case actionType.EDIT_COLUMN: {
            const list = state.list.map(col => col.id !== action.id ? col : { ...col, name: action.name })
            console.log(action)
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

        return db.collection("columns")
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

        return db.collection("columns")
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

        return db.collection("columns")
            .doc(id)
            .delete()
            .then(() => dispatch(removeColumn(id)))
            .catch(console.error)
    }
}

// Редактирование колонки
export const editColumn = (id, name) => {
    return (dispatch) => {
        const db = firebase.firestore()

        return db.collection("columns")
            .doc(id)
            .update({ name })
            .then(() => {
                dispatch({ type: actionType.EDIT_COLUMN_SUCCESS })
                dispatch(changeColumn(id, name))
            })
            .catch(() => dispatch({ type: actionType.EDIT_COLUMN_FAIL }))
    }
}
