'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LoadingScreen } from '@/components/loading-screen'
import { LoadingProvider, useLoading } from '@/context/loading-context'

function PageContent({ children }: { children: React.ReactNode }) {
  const { isLoaded, setIsLoaded } = useLoading()
  const [showLoading, setShowLoading] = useState<boolean | null>(null)

  useEffect(() => {
    // Check sessionStorage only on client
    try {
      const hasVisited = sessionStorage.getItem('etny-visited')
      if (hasVisited) {
        setShowLoading(false)
        setIsLoaded(true)
      } else {
        setShowLoading(true)
      }
    } catch {
      setShowLoading(true)
    }
  }, [setIsLoaded])

  const handleComplete = () => {
    try { sessionStorage.setItem('etny-visited', '1') } catch {}
    setIsLoaded(true)
  }

  // Don't render anything until we know whether to show loading
  if (showLoading === null) return null

  return (
    <>
      {showLoading && (
        <LoadingScreen
          duration={2000}
          onComplete={handleComplete}
        />
      )}

      {isLoaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      )}
    </>
  )
}

export function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <LoadingProvider>
      <PageContent>{children}</PageContent>
    </LoadingProvider>
  )
}
