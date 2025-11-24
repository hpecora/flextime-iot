import { useFocusEffect } from "@react-navigation/native"
import React, { useCallback, useState } from "react"
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native"

import api, { CURRENT_USER_ID } from "../services/api"

export default function ReportsScreen() {
  const [data, setData] = useState({
    totalCheckins: 0,
    averageMood: null as number | null,
    homeCount: 0,
    officeCount: 0,
    remoteCount: 0,
  })

  // NOVO: estado para o texto de análise
  const [insight, setInsight] = useState<string | null>(null)

  const [loading, setLoading] = useState(true)

  async function loadReports() {
    try {
      setLoading(true)

      // check-ins (já existia)
      const response = await api.get(`/checkins/user/${CURRENT_USER_ID}`, {
        params: { page: 0, size: 200 },
      })

      const checkins = response.data.content ?? []
      const totalCheckins = checkins.length

      let averageMood: number | null = null
      let homeCount = 0
      let officeCount = 0
      let remoteCount = 0

      if (totalCheckins > 0) {
        const moodSum = checkins.reduce(
          (acc: number, item: any) => acc + (item.mood ?? 0),
          0
        )
        averageMood = Number((moodSum / totalCheckins).toFixed(1))

        homeCount = checkins.filter((c: any) => c.locationType === "HOME").length
        officeCount = checkins.filter((c: any) => c.locationType === "OFFICE").length
        remoteCount = checkins.filter((c: any) => c.locationType === "REMOTE").length
      }

      setData({ totalCheckins, averageMood, homeCount, officeCount, remoteCount })

      // NOVO: buscar a última análise (com resumoTexto vindo do Java)
      try {
        const reportResponse = await api.get(
          `/reports/user/${CURRENT_USER_ID}/last`
        )

        const resumo = reportResponse.data?.resumoTexto
        setInsight(resumo || null)
      } catch (innerError: any) {
        console.log(
          "ERRO CARREGAR INSIGHT:",
          innerError.response?.data || innerError.message
        )
        // se der erro, só não mostra o insight
        setInsight(null)
      }

    } catch (error: any) {
      console.log(
        "ERRO CARREGAR RELATORIOS:",
        error.response?.data || error.message
      )
      Alert.alert("Erro", "Não foi possível carregar os relatórios.")
    } finally {
      setLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadReports()
    }, [])
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relatórios Semanais</Text>
      <Text style={styles.subtitle}>
        Gráficos e estatísticas simples sobre seus check-ins.
      </Text>

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 40 }} />
      ) : (
        <>
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Resumo de humor</Text>

            <Text style={styles.line}>
              Total de check-ins:{" "}
              <Text style={styles.value}>{data.totalCheckins}</Text>
            </Text>

            <Text style={styles.line}>
              Média de humor:{" "}
              <Text style={styles.value}>
                {data.averageMood !== null ? data.averageMood : "-"}
              </Text>
            </Text>

            <View style={styles.separator} />

            <Text style={styles.sectionTitle}>Locais de trabalho</Text>

            <Text style={styles.line}>
              Casa: <Text style={styles.value}>{data.homeCount}</Text>
            </Text>

            <Text style={styles.line}>
              Escritório:{" "}
              <Text style={styles.value}>{data.officeCount}</Text>
            </Text>

            <Text style={styles.line}>
              Remoto: <Text style={styles.value}>{data.remoteCount}</Text>
            </Text>
          </View>

          <View style={[styles.card, { marginTop: 16 }]}>
            <Text style={styles.sectionTitle}>Insight da semana</Text>

            <Text style={styles.line}>
              {insight
                ? insight
                : "Nenhuma análise gerada ainda. Gere uma análise pelo sistema para ver as recomendações aqui."}
            </Text>
          </View>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#F5F5F5" },
  title: { fontSize: 24, fontWeight: "700", marginTop: 8, marginBottom: 4 },
  subtitle: { fontSize: 14, color: "#555", marginBottom: 24 },
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
  sectionTitle: { fontSize: 16, fontWeight: "600", marginBottom: 10 },
  line: { fontSize: 14, marginBottom: 6 },
  value: { fontWeight: "700" },
  separator: { height: 1, backgroundColor: "#EEE", marginVertical: 16 },
})
