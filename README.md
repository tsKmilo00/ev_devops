# Proyecto Semestral DevOps - Innovatech Chile

Este proyecto corresponde a la Etapa 2 de despliegue automatizado para Innovatech Chile. Se ha implementado una arquitectura basada en contenedores (Docker), una capa de persistencia mediante volúmenes, y un flujo de CI/CD automatizado hacia AWS EC2 mediante GitHub Actions.

## 🏗️ Arquitectura y Contenedorización

El proyecto está compuesto por cuatro contenedores principales orquestados con **Docker Compose**:

1. **Frontend (Vite + React)**: 
   - Utiliza **multi-stage build** (Node.js para el build y NGINX unprivileged para producción).
   - Se ejecuta con usuario **no root** para mayor seguridad.
   - Puerto local mapeado: `4173:8080`.
2. **Backend Ventas (Spring Boot)**:
   - Utiliza **multi-stage build** (Maven/JDK 17 para el empaquetado y Eclipse Temurin JRE 17 para ejecución).
   - Ejecuta su servicio con el usuario restringido `spring`.
   - Conectado a la base de datos MySQL en la misma red de Docker.
   - Puerto: `8080:8080`.
3. **Backend Despachos (Spring Boot)**:
   - Utiliza **multi-stage build** con una estructura idéntica a Ventas.
   - Ejecuta su servicio con el usuario restringido `spring`.
   - Puerto: `8081:8081`.
4. **Base de Datos (MySQL 8.0)**:
   - Base de datos relacional inicializada con la imagen oficial de MySQL.
   - Puerto: `3307:3306`.

## 💾 Persistencia de Datos

Para garantizar la continuidad operativa de los servicios, se configuró un **Named Volume** de Docker llamado `mysql_data`.
- **Justificación**: Se eligió Named Volume en lugar de Bind Mount ya que permite a Docker gestionar el almacenamiento en su propia área de sistema aislada, ofreciendo mejor rendimiento, portabilidad entre entornos y mayor seguridad para la persistencia crítica de los datos del negocio.

## 🚀 Pipeline de CI/CD (GitHub Actions)

El repositorio cuenta con 3 flujos de integración y despliegue continuo configurados en el directorio `.github/workflows/`.

El pipeline se activa automáticamente ante un **push en la rama `deploy`**, ejecutando los siguientes pasos:
1. **Checkout**: Obtiene el código fuente de la rama.
2. **AWS Credentials**: Se autentica usando secretos seguros (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_SESSION_TOKEN`).
3. **Build & Push**: Construye las imágenes Docker y las almacena en **Amazon ECR**.
4. **Deploy a EC2**: Vía SSH (`EC2_PUBLIC_IP` y `KEY_PEM`), el pipeline entra a la máquina EC2 en AWS, descarga las imágenes actualizadas usando `docker compose pull` y las levanta con `docker compose up -d`, limpiando las imágenes antiguas con `docker image prune`.

## 💻 Instrucciones para ejecución local

Para levantar el proyecto en tu máquina de forma independiente, asegúrate de tener **Docker Desktop** iniciado y ejecuta el siguiente comando en la raíz del proyecto:

```bash
docker compose up -d --build
```

Una vez finalizado, puedes acceder a:
- Frontend: `http://localhost:4173`
- API Ventas: `http://localhost:8080`
- API Despachos: `http://localhost:8081`

*Nota: Cualquier cambio o fix debe ser realizado mediante commits descriptivos y subidos (push) a la rama `deploy` para desencadenar el pipeline de producción.*

*Nota: Cualquier cambio o fix debe ser realizado mediante commits descriptivos y subidos (push) a la rama `deploy` para desencadenar el pipeline de producción.*