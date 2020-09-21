import React from 'react'
import styles from './SelectButton.module.css'

export default function SelectButton({ onSelect, isSelected, children }) {

    return (
        <div className={`button ${styles.selectButton} ${isSelected ? styles.active : ''}`} onClick={onSelect}> 
            {children || "Button"}
        </div>
    )

}