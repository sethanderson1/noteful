import React from 'react'
import './ErrorBoundary.css'

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
        }
    }
    static getDerivedStateFromError(error) {
        return {
            hasError: true,
        }
    }
    render() {
        if (this.state.hasError) {
            // console.log('this.state.hasError', this.state.hasError)

            return <p className="error_message">something went wrong</p>
        }
        return this.props.children
    }
}

export default ErrorBoundary;