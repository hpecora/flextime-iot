import { createUserWithEmailAndPassword } from "firebase/auth"
import React, { useState } from "react"
import { Alert, Button, Text, TextInput, View } from "react-native"
import { auth } from "../services/firebase"

export default function SignupScreen() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSignup() {
    if (!email || !password) {
      Alert.alert("Atenção", "Preencha todos os campos.")
      return
    }

    if (password.length < 6) {
      Alert.alert("Senha muito curta", "Use pelo menos 6 caracteres.")
      return
    }

    try {
      setLoading(true)
      await createUserWithEmailAndPassword(auth, email.trim(), password)
      Alert.alert("Conta criada!", "Você já pode fazer login.")
    } catch (error: any) {
      Alert.alert("Erro ao cadastrar", error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
      <Text style={{ fontSize: 26, textAlign: "center", marginBottom: 20 }}>
        Criar Conta
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
        title={loading ? "Cadastrando..." : "Cadastrar"}
        onPress={handleSignup}
      />
    </View>
  )
}
