import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import './globals.css'
import Footer from './Components/Footer/Footer'
import Begin from './Components/Begin/Begin'
import TextBlock from './Components/TextBlock/TextBlock'
import OurEdge from './Components/OurEdge/OurEdge'
import Vision from './Components/Vision/Vision'
import Residence from './Components/Residence/Residence'
import Hospitality from './Components/Hospitality/Hospitality'
import Landing from './Components/Landing/Landing'


export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <>
    <Landing />
    <TextBlock />
    <Hospitality />
    <Residence />
    <OurEdge />
    {/* <Vision /> */}
    <Begin />
    <Footer />
    </>
  )
}
