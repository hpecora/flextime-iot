import React, { createContext, useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { User, onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "..//services/firebase"

type AuthContextType = {
  user: User | null
  loading: boolean
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: async () => {}
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser)
        await AsyncStorage.setItem(
          "flextime_user",
          JSON.stringify({
            uid: firebaseUser.uid,
            email: firebaseUser.email
          })
        )
      } else {
        setUser(null)
        await AsyncStorage.removeItem("flextime_user")
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  async function logout() {
    await signOut(auth)
    setUser(null)
    await AsyncStorage.removeItem("flextime_user")
  }

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
