FROM openjdk:17-jdk-slim

# Install netcat for standby script
RUN apt-get update && apt-get install -y netcat && rm -rf /var/lib/apt/lists/*

# Sets the working directory inside the container
WORKDIR /app

# Copy the generated JAR file to the container
COPY target/Migralog2-1.0.jar app.jar

# Copy the wait script to the container and set execution permissions
COPY wait-for-db.sh /app/

RUN chmod +x /app/wait-for-db.sh

# Exposes the port on which the application will run
EXPOSE 8080

# Command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
