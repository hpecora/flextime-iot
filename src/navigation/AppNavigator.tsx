import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useContext } from "react"
import { ActivityIndicator, View } from "react-native"

import AboutScreen from "../screens/AboutScreen"
import CheckinScreen from "../screens/CheckinScreen"
import DashboardScreen from "../screens/DashboardScreen"
import LoginScreen from "../screens/LoginScreen"
import ReportsScreen from "../screens/ReportsScreen"
import SignupScreen from "../screens/SignupScreen"
import TasksScreen from "../screens/TasksScreen"

import { AuthContext } from "../contexts/AuthContext"

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Checkins" component={CheckinScreen} />
      <Tab.Screen name="Tarefas" component={TasksScreen} />
      <Tab.Screen name="Relatorios" component={ReportsScreen} />
    </Tab.Navigator>
  )
}

export default function AppNavigator() {
  const { user, loading } = useContext(AuthContext)

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <NavigationContainer>
      {user ? (
        // Stack quando o usuário está autenticado
        <Stack.Navigator>
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="About"
            component={AboutScreen}
            options={{ title: "Sobre o App" }}
          />
        </Stack.Navigator>
      ) : (
        // Stack de autenticação (login / cadastro)
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{ title: "Criar conta" }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  )
}
