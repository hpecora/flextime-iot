# Etapa 1: Build do projeto usando Maven dentro do container
FROM maven:3.9.6-eclipse-temurin-17 AS build

# pasta de trabalho
WORKDIR /app

# copia apenas o pom primeiro (ajuda no cache)
COPY pom.xml .

# copia o código-fonte
COPY src ./src

# roda o build (gera o .jar dentro de target/)
RUN mvn clean package -DskipTests


# Etapa 2: Imagem final, só com o JAR
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

# copia o .jar gerado na etapa de build
COPY --from=build /app/target/*.jar app.jar

# porta da aplicação
EXPOSE 8080

# comando de inicialização
ENTRYPOINT ["java", "-jar", "app.jar"]
