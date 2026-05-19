'use client'
import React from 'react'
import styles from './Vision.module.css'
import Image from 'next/image'
import one from './1.png'
import two from './2.png'
import three from './3.png'
import four from './4.png'


const Vision = () => {
  

  return (
    <>
      <div className={styles.main}>
        <div className={styles.MainContainer}>
          <div className={styles.heading}>
            <h3>From vision to reality</h3>
          </div>
          <div className={styles.Cards}>
            <div className={styles.Cardone}>
              <div className={styles.CardOneTop}>
                <h3>Concept</h3>
                <h4>01</h4>
              </div>
              <div className={styles.CardOneBottom}>
                <Image src={one} alt="concept" className={styles.CardImg} />
              </div>
            </div>
            <div className={styles.CardTwo}>
              <div className={styles.CardTwoTop}>
                <h3>Material Selection</h3>
                <h4>02</h4>
              </div>
              <div className={styles.CardTwoBottom}>
                <Image src={two} alt="concept" className={styles.CardImg} />
              </div>
            </div>
            <div className={styles.CardThree}>
              <div className={styles.CardThreeTop}>
                <h3>Craftsmanship</h3>
                <h4>03</h4>
              </div>
              <div className={styles.CardThreeBottom}>
                <Image src={three} alt="concept" className={styles.CardImg} />
              </div>
            </div>
            <div className={styles.CardFour}>
              <div className={styles.CardFourTop}>
                <h3>Delivery & Installation</h3>
                <h4>04</h4>
              </div>
              <div className={styles.CardFourBottom}>
                <Image src={four} alt="concept" className={styles.CardImg} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Vision