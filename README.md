# CI intro — app mínima + pruebas en GitHub Actions

Proyecto de referencia para practicar **pruebas automatizadas** y **integración continua** con Node.js (Express), Jest, Supertest y GitHub Actions.

## Qué incluye

| Parte | Descripción |
|--------|-------------|
| `sample-app/` | API Express mínima (`app.js`) y servidor (`server.js`) |
| `sample-app/app.test.js` | Pruebas HTTP con Jest + Supertest |
| `.github/workflows/ci.yml` | Workflow que corre `npm ci` y `npm test` en Ubuntu |

El workflow se dispara en **push** y **pull_request** hacia `main` o `master`, para que los checks aparezcan en las PRs.

---

## Cómo se relaciona con el repo de tu amigo (`minirepo-tests`)

Estructura parecida: carpeta `sample-app`, Express, Jest, Supertest, workflow en `.github/workflows/`. Diferencias útiles:

1. **Eventos del workflow**: el repo original solo tenía `on: push`. Para la tarea de “una PR que falle y otra que pase”, conviene `pull_request` (este proyecto lo incluye).
2. **Versiones**: `actions/checkout@v4`, `setup-node@v4` y `npm ci` con `package-lock.json` para builds reproducibles en CI.
3. **Rutas**: ejemplo con `/` y `/saludo/:nombre` para ver dos pruebas sencillas.

---

## Paso a paso (cómo haría la tarea)

### 1. Subir el repositorio a GitHub

```bash
cd ci-intro-demo
git init
git add .
git commit -m "Initial commit: app mínima y CI con Jest"
```

En GitHub: **New repository** → sin README si ya tienes commit local. Luego:

```bash
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git branch -M main
git push -u origin main
```

Comprueba en la pestaña **Actions** que el workflow se ejecutó en verde en `main`.

### 2. Pull request que **falla** las pruebas

Objetivo: demostrar que CI detecta un cambio roto.

1. **Nueva rama** desde `main`, por ejemplo `pr/ejemplo-falla`.
2. **Cambio que rompe el contrato** con las pruebas sin actualizar `app.test.js`, por ejemplo en `app.js` línea del `res.send`:
   - De `Hola desde la app de demostración` a `Hola mundo` (o cualquier otro texto distinto).
3. Commit, push y **abrir Pull Request** hacia `main`.
4. En la PR, la comprobación **CI / Pruebas (Jest)** debería **fallar** (texto no coincide con el `expect` del test).

Opcional: **no mergear** esta rama, o mergear solo si la consigna lo permite (a veces el objetivo es solo mostrar el check rojo).

### 3. Pull request que **pasa** las pruebas

Objetivo: mismo flujo pero dejando el código y los tests alineados.

**Opción A — Cambio correcto:** en una rama nueva (`pr/ejemplo-ok`), cambia el mensaje en `app.js` **y** el string esperado en `app.test.js` para que coincidan, y si quieres añade una prueba nueva coherente.

**Opción B — Solo refactor:** rama con cambios que no alteran el comportamiento observado por los tests (por ejemplo extraer el string a una constante compartida por `app.js` y el test).

Push, PR hacia `main`: los checks deberían estar **en verde**.

### 4. Entrega / demostración

- Enlace al repo y, si piden capturas, a la PR fallida (check rojo) y a la que pasa (check verde).
- Breve texto: qué hace el workflow, qué comando corre localmente (`cd sample-app && npm test`).

---

## Desarrollo local

```bash
cd sample-app
npm ci
npm test
npm start
```

El servidor escucha en el puerto `3000` por defecto.

---

## Licencia

MIT (ajusta según tu curso si hace falta otra).
