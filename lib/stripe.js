import { createCheckoutSession, getStripePayments } from '@stripe/firestore-stripe-payments'
import { getFunctions, httpsCallable } from '@firebase/functions'
import app from '../firebase'


const payments = getStripePayments(app, {
    productsCollection: 'products',
    customersCollection: 'customers',
})

export const loadCheckout = async (priceId) => {
    await createCheckoutSession(payments, {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin
    })
        .then((snapshot) => window.location.assign(snapshot.url))
        .catch((error) => console.log(error.message))
}

export const goToBillingPortal = async () => {
    const instance = getFunctions(app, 'southamerica-east1')
    const functionRef = httpsCallable(
      instance,
      'ext-firestore-stripe-payments-createPortalLink'
    )
  
    await functionRef({
      returnUrl: `${window.location.origin}/account`,
    })
      .then((data)=> { window.location.assign(data.data.url)})
      .catch((error) => console.log(error.message))
}

export default payments
