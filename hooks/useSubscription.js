import { onCurrentUserSubscriptionUpdate} from '@stripe/firestore-stripe-payments'
import { useEffect, useState } from 'react'
import payments from '../lib/stripe'

function useSubscription(user) {
    const [subscription, setSubscription] = useState(null)

    useEffect(() => {
        if (!user) return

        onCurrentUserSubscriptionUpdate(payments, (snapshot) => {
            setSubscription(
                snapshot.subscriptions.filter(
                    (subscription) =>
                        subscription.status === 'active' ||
                        subscription.status === 'trialing'
                )[0]
            )
        })
    }, [user])

    return subscription
}

export default useSubscription