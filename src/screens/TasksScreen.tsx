// src/screens/TasksScreen.tsx
import React, { useEffect, useState } from "react"
import {
    ActivityIndicator,
    Alert,
    Button,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native"
import api from "../services/api"

type Task = {
  id: number
  userId: number
  title: string
  description: string
  status: string
  dueDate: string | null
  createdAt?: string
}

const FIXED_USER_ID = 1

export default function TasksScreen() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [loading, setLoading] = useState(false)

  async function loadTasks() {
    try {
      setLoading(true)

      const response = await api.get("/tasks/user/" + FIXED_USER_ID, {
        params: { page: 0, size: 20, sort: "id,asc" }
      })

      const content: Task[] = response.data.content || []
      setTasks(content)
    } catch (error: any) {
      console.log("ERRO LISTAR TAREFAS:", error?.response?.data || error.message)
      Alert.alert("Erro", "Não foi possível carregar as tarefas.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTasks()
  }, [])

  async function handleAddTask() {
    if (!title.trim()) {
      Alert.alert("Atenção", "Informe um título para a tarefa.")
      return
    }

    const payload = {
      userId: FIXED_USER_ID,
      title: title.trim(),
      description: description.trim(),
      status: "PENDENTE",
      dueDate: dueDate ? dueDate : null
    }

    try {
      setLoading(true)
      await api.post("/tasks", payload)

      setTitle("")
      setDescription("")
      setDueDate("")

      await loadTasks()
    } catch (error: any) {
      console.log("ERRO CRIAR TAREFA:", error?.response?.data || error.message)
      Alert.alert("Erro", "Não foi possível criar a tarefa.")
    } finally {
      setLoading(false)
    }
  }

  async function handleToggleStatus(task: Task) {
    const newStatus = task.status === "CONCLUIDA" ? "PENDENTE" : "CONCLUIDA"

    const payload = {
      title: task.title,
      description: task.description,
      status: newStatus,
      dueDate: task.dueDate
    }

    try {
      setLoading(true)
      await api.put(`/tasks/${task.id}`, payload)
      await loadTasks()
    } catch (error: any) {
      console.log("ERRO ATUALIZAR TAREFA:", error?.response?.data || error.message)
      Alert.alert("Erro", "Não foi possível atualizar a tarefa.")
    } finally {
      setLoading(false)
    }
  }

  async function handleDeleteTask(id: number) {
    try {
      setLoading(true)
      await api.delete(`/tasks/${id}`)
      await loadTasks()
    } catch (error: any) {
      console.log("ERRO EXCLUIR TAREFA:", error?.response?.data || error.message)
      Alert.alert("Erro", "Não foi possível excluir a tarefa.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tarefas</Text>
      <Text style={styles.subtitle}>CRUD via API Java (Global Solution)</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Título da tarefa</Text>
        <TextInput
          placeholder="Ex.: Planejar agenda da semana"
          placeholderTextColor="#999"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />

        <Text style={styles.label}>Descrição (opcional)</Text>
        <TextInput
          placeholder="Detalhes, entregas, responsáveis..."
          placeholderTextColor="#999"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
        />

        <Text style={styles.label}>Data limite (AAAA-MM-DD) – opcional</Text>
        <TextInput
          placeholder="Ex.: 2025-11-30"
          placeholderTextColor="#999"
          value={dueDate}
          onChangeText={setDueDate}
          style={styles.input}
        />

        <Button title="Adicionar tarefa" onPress={handleAddTask} />
      </View>

      {loading && <ActivityIndicator style={{ marginTop: 16 }} />}

      <FlatList
        data={tasks}
        keyExtractor={(item) => String(item.id)}
        style={{ marginTop: 24 }}
        ListEmptyComponent={
          !loading ? (
            <Text style={styles.empty}>Nenhuma tarefa cadastrada ainda.</Text>
          ) : null
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            {item.description ? (
              <Text style={styles.cardText}>{item.description}</Text>
            ) : null}

            <Text style={styles.cardText}>
              Status: {item.status === "CONCLUIDA" ? "Concluída" : "Pendente"}
            </Text>

            {item.dueDate && (
              <Text style={styles.cardText}>Prazo: {item.dueDate}</Text>
            )}

            <View style={styles.cardButtons}>
              <Button
                title={
                  item.status === "CONCLUIDA"
                    ? "Marcar como pendente"
                    : "Concluir"
                }
                onPress={() => handleToggleStatus(item)}
              />

              <Button
                title="Excluir"
                color="red"
                onPress={() => handleDeleteTask(item.id)}
              />
            </View>
          </View>
        )}
      />
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
  form: { gap: 6 },
  label: {
    fontSize: 13,
    marginTop: 4,
    marginBottom: 2
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 4
  },
  empty: {
    textAlign: "center",
    marginTop: 16
  },
  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4
  },
  cardText: {
    fontSize: 14
  },
  cardButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    gap: 8
  }
})
