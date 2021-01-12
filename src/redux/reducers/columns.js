import * as actionType from '../types'
import firebase from "firebase"
import { addColumn, removeColumn, setColumns } from "../actions"

const initialState = {
    columns: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        // Добавить колонку
        case actionType.ADD_COLUMN: {
            const columns = [...state.columns, action.column]

            return {
                ...state,
                columns
            }
        }

        // Изменить колонки
        case actionType.SET_COLUMNS: {
            return {
                ...state,
                columns: action.columns
            }
        }

        // Удалить колонку
        case actionType.REMOVE_COLUMN: {
            const columns = state.columns.filter(({ id }) => action.removeID !== id)

            return {
                ...state,
                columns
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
            .then((columns) => dispatch(setColumns(columns)))
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
