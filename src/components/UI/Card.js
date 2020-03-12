import React from 'react'
import './Card.module.css'

export default function Card(props) {
    return (
        <div className="card">
            {props.children}
        </div>
    )
}
