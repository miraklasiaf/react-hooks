import React from 'react'
import Card from './UI/Card';
import './Auth.css';

export default function Auth() {
    const handleLogin = () => {}

    return (
        <div className="auth">
            <Card>
                <h2>You are not authenticated!</h2>
                <p>Please log in to continue.</p>
                <button onClick={handleLogin}>Log In</button>
            </Card>
        </div>
    )
}
