import { AuthProvider } from '@/hooks/useAuth'
import '@/styles/globals.css'
import { RecoilRoot } from 'recoil'

export default function App({ Component, pageProps }) {

  return (
    <RecoilRoot>
      <AuthProvider> 
        <Component {...pageProps} />
      </AuthProvider>
    </RecoilRoot>
    )
}
