import React from "react"
import { View, Text, StyleSheet } from "react-native"



export default function AboutScreen() {

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Sobre o App</Text>

            <Text style={styles.paragraph}>
                FlexTime é o aplicativo mobile da Global Solution focada no{" "}
                futuro do trabalho híbrido e sustentável.
            </Text>

            <Text style={styles.paragraph}>
                Aqui o colaborador registra check-ins diários (local de trabalho e humor),
                organiza tarefas e acompanha relatórios simples de bem-estar
                e produtividade.
            </Text>

            <Text style={styles.sectionTitle}>Projeto</Text>

            <Text style={styles.paragraph}>
                Disciplina: Mobile Application Development{"\n"}
                Curso: FIAP{"\n"}
                Ano: 2025
            </Text>

            <Text style={styles.sectionTitle}>Equipe</Text>

            <Text style={styles.paragraph}>
                • Henrique Pecora – RM 556612{"\n"}
                • Livia de Oliveira – RM 556281{"\n"}
                • Santhiago de Gobbi – RM 98420
            </Text>

            <Text style={styles.sectionTitle}>Versão publicada</Text>

            <Text style={styles.paragraph}>
                Hash do commit de referência:{" "}
                <Text style={styles.hash}>abcdef123456</Text>
            </Text>

            <Text style={styles.caption}>
                Antes da entrega final, substitua o hash acima pelo resultado de{" "}
                {`git rev-parse HEAD`} do commit que foi publicado no Firebase
                App Distribution.
            </Text>

        </View>
    )
}



const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "#FFFFFF",
    },


    title: {
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 16,
    },


    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginTop: 16,
        marginBottom: 6,
    },


    paragraph: {
        fontSize: 14,
        color: "#444",
        lineHeight: 20,
    },


    hash: {
        fontWeight: "700",
    },


    caption: {
        marginTop: 16,
        fontSize: 12,
        color: "#777",
    },
})
