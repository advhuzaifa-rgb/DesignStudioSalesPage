'use client'
import React, { useState } from 'react'
import styles from './Begin.module.css'
import one from './1.webp'
import Image from 'next/image'
import GlideArrow from '../Common/GlideArrow/GlideArrow'
import FormPopUp from '../FormPopUp/FormPopUp'

const Begin = () => {
  const [popupOpen, setPopupOpen] = useState(false)

  return (
    <>
      <div className={styles.Main}>
        <div className={styles.MainContainer}>
          <div className={styles.Left}>
            <div className={styles.LeftTop}>
              <h4>Begin Your Bespoke Journey</h4>
              <p>Every great space begins with a conversation. Allow us to craft yours.</p>
            </div>
            <button className={styles.ctaen} onClick={() => setPopupOpen(true)}>
              <GlideArrow text="Enquire now" fillColor="#ffffff" />
            </button>
          </div>
          <div className={styles.Right}>
            <Image src={one} alt="img" />
          </div>
        </div>
      </div>

      {popupOpen && <FormPopUp onClose={() => setPopupOpen(false)} />}
    </>
  )
}

export default Begin
