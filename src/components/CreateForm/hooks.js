import { useState } from 'react'

// Модификации формы
export const modes = {
    button: 'button',
    form: 'form'
}

// Статус поля ввода
export const statuses = {
    default: 'default',
    error: 'error'
}

export const useCreateForm = ({ onSubmit, onCancel, initialValue = '', initialMode = modes.button }) => {
    // Модификация компонента
    const [mode, setMode] = useState(initialMode)
    // Название нового элемента
    const [name, setName] = useState(initialValue)
    // Статус поля ввода названия элемента
    const [status, setStatus] = useState(statuses.default)

    // Сброс формы
    const resetForm = () => {
        onCancel && onCancel()
        setMode(modes.button)
        setName('')
        setStatus(statuses.default)
    }

    // Отправка формы
    const submitForm = (event) => {
        if (event) {
            event.preventDefault()
        }

        // Валидация данных
        if (name.trim().length <= 3) {
            setStatus(statuses.error)
            return
        }

        // Создание нового элемента
        onSubmit(name)
            .then(resetForm)
    }

    // Изменение модификации формы
    const setButtonMode = () => setMode(modes.button)
    const setFormMode = () => setMode(modes.form)

    // Контроль ввода данных
    const onInputChange = event => setName(event.target.value)

    // Проверка модификации формы
    const isButtonMode = mode === modes.button


    return { mode, name, status, resetForm, submitForm, setButtonMode, setFormMode, onInputChange, isButtonMode }
}
