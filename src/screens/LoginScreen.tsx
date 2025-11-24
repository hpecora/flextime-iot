import { signInWithEmailAndPassword } from "firebase/auth"
import React, { useState } from "react"
import { Alert, Button, Text, TextInput, View } from "react-native"
import { auth } from "../services/firebase"

type LoginScreenProps = {
  navigation: any
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert("Atenção", "Preencha e-mail e senha.")
      return
    }

    try {
      setLoading(true)
      await signInWithEmailAndPassword(auth, email.trim(), password)
    } catch (error: any) {
      Alert.alert("Erro ao entrar", error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
      <Text style={{ fontSize: 32, textAlign: "center", marginBottom: 10 }}>
        FlexTime
      </Text>

      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 12,
          borderRadius: 6
        }}
      />

      <TextInput
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 12,
          borderRadius: 6
        }}
      />

      <Button
        title={loading ? "Entrando..." : "Entrar"}
        onPress={handleLogin}
      />

      <View style={{ marginTop: 20 }}>
        <Button
          title="Criar conta"
          onPress={() => navigation.navigate("Signup")}
        />
      </View>
    </View>
  )
}
