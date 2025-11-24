// src/screens/CheckinScreen.tsx
import React, { useEffect, useState } from "react"
import {
    ActivityIndicator,
    Alert,
    Button,
    StyleSheet,
    Text,
    View
} from "react-native"
import api from "../services/api"

type Checkin = {
  id: number
  userId: number
  date: string
  locationType: string
  mood: number
}

const FIXED_USER_ID = 1

export default function CheckinScreen() {
  const [location, setLocation] = useState<"HOME" | "OFFICE" | "REMOTE">("HOME")
  const [mood, setMood] = useState<number>(3)
  const [loading, setLoading] = useState(false)
  const [checkins, setCheckins] = useState<Checkin[]>([])

  async function loadCheckins() {
    try {
      setLoading(true)

      const response = await api.get("/checkins/user/" + FIXED_USER_ID, {
        params: { page: 0, size: 20, sort: "date,desc" }
      })

      const content: Checkin[] = response.data.content || []
      setCheckins(content)
    } catch (error: any) {
      console.log("ERRO LISTAR CHECKINS:", error?.response?.data || error.message)
      Alert.alert("Erro", "Não foi possível carregar os check-ins.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCheckins()
  }, [])

  async function handleCreateCheckin() {
    const today = new Date().toISOString().split("T")[0] // AAAA-MM-DD

    // Mandando as duas formas de campo de local, para garantir compat:
    // locationType (como vem no GET) e location (em alguns DTOs)
    const payload: any = {
      userId: FIXED_USER_ID,
      date: today,
      locationType: location,
      location: location,
      mood
    }

    try {
      setLoading(true)
      await api.post("/checkins", payload)
      await loadCheckins()
    } catch (error: any) {
      const backendError = error?.response?.data
      console.log("ERRO CRIAR CHECKIN:", backendError || error.message)

      Alert.alert(
        "Erro",
        backendError
          ? `Não foi possível registrar o check-in.\n\nDetalhe: ${JSON.stringify(
              backendError
            )}`
          : "Não foi possível registrar o check-in."
      )
    } finally {
      setLoading(false)
    }
  }

  function handleIncreaseMood() {
    setMood((prev) => (prev < 10 ? prev + 1 : 10)) // deixei 1 a 10
  }

  function handleDecreaseMood() {
    setMood((prev) => (prev > 1 ? prev - 1 : 1))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Check-in Diário</Text>
      <Text style={styles.subtitle}>
        Registre local de trabalho e humor (1 a 10).
      </Text>

      <Text style={styles.sectionTitle}>Local</Text>
      <View style={styles.row}>
        <Button
          title="Casa"
          onPress={() => setLocation("HOME")}
          color={location === "HOME" ? "#007AFF" : "#999"}
        />
        <Button
          title="Escritório"
          onPress={() => setLocation("OFFICE")}
          color={location === "OFFICE" ? "#007AFF" : "#999"}
        />
        <Button
          title="Remoto"
          onPress={() => setLocation("REMOTE")}
          color={location === "REMOTE" ? "#007AFF" : "#999"}
        />
      </View>

      <Text style={styles.sectionTitle}>Humor (1 a 10)</Text>
      <View style={styles.row}>
        <Button title="-" onPress={handleDecreaseMood} />
        <Text style={styles.moodValue}>{mood}</Text>
        <Button title="+" onPress={handleIncreaseMood} />
      </View>

      <View style={{ marginTop: 16 }}>
        <Button title="Registrar check-in" onPress={handleCreateCheckin} />
      </View>

      {loading && <ActivityIndicator style={{ marginTop: 16 }} />}

      <View style={{ marginTop: 24 }}>
        <Text style={styles.sectionTitle}>Últimos check-ins</Text>

        {checkins.length === 0 && !loading && (
          <Text style={styles.empty}>Nenhum check-in registrado ainda.</Text>
        )}

        {checkins.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.cardTitle}>{item.date}</Text>
            <Text style={styles.cardText}>
              Local:{" "}
              {item.locationType === "HOME"
                ? "Casa"
                : item.locationType === "OFFICE"
                ? "Escritório"
                : "Remoto"}
            </Text>
            <Text style={styles.cardText}>Humor: {item.mood}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 8
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 16,
    marginTop: 4
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8
  },
  moodValue: {
    fontSize: 20,
    fontWeight: "700",
    marginHorizontal: 16
  },
  empty: {
    marginTop: 8,
    textAlign: "center"
  },
  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginTop: 8
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600"
  },
  cardText: {
    fontSize: 14
  }
})
