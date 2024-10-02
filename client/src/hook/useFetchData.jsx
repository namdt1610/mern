import { useState, useEffect } from 'react'

const useFetchData = (url, dispatch, actionType, extractData, extractTotal) => {
  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url)
        const result = await response.json()
        // Log the entire API response for debugging
        console.log('API Response:', result)

        if (response.ok) {
          const extractedData = extractData(result)
          const extractedTotal = extractTotal(result)

          if (extractedData && extractedTotal !== undefined) {
            setData(extractedData)
            setTotal(extractedTotal)
            dispatch({ type: actionType, payload: extractedData })
          } else {
            throw new Error('Invalid API response structure')
          }
        } else {
          throw new Error(result.message || 'Failed to fetch data')
        }
      } catch (err) {
        setError(err.message)
        console.error('Fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, total, loading, error }
}

export default useFetchData
