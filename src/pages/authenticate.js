import { AuthenticationForm } from '@/components'
import { useRouter } from 'next/router'
import React from 'react'

// example url: domain-url/authenticate?type=[login || register] if null type === 'login'
function AuthPage() {
    const { query } = useRouter()
    const type = query?.type ? query.type : 'login'

    return (
        <AuthenticationForm {...{ type }} />
    )
}

export default AuthPage