import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User,} from 'firebase/auth'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { auth } from '../firebase'

const AuthContext = createContext({
    user: null,
    signUp: async () => {},
    signIn: async () => {},
    logout: async () => {},
    error: null,
    loading: false,
})

export const AuthProvider = ({children}) =>{
    
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null) 
    const [error, setError] = useState(null)
    const [initialLoading, setInitialLoading] = useState(true)
    const router = useRouter()

    useEffect(
        () =>
          onAuthStateChanged(auth, (user) => {
            if (user) {
              setUser(user)
              setLoading(false)
            } else {
              setUser(null)
              setLoading(true)
              router.push('/login')
            }
            setInitialLoading(false)
          }),
        [auth]
    )

    //Cria um conta
    const signUp = async (email, password) => {
        console.log(email)
        setLoading(true)
    
        await createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            setUser(userCredential.user)
            router.push('/')
            setLoading(false)
          })
          .catch((error) => alert(error.message))
          .finally(() => setLoading(false))
      }


    //Logo um conta
    const signIn = async (email, password) => {
        
        setLoading(true)
        console.log(email)
        await signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            setUser(userCredential.user)
            router.push('/')
            setLoading(false)
          })
        .catch((error) => alert(error.message))
        .finally(() => setLoading(false))
      }

    //Saio da conta
    const logout = async () => {
        setLoading(true)
    
        signOut(auth)
          .then(() => {
            setUser(null)
        })
        .catch((error) => alert(error.message))
        .finally(() => setLoading(false))
    }

    const memoedValue = useMemo(
        () => ({
          user,
          signUp,
          signIn,
          loading,
          logout,
          error,
        }),
        [user, loading]
    )

    return(
        <AuthContext.Provider value={memoedValue}>
            {!initialLoading && children}
        </AuthContext.Provider>
    )
  }
  
  export default function useAuth() {
    return useContext(AuthContext)
  }