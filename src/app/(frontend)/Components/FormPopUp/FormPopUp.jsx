'use client'
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import styles from './FormPopUp.module.css'
import ContactForm from '../ContactForm/ContactForm'

export default function FormPopUp({ onClose }) {
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)

    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', handleKey)
    }
  }, [onClose])

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M1 1L17 17M17 1L1 17" stroke="#414141" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <ContactForm onSuccess={onClose} />
      </div>
    </div>,
    document.body
  )
}
