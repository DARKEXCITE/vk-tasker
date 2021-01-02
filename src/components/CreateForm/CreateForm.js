import React, { useState } from "react"
import { Button, Card, Div, FormLayout, Input } from "@vkontakte/vkui"
import { Icon16Add } from "@vkontakte/icons"
import PropTypes from 'prop-types'

import {modes, statuses} from "../App/constants"
import './CreateForm.css'

const CreateForm = ({ placeholder, actionTitle, onSubmit }) => {
    // Модификация компонента
    const [formMode, setFormMode] = useState(modes.button)
    // Название нового элемента
    const [formItemName, setFormItemName] = useState('')
    // Статус поля ввода названия элемента
    const [formStatus, setFormStatus] = useState(statuses.default)

    // Сброс формы
    const resetForm = () => {
        setFormStatus(statuses.default)
        setFormMode(modes.button)
        setFormItemName('')
    }

    // Отправка формы
    const submitForm = () => {
        if (formItemName.trim().length <= 3) {
            setFormStatus(statuses.error)
            return
        }

        // Создание нового элемента
        onSubmit(formItemName)
            .then(resetForm)
    }

    if (formMode === modes.button) {
        return (
            <Card size="l">
                <Button size="xl" mode="commerce" before={<Icon16Add />} onClick={() => { setFormMode(modes.form) }}>
                    { actionTitle }
                </Button>
            </Card>
        )
    }

    return (
        <Card size="l" mode="shadow">
            <FormLayout>
                <Input
                    autoFocus
                    value={formItemName}
                    onChange={e => { setFormItemName(e.target.value) }}
                    status={formStatus}
                    placeholder={placeholder}
                />

                <Div className="CreateForm__buttons">
                    <Button
                        stretched
                        size="l"
                        mode="commerce"
                        before={<Icon16Add />}
                        onClick={submitForm}
                    >
                        { actionTitle }
                    </Button>
                    <Button
                        stretched
                        size="l"
                        mode="tertiary"
                        onClick={resetForm}
                    >
                        Отмена
                    </Button>
                </Div>
            </FormLayout>
        </Card>
    )
}

CreateForm.propTypes = {
    placeholder: PropTypes.string.isRequired,
    actionTitle: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
}

export default CreateForm
