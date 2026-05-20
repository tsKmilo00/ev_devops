Resumen: cómo usar Docker y GitHub Actions para desplegar a AWS (ECR + ECS)

Requisitos (en AWS):
- Crear 3 repositorios ECR: `ECR_REPO_FRONT`, `ECR_REPO_VENTAS`, `ECR_REPO_DESPACHOS`.
- Crear un clúster ECS y servicios para `ventas` y `despachos` (Fargate), opcionalmente `front`.

Secrets de GitHub que debes añadir al repo:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION` (ej. us-east-1)
- `AWS_ACCOUNT_ID`
- `ECR_REPO_FRONT` (nombre del repo en ECR)
- `ECR_REPO_VENTAS`
- `ECR_REPO_DESPACHOS`
- `ECS_CLUSTER` (nombre del cluster)
- `ECS_SERVICE_VENTAS`
- `ECS_SERVICE_DESPACHOS`
- `ECS_SERVICE_FRONT` (opcional)

Comandos locales para probar con Docker Compose:

```bash
# Desde la raíz del repo
docker compose up --build
```

Si quieres probar GitHub Actions localmente, configura los secrets y push a `main`. El workflow `deploy.yml` construye y pushea imágenes a ECR y registra nuevas task definitions en ECS.

Notas:
- El workflow asume que las task definitions plantilla están en `.deploy/*.json` y reemplaza `IMAGE_PLACEHOLDER` por el URI ECR.
- Si prefieres desplegar a S3/CloudFront para el frontend, indícalo y adapto el workflow.
