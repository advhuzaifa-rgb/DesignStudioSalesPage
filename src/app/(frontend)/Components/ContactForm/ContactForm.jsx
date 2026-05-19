'use client'
import React, { useState, useEffect, useRef, useMemo } from 'react'
import styles from './ContactForm.module.css'

const COUNTRIES = [
  { label: 'United Arab Emirates', value: 'AE', dialCode: '+971' },
  { label: 'Afghanistan',          value: 'AF', dialCode: '+93'  },
  { label: 'Albania',              value: 'AL', dialCode: '+355' },
  { label: 'Algeria',              value: 'DZ', dialCode: '+213' },
  { label: 'Argentina',            value: 'AR', dialCode: '+54'  },
  { label: 'Armenia',              value: 'AM', dialCode: '+374' },
  { label: 'Australia',            value: 'AU', dialCode: '+61'  },
  { label: 'Austria',              value: 'AT', dialCode: '+43'  },
  { label: 'Azerbaijan',           value: 'AZ', dialCode: '+994' },
  { label: 'Bahrain',              value: 'BH', dialCode: '+973' },
  { label: 'Bangladesh',           value: 'BD', dialCode: '+880' },
  { label: 'Belarus',              value: 'BY', dialCode: '+375' },
  { label: 'Belgium',              value: 'BE', dialCode: '+32'  },
  { label: 'Brazil',               value: 'BR', dialCode: '+55'  },
  { label: 'Canada',               value: 'CA', dialCode: '+1'   },
  { label: 'Chile',                value: 'CL', dialCode: '+56'  },
  { label: 'China',                value: 'CN', dialCode: '+86'  },
  { label: 'Colombia',             value: 'CO', dialCode: '+57'  },
  { label: 'Croatia',              value: 'HR', dialCode: '+385' },
  { label: 'Czech Republic',       value: 'CZ', dialCode: '+420' },
  { label: 'Denmark',              value: 'DK', dialCode: '+45'  },
  { label: 'Egypt',                value: 'EG', dialCode: '+20'  },
  { label: 'Ethiopia',             value: 'ET', dialCode: '+251' },
  { label: 'Finland',              value: 'FI', dialCode: '+358' },
  { label: 'France',               value: 'FR', dialCode: '+33'  },
  { label: 'Germany',              value: 'DE', dialCode: '+49'  },
  { label: 'Ghana',                value: 'GH', dialCode: '+233' },
  { label: 'Greece',               value: 'GR', dialCode: '+30'  },
  { label: 'Hong Kong',            value: 'HK', dialCode: '+852' },
  { label: 'Hungary',              value: 'HU', dialCode: '+36'  },
  { label: 'India',                value: 'IN', dialCode: '+91'  },
  { label: 'Indonesia',            value: 'ID', dialCode: '+62'  },
  { label: 'Iran',                 value: 'IR', dialCode: '+98'  },
  { label: 'Iraq',                 value: 'IQ', dialCode: '+964' },
  { label: 'Ireland',              value: 'IE', dialCode: '+353' },
  { label: 'Israel',               value: 'IL', dialCode: '+972' },
  { label: 'Italy',                value: 'IT', dialCode: '+39'  },
  { label: 'Japan',                value: 'JP', dialCode: '+81'  },
  { label: 'Jordan',               value: 'JO', dialCode: '+962' },
  { label: 'Kazakhstan',           value: 'KZ', dialCode: '+7'   },
  { label: 'Kenya',                value: 'KE', dialCode: '+254' },
  { label: 'Kuwait',               value: 'KW', dialCode: '+965' },
  { label: 'Lebanon',              value: 'LB', dialCode: '+961' },
  { label: 'Libya',                value: 'LY', dialCode: '+218' },
  { label: 'Malaysia',             value: 'MY', dialCode: '+60'  },
  { label: 'Mexico',               value: 'MX', dialCode: '+52'  },
  { label: 'Morocco',              value: 'MA', dialCode: '+212' },
  { label: 'Netherlands',          value: 'NL', dialCode: '+31'  },
  { label: 'New Zealand',          value: 'NZ', dialCode: '+64'  },
  { label: 'Nigeria',              value: 'NG', dialCode: '+234' },
  { label: 'Norway',               value: 'NO', dialCode: '+47'  },
  { label: 'Oman',                 value: 'OM', dialCode: '+968' },
  { label: 'Pakistan',             value: 'PK', dialCode: '+92'  },
  { label: 'Palestine',            value: 'PS', dialCode: '+970' },
  { label: 'Peru',                 value: 'PE', dialCode: '+51'  },
  { label: 'Philippines',          value: 'PH', dialCode: '+63'  },
  { label: 'Poland',               value: 'PL', dialCode: '+48'  },
  { label: 'Portugal',             value: 'PT', dialCode: '+351' },
  { label: 'Qatar',                value: 'QA', dialCode: '+974' },
  { label: 'Romania',              value: 'RO', dialCode: '+40'  },
  { label: 'Russia',               value: 'RU', dialCode: '+7'   },
  { label: 'Saudi Arabia',         value: 'SA', dialCode: '+966' },
  { label: 'Serbia',               value: 'RS', dialCode: '+381' },
  { label: 'Singapore',            value: 'SG', dialCode: '+65'  },
  { label: 'South Africa',         value: 'ZA', dialCode: '+27'  },
  { label: 'South Korea',          value: 'KR', dialCode: '+82'  },
  { label: 'Spain',                value: 'ES', dialCode: '+34'  },
  { label: 'Sri Lanka',            value: 'LK', dialCode: '+94'  },
  { label: 'Sudan',                value: 'SD', dialCode: '+249' },
  { label: 'Sweden',               value: 'SE', dialCode: '+46'  },
  { label: 'Switzerland',          value: 'CH', dialCode: '+41'  },
  { label: 'Syria',                value: 'SY', dialCode: '+963' },
  { label: 'Taiwan',               value: 'TW', dialCode: '+886' },
  { label: 'Tanzania',             value: 'TZ', dialCode: '+255' },
  { label: 'Thailand',             value: 'TH', dialCode: '+66'  },
  { label: 'Tunisia',              value: 'TN', dialCode: '+216' },
  { label: 'Turkey',               value: 'TR', dialCode: '+90'  },
  { label: 'Uganda',               value: 'UG', dialCode: '+256' },
  { label: 'Ukraine',              value: 'UA', dialCode: '+380' },
  { label: 'United Kingdom',       value: 'GB', dialCode: '+44'  },
  { label: 'United States',        value: 'US', dialCode: '+1'   },
  { label: 'Venezuela',            value: 'VE', dialCode: '+58'  },
  { label: 'Vietnam',              value: 'VN', dialCode: '+84'  },
  { label: 'Yemen',                value: 'YE', dialCode: '+967' },
]

