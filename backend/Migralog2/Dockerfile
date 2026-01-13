# Etapa 1: Construcción del JAR
FROM maven:3.9.6-eclipse-temurin-17 AS builder

WORKDIR /build

COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests

# Etapa 2: Imagen final para producción
FROM openjdk:17-jdk

WORKDIR /app

COPY --from=builder /build/target/*.jar app.jar

COPY keystore/_.proverbia.net.crt /usr/local/share/ca-certificates/proverbia.crt

RUN apt-get update && apt-get install -y ca-certificates unzip && \
    update-ca-certificates && \
    keytool -importcert -trustcacerts -alias proverbia \
    -file /usr/local/share/ca-certificates/proverbia.crt \
    -keystore $JAVA_HOME/lib/security/cacerts \
    -storepass changeit -noprompt && \
    rm -rf /var/lib/apt/lists/*

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]

