'use client'
import React from 'react'
import styles from './GlideArrow.module.css'

const ARROW_PATH =
  'M-0.000266354 6.66688L-0.000266292 5.17206L8.59516 5.17206L4.65559 1.06132L5.67272 -2.58748e-07L11.3457 5.91947L5.67272 11.8389L4.65559 10.7776L8.59516 6.66688L-0.000266354 6.66688Z'

const GlideArrow = ({ text, className = '', fillColor = '#ffffff' }) => {
  return (
    <div className={`${styles.glideContainer} ${className}`}>
      <svg
        className={styles.arrowBehind}
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        aria-hidden="true"
      >
        <path d={ARROW_PATH} fill={fillColor} />
      </svg>

      <span className={styles.text}>{text}</span>

      <svg
        className={styles.arrowFront}
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        aria-hidden="true"
      >
        <path d={ARROW_PATH} fill={fillColor} />
      </svg>
    </div>
  )
}

export default GlideArrow
