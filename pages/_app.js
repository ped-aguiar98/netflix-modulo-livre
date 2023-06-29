import { AuthProvider } from '@/hooks/useAuth'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {

  return (
    <AuthProvider> 
      <Component {...pageProps} />
    </AuthProvider>)
}
