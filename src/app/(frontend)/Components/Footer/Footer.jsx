import React from 'react'
import styles from './Footer.module.css'
import one from './1.png'
import Image from 'next/image'


const Footer = () => {
  return (
    <>
    <div className={styles.main}>
        <div className={styles.MainContainer}>
            <div className={styles.top}>
                <div className={styles.topLeft}>
                    <Image src={one} alt="logo" />

                </div>
                <div className={styles.topRight}>
                    <div className={styles.One}>
                        <h4>Connect</h4>
                        <a href="tel:+971800888247">+971 800 888 247</a>
                        <a href="mailto:Info@alhuzaifaproperties.com">Info@alhuzaifaproperties.com</a>

                    </div>
                    <div className={styles.Two}>
                        <h4>Social links</h4>
                        <a href="https://www.instagram.com/alhuzaifadesignstudio/?hl=en" target="_blank" rel="noopener noreferrer">Instagram</a>
                        <a href="https://www.linkedin.com/company/al-huzaifa-furniture/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        <a href="https://www.facebook.com/p/Al-Huzaifa-Design-Studio-100076170074054/" target="_blank" rel="noopener noreferrer">Facebook</a>

                    </div>

                </div>

            </div>
            <div className={styles.bottom}>
                <p>Copyright © 2025 Al-Huzaifa</p>
                <h4>Crafted by <a href="http://integramagna.com/?utm_source=alhuzaifa-sales-page" target="_blank" rel="noopener noreferrer" className={styles.integraLink}>Integra Magna</a></h4>

            </div>

        </div>

    </div>
    </>
  )
}

export default Footer
