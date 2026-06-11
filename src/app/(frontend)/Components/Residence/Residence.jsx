'use client';
import React, { useEffect, useRef, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import styles from './Residence.module.css'
import one from './1.webp'
import two from './2.webp'
import three from './3.webp'
import four from './5.webp'
import five from './6.webp'
import Image from 'next/image'
import GlideArrow from '../Common/GlideArrow/GlideArrow'
import FormPopUp from '../FormPopUp/FormPopUp'

const Residence = () => {
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    breakpoints: {
      '(max-width: 640px)': { active: false },
    },
  })

  const sliderRef     = useRef(null)
  const leftArrowRef  = useRef(null)
  const rightArrowRef = useRef(null)

  const [popupOpen, setPopupOpen] = useState(false)


  const scrollByCard = (direction) => {
    const slider = sliderRef.current
    if (!slider) return
    const cards = Array.from(slider.children)
    if (!cards.length) return
    let currentIndex = 0
    let minDist = Infinity
    cards.forEach((card, i) => {
      const dist = Math.abs(card.offsetLeft - slider.scrollLeft)
      if (dist < minDist) { minDist = dist; currentIndex = i }
    })
    const targetIndex = direction > 0
      ? Math.min(cards.length - 1, currentIndex + 1)
      : Math.max(0, currentIndex - 1)
    slider.scrollTo({ left: cards[targetIndex].offsetLeft, behavior: 'smooth' })
  }

  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return

    const updateArrows = () => {
      const atStart = slider.scrollLeft <= 5
      const atEnd   = slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 5
      if (leftArrowRef.current) {
        leftArrowRef.current.style.opacity       = atStart ? '0.4' : '1'
        leftArrowRef.current.style.pointerEvents = atStart ? 'none' : 'auto'
      }
      if (rightArrowRef.current) {
        rightArrowRef.current.style.opacity       = atEnd ? '0.4' : '1'
        rightArrowRef.current.style.pointerEvents = atEnd ? 'none' : 'auto'
      }
    }

    updateArrows()
    slider.addEventListener('scroll', updateArrows)
    return () => slider.removeEventListener('scroll', updateArrows)
  }, [])

  return (
    <>
      <div className={styles.main}>
        <div className={styles.MainContainer}>
          <div className={styles.top}>
            <div className={styles.toptop}>
              <div className={styles.toptopleft}>
                <h3>Residence Redefined</h3>
                <p>
                  Our residences are sanctuaries of elegance, bespoke villas, apartments, and
                  interiors shaped by individuality, enriched with curated finishes, and perfected
                  through turnkey execution.
                </p>
              </div>
              <div className={styles.toptopright}>
                <svg
                  ref={leftArrowRef}
                  onClick={() => scrollByCard(-1)}
                  width="24" height="24" viewBox="0 0 24 24" fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="11.5" stroke="#8F8677" />
                  <path
                    d="M14.0137 17.842C14.2394 18.0526 14.6053 18.0527 14.8309 17.842C15.0564 17.6311 15.0564 17.2892 14.8309 17.0784L9.39496 12.0006L14.8309 6.92164C15.0564 6.71088 15.0563 6.36898 14.8309 6.15811C14.6053 5.94727 14.2394 5.94732 14.0137 6.15811L8.16916 11.6177C7.94354 11.8285 7.94368 12.1704 8.16916 12.3813L14.0137 17.842Z"
                    fill="#8F8677"
                  />
                </svg>
                <svg
                  ref={rightArrowRef}
                  onClick={() => scrollByCard(1)}
                  width="24" height="24" viewBox="0 0 24 24" fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="11.5" stroke="#8F8677" />
                  <path
                    d="M9.98626 17.842C9.76055 18.0526 9.39467 18.0527 9.16905 17.842C8.94365 17.6311 8.94365 17.2892 9.16905 17.0784L14.605 12.0006L9.16905 6.92164C8.94356 6.71088 8.94374 6.36898 9.16905 6.15811C9.39472 5.94727 9.76056 5.94732 9.98626 6.15811L15.8308 11.6177C16.0565 11.8285 16.0563 12.1704 15.8308 12.3813L9.98626 17.842Z"
                    fill="#8F8677"
                  />
                </svg>
              </div>
            </div>

            <div className={styles.viewport} ref={emblaRef}>
              <div className={styles.topbottom} ref={sliderRef}>
                <div className={styles.card}>
                  <Image src={one} alt="image" />
                  <h3>Nad al sheba villa</h3>
                </div>
                <div className={styles.card}>
                  <Image src={two} alt="image" />
                  <h3>Downtown grande signature</h3>
                </div>
                <div className={styles.card}>
                  <Image src={three} alt="image" />
                  <h3>Downtown apartment</h3>
                </div>
                <div className={styles.card}>
                  <Image src={four} alt="image" />
                  <h3>Burj View Residence</h3>
                </div>
                <div className={styles.card}>
                  <Image src={five} alt="image" />
                  <h3>Al Marsa Residence</h3>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.bottom}>
            <button className={styles.ctaee} onClick={() => setPopupOpen(true)}>
              <GlideArrow text="Enquire now" fillColor="#ffffff" />
            </button>
          </div>
        </div>
      </div>

      {popupOpen && <FormPopUp onClose={() => setPopupOpen(false)} />}
    </>
  )
}

export default Residence