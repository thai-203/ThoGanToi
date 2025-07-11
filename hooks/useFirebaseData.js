import { useState, useEffect } from "react"

export const useFirebaseData = (service, method, ...args) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        setError(null)
        const result = await service[method](...args)
        setData(result)
      } catch (err) {
        setError(err)
        console.error(`Error in ${method}:`, err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [service, method, ...args])

  const refetch = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await service[method](...args)
      setData(result)
    } catch (err) {
      setError(err)
      console.error(`Error in ${method}:`, err)
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, refetch }
}

export const useFirebaseListener = (service, method, callback, ...args) => {
  useEffect(() => {
    const unsubscribe = service[method](callback, ...args)
    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe()
      }
    }
  }, [service, method, callback, ...args])
}
