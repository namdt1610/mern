import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export function useSignup() {
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState()
    const { dispatch } = useAuthContext()

    const signup = async (email, password) => {
        setIsLoading(true)
        setError(null)

        // register proxy before declare this
        const respone = await fetch('api/user/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })

        const json = await respone.json()

        if (!respone.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if (respone.ok) {
            // Save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))
            // Update the auth context
            dispatch({ type: 'LOGIN' })
        }
    }
    return { error, isLoading, signup }
}
