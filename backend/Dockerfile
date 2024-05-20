# First stage: Build the application
FROM maven:3.9.6-amazoncorretto-21 as builder
WORKDIR /app

COPY .mvn/ mvnw mvnw.cmd ./
COPY pom.xml .
COPY src ./src

RUN mvn clean package -Dmaven.test.skip

# Second stage: Run the application
FROM amazoncorretto:21-alpine as runner
WORKDIR /app

COPY --from=builder /app/target/*.jar app.jar

# Directory that is mapped to CDN on host machine
RUN mkdir -p /pinehaus/images

EXPOSE 8080

ENTRYPOINT ["java", "--enable-preview", "-jar", "app.jar" ]