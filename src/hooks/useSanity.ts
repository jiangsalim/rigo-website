'use client'

import { useState, useEffect } from 'react'
import { sanityClient } from '@/lib/sanity.client'

export function useSanity<T = any>(query: string, params?: Record<string, any>) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let mounted = true

    async function fetchData() {
      try {
        setLoading(true)
        const result = await sanityClient.fetch(query, params)
        if (mounted) {
          setData(result)
          setError(null)
        }
      } catch (err) {
        if (mounted) {
          setError(err as Error)
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      mounted = false
    }
  }, [query, JSON.stringify(params)])

  return { data, loading, error }
}