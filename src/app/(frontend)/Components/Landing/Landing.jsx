'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import styles from './Landing.module.css'
import logo from './logo.png'
import ContactForm from '../ContactForm/ContactForm'
import FormPopUp from '../FormPopUp/FormPopUp'

export default function Landing() {
  const [popupOpen, setPopupOpen] = useState(false)

  return (
    <>
      <div className={styles.main}>
        <div className={styles.container}>

          <div className={styles.left}>
            <Image
              src={logo}
              alt="Al Huzaifa Design Studio"
              className={styles.logo}
            />
            <div className={styles.content}>
              <h1 className={styles.heading}>
            Crafting Your Signature Style Beyond Bespoke 
              </h1>
              <p className={styles.desc}>
          Interiors for residences and landmark commercial spaces, where precision, elegance, and enduring value.
              </p>
              <button
                className={styles.mobileCta}
                onClick={() => setPopupOpen(true)}
              >
               Book a Free Consultation
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M-0.00133734 6.66688L-0.00133727 5.17206L8.74139 5.17206L4.73431 1.06132L5.76886 -2.58748e-07L11.5391 5.91947L5.76886 11.8389L4.73431 10.7776L8.74139 6.66688L-0.00133734 6.66688Z" fill="#414141" />
                </svg>
              </button>
            </div>
          </div>

          <div className={styles.right}>
            <ContactForm />
          </div>

        </div>
      </div>

      {popupOpen && <FormPopUp onClose={() => setPopupOpen(false)} />}
    </>
  )
}
