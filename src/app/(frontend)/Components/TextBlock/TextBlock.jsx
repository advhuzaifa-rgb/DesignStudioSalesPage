import React from 'react'
import styles from './TextBlock.module.css'

const TextBlock = () => {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.MainContainer}>
          <div className={styles.Top}>
            <p>
              At Al Huzaifa Design Studio, furniture, interiors, projects, and manufacturing come
              together under one roof. We deliver seamless turnkey solutions, from FF&E to full
              interior fit-outs, combining design expertise with in-house craftsmanship and
              state-of-the-art facilities, making us the trusted partner for residences,
              hospitality, and world-class commercial spaces.
            </p>
          </div>
          <div className={styles.Bottom}>
            <div className={styles.One}>
              <h3>50+</h3>
              <p>YEARS</p>
            </div>
            <div className={styles.One}>
              <h3>85,000+</h3>
              <p>CLIENTS</p>
            </div>
            <div className={styles.One}>
              <h3>350+</h3>
              <p>PROJECTS</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TextBlock
