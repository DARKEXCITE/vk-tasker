import React, { memo } from "react"
import { Button, Card, Div, FormLayout, Input } from "@vkontakte/vkui"
import { Icon16Add } from "@vkontakte/icons"
import PropTypes from 'prop-types'

import { modes, useCreateForm } from "./hooks"
import './CreateForm.css'

const CreateForm = ({ placeholder, actionTitle, onSubmit, initialValue, initialMode, onCancel }) => {
    const { name, status, resetForm, submitForm, setFormMode, onInputChange, isButtonMode } = useCreateForm({ onSubmit, onCancel, initialValue, initialMode })

    if (isButtonMode) {
        return (
            <Card size="l">
                <Button size="xl" mode="commerce" before={<Icon16Add />} onClick={setFormMode}>
                    { actionTitle }
                </Button>
            </Card>
        )
    }

    return (
        <Card size="l" mode="shadow">
            <FormLayout>
                <Input autoFocus value={name} onChange={onInputChange} status={status} placeholder={placeholder} />

                <Div className="CreateForm__buttons">
                    <Button stretched size="l" mode="commerce" before={<Icon16Add />} onClick={submitForm}>
                        { actionTitle }
                    </Button>
                    <Button stretched size="l" mode="tertiary" onClick={resetForm}>
                        Отмена
                    </Button>
                </Div>
            </FormLayout>
        </Card>
    )
}

CreateForm.defaultProps = {
    initialValue: '',
    initialMode: modes.button,
    onCancel: null
}

CreateForm.propTypes = {
    placeholder: PropTypes.string.isRequired,
    actionTitle: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
    initialValue: PropTypes.string,
    initialMode: PropTypes.string
}

export default memo(CreateForm)
