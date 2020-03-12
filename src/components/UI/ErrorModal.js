import React from 'react'

export default function ErrorModal(props) {
    return (
        <>
            <div className="backdrop" onClick={props.onClose} />
            <div className="error-modal">
                <h2>An Error Occurred!</h2>
                <p>{props.children}</p>
                <div className="error-modal__actions">
                    <button type="button" onClick={props.onClose}>
                        Okay
                    </button>
                </div>
            </div>
        </>
    )
}