const PROJECT_TYPES = [
  { key: 'residential', label: 'Residential' },
  { key: 'hospitality', label: 'Hospitality' },
  { key: 'commercial',  label: 'Commercial'  },
]

function getFlagEmoji(code) {
  return code.toUpperCase().split('').map(c => String.fromCodePoint(0x1f1e6 - 65 + c.charCodeAt(0))).join('')
}

function useOutsideClick(ref, onClose) {
  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [ref, onClose])
}

function ChevronDown({ open }) {
  return (
    <svg
      className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}
      width="13" height="7" viewBox="0 0 13 7" fill="none"
    >
      <path d="M6.0625 6.75L12.1247 0H0.000322342L6.0625 6.75Z" fill="#414141" fillOpacity="0.5" />
    </svg>
  )
}

export default function ContactForm({ onSuccess }) {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    location: '', projectType: '', message: '',
  })
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0])
  const [dropdownOpen, setDropdownOpen]       = useState(false)
  const [searchTerm, setSearchTerm]           = useState('')
  const [projectOpen, setProjectOpen]         = useState(false)
  const [submitted, setSubmitted]             = useState(false)
  const [loading, setLoading]                 = useState(false)

  const dropdownRef = useRef(null)
  const projectRef  = useRef(null)
  const textareaRef = useRef(null)

  useOutsideClick(dropdownRef, () => setDropdownOpen(false))
  useOutsideClick(projectRef,  () => setProjectOpen(false))

  useEffect(() => {
    setForm(prev => ({ ...prev, phone: `${COUNTRIES[0].dialCode} ` }))
  }, [])

  useEffect(() => {
    setForm(prev => {
      const national = prev.phone.replace(/^\+\d+\s*/, '')
      return { ...prev, phone: `${selectedCountry.dialCode} ${national}`.trim() }
    })
  }, [selectedCountry])

  const filteredCountries = useMemo(
    () => COUNTRIES.filter(c => c.label.toLowerCase().includes(searchTerm.toLowerCase())),
    [searchTerm]
  )

  const isValid =
    form.firstName.trim() && form.lastName.trim() && form.email.trim() &&
    form.phone.trim().length > 4 && form.message.trim()

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'phone') {
      const dc  = selectedCountry.dialCode
      const raw = value.replace(/[^\d\s+]/g, '')
      const next = raw.startsWith(dc) ? raw : `${dc} ${raw.replace(/^\+?\d+\s*/, '')}`
      setForm(prev => ({ ...prev, phone: next }))
      return
    }
    if (name === 'message' && textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isValid) return
    setLoading(true)
    try {
      const res = await fetch('/api/contact-forms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName:   form.firstName.trim(),
          lastName:    form.lastName.trim(),
          email:       form.email.trim(),
          phone:       form.phone.trim(),
          location:    form.location.trim(),
          projectType: form.projectType || undefined,
          message:     form.message.trim(),
        }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err?.message || 'Submission failed')
      }
      setSubmitted(true)
      setForm({ firstName: '', lastName: '', email: '', phone: `${selectedCountry.dialCode} `, location: '', projectType: '', message: '' })
      if (textareaRef.current) textareaRef.current.style.height = 'auto'
      if (onSuccess) setTimeout(onSuccess, 2000)
      else setTimeout(() => setSubmitted(false), 4000)
    } catch (err) {
      console.error('Form submit error:', err)
      alert(err?.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.card}>
      <h2 className={styles.heading}>Ready to Transform Your Vision?</h2>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>

        <div className={styles.row}>
          <div className={styles.field}>
            <input name="firstName" className={styles.input} type="text"
              placeholder="First Name" value={form.firstName} onChange={handleChange} required />
            <span className={styles.line} />
          </div>
          <div className={styles.field}>
            <input name="lastName" className={styles.input} type="text"
              placeholder="Last Name" value={form.lastName} onChange={handleChange} required />
            <span className={styles.line} />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <input name="email" className={styles.input} type="email"
              placeholder="Email Address" value={form.email} onChange={handleChange} required />
            <span className={styles.line} />
          </div>

          <div className={styles.field}>
            <div className={styles.phoneWrap} ref={dropdownRef}>
              <button type="button" className={styles.flagBtn}
                onClick={() => setDropdownOpen(o => !o)} aria-label="Select country code">
                <span className={styles.flagEmoji}>{getFlagEmoji(selectedCountry.value)}</span>
                <ChevronDown open={dropdownOpen} />
              </button>
              <input name="phone" className={styles.phoneInput} type="tel"
                placeholder={`${selectedCountry.dialCode} __ __ __ __`}
                value={form.phone} onChange={handleChange} required />
              {dropdownOpen && (
                <div className={styles.dropdown}>
                  <input type="text" className={styles.dropdownSearch}
                    placeholder="Search country..." value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)} autoFocus />
                  <ul className={styles.dropdownList}>
                    {filteredCountries.map(c => (
                      <li key={c.value}
                        className={`${styles.dropdownItem} ${selectedCountry.value === c.value ? styles.dropdownItemActive : ''}`}
                        onClick={() => { setSelectedCountry(c); setDropdownOpen(false); setSearchTerm('') }}>
                        <span className={styles.itemFlag}>{getFlagEmoji(c.value)}</span>
                        <span className={styles.itemLabel}>{c.label}</span>
                        <span className={styles.itemDial}>{c.dialCode}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <span className={styles.line} />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <input name="location" className={styles.input} type="text"
              placeholder="Location" value={form.location} onChange={handleChange} />
            <span className={styles.line} />
          </div>

          <div className={styles.field}>
            <div className={styles.selectWrap} ref={projectRef}>
              <button type="button"
                className={`${styles.select} ${!form.projectType ? styles.selectPlaceholder : ''}`}
                onClick={() => setProjectOpen(o => !o)}>
                {form.projectType
                  ? PROJECT_TYPES.find(t => t.key === form.projectType)?.label
                  : 'Project Type'}
              </button>
              <ChevronDown open={projectOpen} />
              {projectOpen && (
                <div className={styles.dropdown} style={{ width: '100%' }}>
                  <ul className={styles.dropdownList}>
                    {PROJECT_TYPES.map(pt => (
                      <li key={pt.key}
                        className={`${styles.dropdownItem} ${form.projectType === pt.key ? styles.dropdownItemActive : ''}`}
                        onClick={() => { setForm(prev => ({ ...prev, projectType: pt.key })); setProjectOpen(false) }}>
                        <span className={styles.itemLabel}>{pt.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <span className={styles.line} />
          </div>
        </div>

        <div className={styles.fieldFull}>
          <textarea ref={textareaRef} name="message" className={styles.textarea}
            placeholder="Message" value={form.message} onChange={handleChange} required rows={1} />
          <span className={styles.line} />
        </div>

        <div className={styles.submitRow}>
          <button type="submit"
            className={`${styles.submitBtn} ${!isValid ? styles.submitBtnMuted : ''}`}
            disabled={!isValid || loading}>
            {loading ? 'Sending…' : (
              <>
                Submit
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M-0.00133734 6.66688L-0.00133727 5.17206L8.74139 5.17206L4.73431 1.06132L5.76886 -2.58748e-07L11.5391 5.91947L5.76886 11.8389L4.73431 10.7776L8.74139 6.66688L-0.00133734 6.66688Z" fill="white" />
                </svg>
              </>
            )}
          </button>
        </div>

        <div className={styles.statusRow} aria-live="polite">
          {submitted && <p className={styles.successMsg}>Thank you! We'll be in touch shortly.</p>}
        </div>

      </form>
    </div>
  )
}
