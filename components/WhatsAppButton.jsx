'use client';

import { useState } from 'react'
import { buildWhatsAppURL } from '../lib/products'

export default function WhatsAppButton({ product }) {
  const [quantity, setQuantity] = useState(1)
  const [variant, setVariant] = useState('')

  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value) || 1)
    setQuantity(value)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={(e) => {
          e.preventDefault()
          const whatsappURL = buildWhatsAppURL(product, quantity, variant)
          window.open(whatsappURL, '_blank')
        }}
        className="flex items-center justify-center w-14 h-14 bg-whatsapp rounded-full shadow-lg hover:bg-whatsapp/90 transition-transform transform hover:scale-105"
        aria-label="Commander sur WhatsApp"
      >
        <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.1 3.9C17.9 1.7 15 .5 12 .5S6.1 1.7 3.9 3.9 1.7 6.1 3.9 8.3 5 12.3 5 15c0 2.8 1.3 5.4 3.4 7.3l-1 2.2c-.4.9-.1 1.8.4 2.4l2.4.7c.6.2 1.2.2 1.8-.1l2.4-.7c1-.6 1.8-1.6 2.2-2.5l2.2-1.3c.4-.4.7-.9.7-1.5 0-.6-.2-1.2-.5-1.7l1.5-2.2c1-.9 1.8-2.2 2.1-3.6.1-.7.2-1.4.2-2.8 0-5.5-4.5-10-10-10S1 4.1 1 9.6c0 2.6 1 5 2.6 6.4l-.7 2.4c-.2.6-.1 1.2.2 1.8l2.4.7c.6.2 1.2.2 1.8-.1l2.4-.7c1.4-.7 2.7-1.2 4.2-1.2 2.6 0 5 1 6.8 2.8l1.5-2.3c.4-.4.9-.7 1.2-1 .3-.3.6-.6.9-.9l1.6-1.6c.6-.6 1.4-1.2 2.3-1.6.9-.4 1.9-.4 2.8.1z"/>
        </svg>
      </button>
    </div>
  )
}