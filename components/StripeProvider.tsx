"use client"

import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { ReactNode } from 'react'

// Get Stripe publishable key
const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''

// Load Stripe outside of component to avoid recreating on every render
// Only load if key is provided
const stripePromise = stripePublishableKey 
    ? loadStripe(stripePublishableKey)
    : null

// Warn if Stripe key is missing (only in development)
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development' && !stripePublishableKey) {
    console.warn('⚠️ NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set. Stripe payments will not work.')
    console.warn('   Add it to your .env.local file. Get your key from: https://dashboard.stripe.com/apikeys')
}

interface StripeProviderProps {
    children: ReactNode
    clientSecret?: string
}

export default function StripeProvider({ children, clientSecret }: StripeProviderProps) {
    const options = clientSecret ? {
        clientSecret,
        appearance: {
            theme: 'stripe' as const,
            variables: {
                colorPrimary: '#1a1a2e',
                colorBackground: '#ffffff',
                colorText: '#1a1a2e',
                colorDanger: '#df1b41',
                fontFamily: 'system-ui, sans-serif',
                spacingUnit: '4px',
                borderRadius: '12px',
            },
            rules: {
                '.Input': {
                    border: '2px solid #e5e5e5',
                    boxShadow: 'none',
                    padding: '12px 16px',
                },
                '.Input:focus': {
                    border: '2px solid #1a1a2e',
                    boxShadow: '0 0 0 2px rgba(26, 26, 46, 0.1)',
                },
                '.Label': {
                    fontWeight: '600',
                    marginBottom: '8px',
                },
            },
        },
    } : undefined

    if (!clientSecret) {
        // Return children without Elements wrapper when no clientSecret
        return <>{children}</>
    }

    if (!stripePromise) {
        console.error('Stripe is not configured. NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is missing.')
        return <>{children}</>
    }

    return (
        <Elements stripe={stripePromise} options={options}>
            {children}
        </Elements>
    )
}
