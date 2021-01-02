import React from 'react'

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            hasError: false,
            stack: null,
            message: null
        }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, stack: error, message: error.message }
    }

    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <h1>Упс! Пошло что-то не так...</h1>
                    <button type="button" onClick={() => window.location.reload()}>Перезагрузить</button>
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
