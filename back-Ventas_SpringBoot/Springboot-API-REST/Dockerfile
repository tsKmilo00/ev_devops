# Builder image for Maven + JDK 17
FROM maven:3.9.8-eclipse-temurin-17 AS build
WORKDIR /app

COPY pom.xml ./
RUN mvn -B dependency:go-offline

COPY src ./src
RUN mvn -B package -DskipTests

# Runtime image
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
RUN groupadd -r spring && useradd -r -g spring spring
USER spring:spring
COPY --from=build /app/target/Springboot-API-REST-0.0.1-SNAPSHOT.jar ./app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
