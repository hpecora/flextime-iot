# 🌐 FlexTime IoT

## 🧭 Visão Geral
O **FlexTime IoT** é uma aplicação integrada de **Inteligência Artificial**, **IoT** e **Mobile**, desenvolvida para ajudar empresas e colaboradores a equilibrar produtividade, foco e bem-estar no modelo de trabalho híbrido.  
O sistema coleta dados de check-ins diários, analisa humor e local de trabalho, e gera relatórios com insights personalizados gerados por IA generativa.

---

## 🧠 Inteligência Artificial
O backend utiliza um microserviço com **IA generativa (GPT)**, integrado via API, para interpretar padrões de humor e comportamento com base nos check-ins registrados pelo usuário.  
A IA gera recomendações sobre horários de pico de produtividade, equilíbrio entre home office e escritório, e dicas para preservar o bem-estar.

**Exemplo de uso:**

---

## ⚙️ Estrutura do Repositório

flextime-iot/
├── global-solution-java/ # Backend (Spring Boot + Oracle)
│ ├── src/
│ ├── pom.xml
│ ├── application.properties
│ └── ...
│
└── global-solution-2-hpecora/ # Mobile (React Native + Expo)
├── src/
├── package.json
├── app.json


---

## 🚀 Como Executar

### 🖥️ Backend (Java + Spring Boot)
1. Abra a pasta `global-solution-java` no IntelliJ IDEA.
2. Configure o banco de dados Oracle conforme o arquivo `application.properties`.
3. Execute a classe principal:


4. O servidor iniciará em:
http://localhost:8080

5. Para testar os endpoints, acesse o Swagger:
👉 [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)

---

### 📱 Mobile (React Native + Expo)
1. Abra a pasta `global-solution-2-hpecora` no VS Code.
2. No terminal, instale as dependências:


npm install

3. Inicie o projeto:

4. 4. Escaneie o QR code no aplicativo **Expo Go** (Android ou iOS) para abrir o app.
5. O app consumirá automaticamente a API Java rodando em `http://localhost:8080`.

---

## 🔗 Integração entre as Camadas

A tela **“Relatórios Semanais”** do app mobile consome o endpoint:



GET /api/v1/reports/user/{id}/last


O backend retorna um JSON com o insight gerado pela IA, que é exibido no app como:

> “Entre 2025-11-18 e 2025-11-23, você registrou 2 check-ins: 0 em home office, 2 no escritório e 0 em trabalho remoto. Sua média de humor foi 7,0, resultando em um score de equilíbrio de 75. Mantenha os hábitos que contribuem para um bom humor e, nos dias em que a nota caiu, reorganize pausas e horários de foco para preservar seu bem-estar.”

---

## 🧩 Tecnologias Utilizadas

### Backend
- **Java 17**
- **Spring Boot 3.3.4**
- **JPA / Hibernate**
- **Oracle Database**
- **OpenAI GPT API (IA Generativa)**
- **Swagger UI**

### Mobile
- **React Native (Expo SDK 50+)**
- **TypeScript**
- **Axios**
- **React Navigation**
- **Firebase (autenticação)**
- **Expo Router**

---

## 📈 Funcionalidades Principais
- Registro de **check-ins diários** com humor e local de trabalho.  
- Análise automática de produtividade e bem-estar com IA generativa.  
- Geração de relatórios semanais via API REST.  
- Exibição dos insights diretamente no app mobile.  
- Interface moderna e intuitiva, compatível com Android e iOS.

---

## 🎥 Demonstração em Vídeo
📺 **Assista à demonstração completa no YouTube:**  
[Insira aqui o link do vídeo de apresentação]

---

## 👩‍💻 Equipe de Desenvolvimento
- **[Seu Nome Completo]** — Desenvolvimento Full Stack  
- **[Colegas, se houver]**  
- FIAP | 2025

---

## 🧾 Licença
Este projeto foi desenvolvido para fins acadêmicos, na disciplina **Disruptive Architectures: IoT, IoB & Generative AI – FIAP 2025**.  
Todos os direitos reservados aos autores do trabalho.

---

## 💡 Observação Final
O **FlexTime IoT** demonstra a aplicação prática da IA Generativa na análise comportamental e no apoio à gestão híbrida de equipes, conectando insights de produtividade humana com tecnologia de ponta.
