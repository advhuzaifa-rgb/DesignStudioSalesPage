import React from 'react'
import styles from './OurEdge.module.css'
import oneimg from './1.webp'
import twoimg from './2.webp'
import Image from 'next/image'

const OurEdge = () => {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.MainContainer}>
          <div className={styles.One}>
            <div className={styles.top}>
              <Image src={oneimg} alt="img" />
            </div>
            <div className={styles.bottom}>
              <h3>Our Edge</h3>
              <div className={styles.desc}>
                <h4>Craftsmanship, Precision, Reliability</h4>
                <p>
                  Al Huzaifa’s integrated ecosystem of 20 designers, 200+ artisans, and advanced
                  facilities ensures precision, uncompromising quality, and on-time delivery, every
                  project a testament to artistry and trust.
                </p>
              </div>
            </div>
          </div>
          <div className={styles.One}>
            <div className={styles.top}>
              <Image src={twoimg} alt="img" />
            </div>
            <div className={styles.bottom}>
              <h3>Services</h3>
              <div className={styles.desc}>
                <h4>End-to-End Turnkey Excellence</h4>
                <p>
                  Interior Design & Concept Development, Custom Furniture & Joinery, Customised
                  closets, FF&E (Furniture, Fixtures & Equipment), Turnkey Project Management &
                  Execution, Fit-Out & Installation, Wallpapers, Curtains & Furnishings
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OurEdge
