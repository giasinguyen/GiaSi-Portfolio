import { memo } from 'react'
import { motion } from 'framer-motion'

// Optimized lazy fallback component for mobile performance
const LazyFallback = memo(({ message = "Loading..." }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Simplified spinner for better performance */}
        <div className="w-12 h-12 border-2 border-slate-700/50 border-t-blue-400 rounded-full animate-spin mx-auto mb-4"></div>
        
        {/* Loading message */}
        <motion.p
          className="text-slate-300 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {message}
        </motion.p>
      </motion.div>
    </div>
  )
})

LazyFallback.displayName = 'LazyFallback'

export default LazyFallback
