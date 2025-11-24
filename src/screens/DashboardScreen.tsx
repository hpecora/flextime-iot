import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { signOut } from "firebase/auth"
import React, { useCallback, useState } from "react"
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native"

import api, { CURRENT_USER_ID } from "../services/api"
import { auth } from "../services/firebase"

export default function DashboardScreen() {
  const navigation = useNavigation<any>()
  const [summary, setSummary] = useState({
    totalTasks: 0,
    totalCheckins: 0,
    lastMood: null as number | null,
  })
  const [loading, setLoading] = useState(true)

  async function loadData() {
    try {
      setLoading(true)

      const [tasksRes, checkinsRes] = await Promise.all([
        api.get(`/tasks/user/${CURRENT_USER_ID}`, {
          params: { page: 0, size: 100 },
        }),
        api.get(`/checkins/user/${CURRENT_USER_ID}`, {
          params: { page: 0, size: 100 },
        }),
      ])

      const totalTasks = tasksRes.data.content?.length ?? 0
      const totalCheckins = checkinsRes.data.content?.length ?? 0
      const checkins = checkinsRes.data.content ?? []
      const lastMood = checkins.length > 0 ? checkins[0].mood : null

      setSummary({ totalTasks, totalCheckins, lastMood })
    } catch (error: any) {
      console.log("ERRO CARREGAR DASHBOARD:", error.response?.data || error.message)
      Alert.alert("Erro", "Não foi possível carregar o resumo.")
    } finally {
      setLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadData()
    }, [])
  )

  async function handleLogout() {
    try {
      await signOut(auth)
    } catch (error: any) {
      console.log("ERRO LOGOUT:", error)
      Alert.alert("Erro", "Não foi possível sair da conta.")
    }
  }

  function handleAbout() {
    navigation.navigate("About" as never)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Text style={styles.subtitle}>Visão geral da sua rotina híbrida no FlexTime.</Text>

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 40 }} />
      ) : (
        <View style={styles.cardsContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Tarefas ativas</Text>
            <Text style={styles.cardValue}>{summary.totalTasks}</Text>
            <Text style={styles.cardHint}>Tarefas vinculadas ao seu usuário.</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Check-ins</Text>
            <Text style={styles.cardValue}>{summary.totalCheckins}</Text>
            <Text style={styles.cardHint}>Total de registros de local e humor.</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Último humor</Text>
            <Text style={styles.cardValue}>
              {summary.lastMood !== null ? summary.lastMood : "-"}
            </Text>
            <Text style={styles.cardHint}>Escala de 1 a 10 do último check-in.</Text>
          </View>
        </View>
      )}

      <View style={styles.footerButtons}>
        <TouchableOpacity style={styles.aboutButton} onPress={handleAbout}>
          <Text style={styles.aboutText}>Sobre o App</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Sair da conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#F5F5F5" },
  title: { fontSize: 28, fontWeight: "700", marginTop: 8, marginBottom: 4 },
  subtitle: { fontSize: 14, color: "#555", marginBottom: 24 },
  cardsContainer: { gap: 16 },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
  cardValue: { fontSize: 26, fontWeight: "700", marginBottom: 4 },
  cardHint: { fontSize: 12, color: "#777" },
  footerButtons: { marginTop: "auto", gap: 12 },
  aboutButton: {
    padding: 14,
    borderRadius: 10,
    backgroundColor: "#E0E0E0",
    alignItems: "center",
  },
  aboutText: { fontSize: 14, fontWeight: "600", color: "#333" },
  logoutButton: {
    padding: 14,
    borderRadius: 10,
    backgroundColor: "#D32F2F",
    alignItems: "center",
  },
  logoutText: { fontSize: 14, fontWeight: "600", color: "#FFF" },
})
