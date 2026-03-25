'use client'

import { motion } from 'framer-motion'
import { LoadingScreen } from '@/components/loading-screen'
import { LoadingProvider, useLoading } from '@/context/loading-context'

function PageContent({ children }: { children: React.ReactNode }) {
  const { isLoaded, setIsLoaded } = useLoading()

  return (
    <>
      <LoadingScreen
        duration={2000}
        onComplete={() => setIsLoaded(true)}
      />

      {isLoaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
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
