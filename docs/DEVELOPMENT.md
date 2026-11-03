# DEVELOPMENT.md
# Guía de Desarrollo — NodoExecute

**Proyecto:** NodoExecute  
**Lema:** Organiza. Conecta. Ejecuta.  
**Versión:** 1.0  
**Entorno:** Node.js  
**Framework backend:** Express 5  
**Motor de base de datos:** PostgreSQL  
**ORM:** Sequelize  
**Arquitectura:** Monolito modular + Clean Architecture + DDD  
**Estado:** Guía inicial de desarrollo

---

# 1. Introducción

Este documento establece las instrucciones, estándares y procedimientos que deberán seguirse durante el desarrollo de NodoExecute.

Su finalidad es mantener una estructura de código organizada, facilitar el trabajo colaborativo, reducir errores y garantizar que los diferentes módulos puedan desarrollarse y mantenerse sin comprometer la arquitectura general.

La guía está dirigida a los desarrolladores que participen en la construcción, mantenimiento y evolución de NodoExecute.

Todos los integrantes deberán seguir las convenciones aquí definidas para evitar diferencias innecesarias en la organización del código.

# 2. Objetivos

1. Definir el entorno de desarrollo.
2. Establecer los requisitos técnicos para ejecutar el proyecto.
3. Definir el proceso de instalación y configuración.
4. Establecer la estructura de carpetas.
5. Definir convenciones de programación.
6. Establecer reglas para desarrollar módulos.
7. Organizar el acceso a la base de datos.
8. Definir el manejo de dependencias.
9. Establecer el flujo de trabajo con Git.
10. Definir los procedimientos de pruebas y despliegue.

# 3. Tecnologías de desarrollo

NodoExecute utilizará las siguientes tecnologías:

| Tecnología | Función |
|---|---|
| Node.js | Entorno de ejecución del backend |
| Express 5 | Framework para rutas y servidor HTTP |
| JavaScript ES Modules | Organización del código |
| EJS | Motor de plantillas |
| HTML5 | Estructura de las interfaces |
| CSS3 | Estilos |
| JavaScript | Interactividad del frontend |
| PostgreSQL | Base de datos relacional |
| Sequelize | ORM |
| Zod | Validación de datos |
| Argon2 | Hash de contraseñas |
| express-session | Administración de sesiones |
| Helmet | Protección de encabezados HTTP |
| Jest | Pruebas automatizadas |
| Supertest | Pruebas HTTP |
| Playwright | Pruebas de extremo a extremo |
| Git | Control de versiones |

Herramientas complementarias:

- Redis: almacenamiento en caché y soporte para procesos asíncronos.
- BullMQ: administración de colas de trabajo.
- Socket.IO: comunicación en tiempo real.
- Swagger/OpenAPI: documentación de API.
- Cytoscape.js: visualización de nodos y conexiones.
- OWASP ZAP: pruebas dinámicas de seguridad.

Las herramientas complementarias se incorporarán cuando las funcionalidades correspondientes lo requieran.

# 4. Requisitos del entorno

Antes de iniciar el desarrollo, el equipo deberá contar con:

- Node.js en una versión LTS compatible con las dependencias.
- npm.
- PostgreSQL.
- Git.
- Editor de código, preferiblemente Visual Studio Code.
- Acceso al repositorio del proyecto.
- Cliente para administrar PostgreSQL, como pgAdmin o DBeaver.

Se recomienda mantener versiones consistentes de Node.js y npm entre los integrantes del equipo.

La versión exacta utilizada deberá documentarse y fijarse mediante los archivos de configuración correspondientes.

# 5. Instalación del proyecto

## 5.1. Obtener el repositorio

Clonar el repositorio:

```bash
git clone URL_DEL_REPOSITORIO
```

Ingresar al directorio:

```bash
cd NodoExecute
```

## 5.2. Instalar dependencias

Ejecutar:

```bash
npm install
```

El proyecto deberá conservar el archivo `package-lock.json` para mantener instalaciones reproducibles.

En entornos de integración continua y producción se recomienda:

```bash
npm ci
```

## 5.3. Configurar variables de entorno

Crear el archivo:

```text
.env
```

Utilizar `.env.example` como referencia.

Ejemplo inicial:

```env
NODE_ENV=development
PORT=3000

DATABASE_URL=postgresql://usuario:password@localhost:5432/nodoexecute

SESSION_SECRET=CAMBIAR_POR_UN_SECRETO_ALEATORIO

APP_URL=http://localhost:3000

LOG_LEVEL=debug
```

Las variables deberán ampliarse según los servicios que se incorporen.

**Importante:**

- No subir `.env` al repositorio.
- No utilizar credenciales reales en `.env.example`.
- No compartir secretos por canales públicos.
- Utilizar configuraciones independientes para desarrollo, pruebas y producción.

## 5.4. Ejecutar el servidor

Modo desarrollo:

```bash
npm run dev
```

Modo normal:

```bash
npm start
```

El servidor deberá utilizar el puerto definido mediante `process.env.PORT` cuando esté disponible.

# 6. Estructura general del proyecto

La estructura principal será:

```text
NodoExecute/
│
├── docs/
│   ├── ARCHITECTURE.md
│   ├── MODULES.md
│   ├── BUSINESS_RULES.md
│   ├── DATABASE.md
│   ├── SECURITY.md
│   ├── DEVELOPMENT.md
│   ├── ROADMAP.md
│   └── TESTING.md
│
├── src/
│   │
│   ├── core/
│   │   ├── database/
│   │   ├── security/
│   │   ├── errors/
│   │   ├── events/
│   │   └── shared/
│   │
│   ├── modules/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── organizations/
│   │   ├── teams/
│   │   ├── roles/
│   │   ├── organization/
│   │   ├── nodes/
│   │   ├── projects/
│   │   ├── inventory/
│   │   ├── warehouses/
│   │   ├── stock-movements/
│   │   ├── purchasing/
│   │   ├── suppliers/
│   │   ├── assets/
│   │   ├── maintenance/
│   │   ├── budgets/
│   │   ├── automations/
│   │   ├── notifications/
│   │   ├── documents/
│   │   ├── reports/
│   │   └── audit/
│   │
│   ├── infrastructure/
│   │   ├── database/
│   │   ├── storage/
│   │   ├── email/
│   │   ├── queue/
│   │   └── cache/
│   │
│   ├── interfaces/
│   │   ├── http/
│   │   └── views/
│   │
│   ├── app.js
│   └── config/
│
├── public/
│   ├── css/
│   ├── js/
│   ├── img/
│   └── fonts/
│
├── migrations/
├── seeders/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── scripts/
├── server.js
├── package.json
├── package-lock.json
├── .env.example
├── .gitignore
└── README.md
```

Las carpetas podrán crearse progresivamente conforme se implementen los módulos.

No es necesario crear toda la estructura vacía desde el primer día.

# 7. Estructura interna de los módulos

Cada módulo deberá organizarse de acuerdo con las responsabilidades de Clean Architecture.

Ejemplo: módulo de inventario.

```text
inventory/
│
├── domain/
│   ├── entities/
│   ├── value-objects/
│   ├── services/
│   ├── events/
│   └── repositories/
│
├── application/
│   ├── use-cases/
│   ├── dto/
│   └── services/
│
├── infrastructure/
│   └── persistence/
│       ├── models/
│       └── repositories/
│
└── presentation/
    ├── controllers/
    ├── routes/
    ├── validators/
    └── views/
```

## 7.1. Domain

Contendrá las reglas y conceptos propios del negocio.

Ejemplos:

- Entidades.
- Objetos de valor.
- Reglas de dominio.
- Servicios de dominio.
- Eventos de dominio.
- Interfaces de repositorios.

No deberá depender de Express, Sequelize ni de tecnologías externas.

## 7.2. Application

Contendrá los casos de uso que coordinan las operaciones.

Ejemplos:

- Crear producto.
- Registrar entrada.
- Reservar material.
- Transferir existencias.
- Consultar disponibilidad.

Los casos de uso utilizarán las interfaces necesarias para comunicarse con el dominio y la infraestructura.

## 7.3. Infrastructure

Contendrá las implementaciones técnicas.

Ejemplos:

- Modelos Sequelize.
- Repositorios.
- Consultas de persistencia.
- Integraciones externas.
- Servicios de almacenamiento.

## 7.4. Presentation

Contendrá los componentes encargados de recibir y responder solicitudes.

Ejemplos:

- Controladores.
- Rutas.
- Validadores HTTP.
- Adaptadores de entrada.
- Vistas EJS.

Los controladores deberán ser ligeros y delegar las operaciones a los casos de uso.

# 8. Reglas de arquitectura

Todos los desarrolladores deberán respetar las siguientes reglas:

1. No colocar reglas de negocio dentro de los controladores.
2. No realizar consultas Sequelize directamente desde las vistas.
3. No mezclar lógica de frontend con lógica de dominio.
4. No permitir que el dominio dependa de Express.
5. No acceder a la base de datos desde cualquier módulo sin respetar sus responsabilidades.
6. No duplicar reglas de negocio en varios controladores.
7. No crear dependencias circulares entre módulos.
8. Utilizar eventos cuando sea necesario desacoplar operaciones.
9. Utilizar transacciones para operaciones críticas.
10. Mantener una única fuente de verdad para cada regla de negocio.

# 9. Convenciones de programación

## 9.1. Nombres de archivos

Se utilizará una convención consistente.

| Elemento | Convención | Ejemplo |
|---|---|---|
| Clases | PascalCase | ProductService.js |
| Funciones | camelCase | createProduct.js |
| Variables | camelCase | productId |
| Constantes | UPPER_SNAKE_CASE | MAX_RETRIES |
| Tablas | snake_case plural | products |
| Columnas | snake_case | created_at |
| Carpetas | kebab-case o minúsculas | stock-movements |

## 9.2. JavaScript

Se utilizarán módulos ES Modules.

Ejemplo:

```javascript
import express from "express";

const router = express.Router();

export default router;
```

Se deberá evitar mezclar `require()` y `import` sin una justificación técnica.

## 9.3. Funciones

Las funciones deberán tener responsabilidades claras y nombres descriptivos.

Ejemplo:

```javascript
async function createProduct(productData) {
    // Ejecutar el caso de uso correspondiente.
}
```

## 9.4. Manejo de errores

Los errores deberán manejarse de forma centralizada.

Se recomienda utilizar clases de error específicas para distinguir:

- Errores de validación.
- Errores de autenticación.
- Errores de autorización.
- Recursos inexistentes.
- Conflictos de negocio.
- Errores de infraestructura.

No se deberán ocultar errores mediante bloques `catch` vacíos.

## 9.5. Comentarios

Los comentarios deberán explicar decisiones o comportamientos que no sean evidentes.

No deberán utilizarse para describir cada línea de código de forma innecesaria.

# 10. Desarrollo de módulos

Cada módulo deberá desarrollarse siguiendo un procedimiento común.

## 10.1. Análisis

Antes de programar se deberá:

1. Consultar `MODULES.md`.
2. Consultar las reglas correspondientes de `BUSINESS_RULES.md`.
3. Identificar las entidades necesarias.
4. Revisar las relaciones definidas en `DATABASE.md`.
5. Identificar dependencias con otros módulos.
6. Determinar los permisos necesarios.

## 10.2. Implementación

El desarrollo deberá seguir este orden:

1. Definir entidades y reglas de dominio.
2. Crear interfaces de repositorio.
3. Implementar casos de uso.
4. Crear modelos y repositorios de infraestructura.
5. Implementar validadores.
6. Crear controladores y rutas.
7. Desarrollar vistas o interfaces cuando correspondan.
8. Implementar permisos y auditoría.
9. Crear pruebas automatizadas.

## 10.3. Integración

Un módulo deberá comunicarse con otros mediante contratos claros.

Se recomienda:

- Utilizar casos de uso o servicios públicos del módulo correspondiente.
- Evitar acceder directamente a sus tablas internas.
- Utilizar eventos para notificar cambios relevantes.
- Mantener las operaciones relacionadas dentro de transacciones cuando corresponda.

# 11. Base de datos y Sequelize

## 11.1. Conexión

La conexión a PostgreSQL deberá centralizarse dentro de la infraestructura de base de datos.

Los módulos no deberán crear conexiones independientes.

## 11.2. Modelos

Cada modelo deberá representar una entidad persistente.

Los modelos Sequelize no deberán convertirse en el lugar donde se concentren todas las reglas de negocio.

## 11.3. Relaciones

Las relaciones deberán definirse de manera explícita.

Ejemplos:

- `belongsTo`
- `hasMany`
- `belongsToMany`

Las claves foráneas deberán coincidir con las relaciones documentadas en `DATABASE.md`.

## 11.4. Migraciones

Toda modificación del esquema deberá realizarse mediante migraciones.

Ejemplos:

- Crear una tabla.
- Agregar una columna.
- Modificar una restricción.
- Crear un índice.
- Establecer una relación.

No se deberán modificar manualmente las estructuras de producción sin un procedimiento controlado.

## 11.5. Transacciones

Las operaciones que afecten varias tablas relacionadas deberán utilizar transacciones.

Ejemplo:

```javascript
const transaction = await sequelize.transaction();

try {
    // Ejecutar operaciones relacionadas.

    await transaction.commit();
} catch (error) {
    await transaction.rollback();
    throw error;
}
```

La transacción deberá propagarse a las operaciones de persistencia correspondientes.

## 11.6. Seeders

Los seeders permitirán cargar información inicial.

Ejemplos:

- Roles del sistema.
- Permisos.
- Unidades de medida.
- Tipos de nodos.
- Estados predefinidos.

No deberán utilizarse para introducir información real o sensible de producción sin autorización.

# 12. Validación de datos

Se utilizará Zod para validar las entradas recibidas por la aplicación.

Ejemplo:

```javascript
import { z } from "zod";

const createProductSchema = z.object({
    name: z.string().min(2).max(180),
    sku: z.string().min(1).max(80),
    minimumStock: z.number().nonnegative()
});
```

Se deberán validar:

- Campos obligatorios.
- Tipos de datos.
- Longitudes.
- Formatos.
- Rangos numéricos.
- Fechas.
- Identificadores.
- Relaciones permitidas.

La validación deberá realizarse antes de ejecutar operaciones de persistencia.

# 13. Desarrollo de interfaces

NodoExecute utilizará EJS, HTML, CSS y JavaScript para sus interfaces web iniciales.

## 13.1. Vistas EJS

Las vistas deberán mantenerse separadas de la lógica de negocio.

Se recomienda organizar:

- Layouts.
- Componentes reutilizables.
- Parciales.
- Páginas por módulo.

## 13.2. CSS

Se deberá mantener una organización clara de estilos.

Se recomienda evitar duplicaciones y utilizar variables CSS para colores, tipografías, espacios y otros elementos compartidos.

## 13.3. JavaScript del frontend

Los archivos JavaScript del cliente deberán encargarse de la interacción con la interfaz y la comunicación con el backend.

No deberán contener secretos ni reglas de autorización que deban protegerse en el servidor.

## 13.4. Visualización de nodos

Para la representación gráfica de nodos y conexiones se podrá utilizar Cytoscape.js.

La visualización no deberá sustituir las validaciones de jerarquía, dependencias y permisos que se realizan en el backend.

# 14. Control de versiones con Git

El proyecto deberá utilizar Git para registrar los cambios realizados por los desarrolladores.

## 14.1. Ramas

Se recomienda la siguiente organización:

| Rama | Función |
|---|---|
| main | Código estable de producción |
| develop | Integración del desarrollo |
| feature/* | Nuevas funcionalidades |
| fix/* | Corrección de errores |
| hotfix/* | Correcciones urgentes de producción |

## 14.2. Convención de commits

Los commits deberán utilizar mensajes claros.

Se recomienda Conventional Commits.

Ejemplos:

```text
feat(nodes): implementar creación de nodos
fix(auth): corregir validación de sesión
refactor(inventory): separar lógica de movimientos
test(tasks): agregar pruebas de asignación
docs(database): actualizar relaciones
chore(deps): actualizar dependencias
```

## 14.3. Pull Requests

Antes de integrar cambios a las ramas principales se deberá:

1. Revisar el código.
2. Verificar que las pruebas pasen.
3. Revisar posibles vulnerabilidades.
4. Confirmar que no existan secretos.
5. Verificar que las migraciones sean compatibles.
6. Comprobar que no se alteren funcionalidades existentes.

No se recomienda realizar cambios directamente sobre `main`.

# 15. Pruebas durante el desarrollo

Cada módulo deberá incorporar pruebas de acuerdo con su complejidad.

## 15.1. Pruebas unitarias

Verificarán reglas y funciones individuales.

Herramienta principal: Jest.

## 15.2. Pruebas de integración

Verificarán la comunicación entre componentes.

Herramientas:

- Jest.
- Supertest.
- PostgreSQL de pruebas.

## 15.3. Pruebas de sistema

Verificarán los flujos completos de la aplicación.

Herramienta principal: Playwright.

## 15.4. Pruebas de seguridad

Se verificarán:

- Autenticación.
- Autorización.
- Aislamiento organizacional.
- Validación de datos.
- Protección de sesiones.
- Exposición de información.

Herramientas complementarias:

- OWASP ZAP.
- npm audit.
- Snyk.

La estrategia detallada de pruebas se documentará en `TESTING.md`.

# 16. Scripts recomendados de package.json

Se recomienda mantener comandos consistentes.

Ejemplo inicial:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lint": "eslint .",
    "format": "prettier --write .",
    "db:migrate": "sequelize-cli db:migrate",
    "db:migrate:undo": "sequelize-cli db:migrate:undo",
    "db:seed": "sequelize-cli db:seed:all"
  }
}
```

Los comandos deberán ajustarse a las dependencias y configuración definitivas del proyecto.

# 17. Manejo de entornos

Se deberán separar los siguientes entornos:

| Entorno | Propósito |
|---|---|
| Development | Desarrollo local |
| Test | Ejecución de pruebas |
| Staging | Validación previa a producción |
| Production | Aplicación disponible para usuarios |

Cada entorno deberá tener sus propias variables y credenciales.

No se deberán utilizar datos reales de producción en pruebas sin autorización y medidas de protección.

# 18. Despliegue

El despliegue deberá realizarse mediante un procedimiento controlado.

## 18.1. Preparación

Antes de desplegar:

- Revisar el estado del repositorio.
- Ejecutar las pruebas.
- Verificar las variables de entorno.
- Comprobar las migraciones.
- Revisar dependencias.
- Confirmar que el servidor utiliza el puerto proporcionado por la plataforma.

## 18.2. Producción

Durante el despliegue:

1. Obtener el código estable.
2. Instalar dependencias con `npm ci`.
3. Ejecutar las migraciones aprobadas.
4. Iniciar el servidor.
5. Verificar los registros.
6. Comprobar las rutas principales.
7. Ejecutar pruebas de humo.

Las migraciones deberán tener un procedimiento de respaldo y recuperación.

## 18.3. Verificación posterior

Después del despliegue se deberá comprobar:

- Que el servidor inicie correctamente.
- Que la base de datos responda.
- Que el inicio de sesión funcione.
- Que las rutas principales respondan.
- Que las operaciones de lectura y escritura funcionen.
- Que los archivos puedan gestionarse.
- Que los logs no presenten errores críticos.

# 19. Manejo de errores y registros

Se deberá mantener un sistema centralizado de registro de errores.

Los registros deberán permitir identificar:

- Fecha y hora.
- Módulo.
- Operación.
- Tipo de error.
- Identificador de solicitud.
- Contexto técnico necesario.

No se deberán registrar:

- Contraseñas.
- Tokens de autenticación.
- Secretos.
- Datos sensibles innecesarios.

Los errores presentados al usuario deberán ser claros y no exponer información interna.

# 20. Buenas prácticas obligatorias

Todos los desarrolladores deberán cumplir las siguientes reglas:

1. Seguir la arquitectura definida.
2. Mantener los módulos organizados.
3. Evitar duplicar código.
4. Validar todas las entradas.
5. Proteger las rutas.
6. Aplicar permisos en el backend.
7. Respetar el aislamiento organizacional.
8. Utilizar migraciones para modificar la base de datos.
9. Utilizar transacciones en operaciones críticas.
10. Crear pruebas para funcionalidades nuevas.
11. Documentar cambios importantes.
12. Mantener las dependencias actualizadas.
13. No subir secretos al repositorio.
14. Evitar modificar módulos ajenos sin revisar sus dependencias.
15. Realizar revisiones antes de integrar cambios.
16. Mantener compatibilidad con los contratos entre módulos.
17. Evitar lógica de negocio dentro de las vistas.
18. Registrar operaciones relevantes.
19. No eliminar información histórica sin autorización.
20. Mantener el código legible y mantenible.

# 21. Criterios de aceptación

El entorno de desarrollo estará preparado cuando:

- El repositorio pueda clonarse correctamente.
- Las dependencias puedan instalarse.
- Las variables de entorno estén documentadas.
- La conexión a PostgreSQL funcione.
- El servidor pueda iniciarse.
- La estructura modular esté establecida.
- Las migraciones puedan ejecutarse.
- Los módulos respeten las responsabilidades arquitectónicas.
- Las pruebas automatizadas puedan ejecutarse.
- Git tenga un flujo de trabajo definido.
- Exista un procedimiento de despliegue.
- Los desarrolladores conozcan las convenciones del proyecto.

# 22. Conclusión

El desarrollo de NodoExecute deberá realizarse siguiendo estándares comunes de organización, arquitectura, seguridad y calidad.

La utilización de una estructura modular permitirá desarrollar funcionalidades de forma progresiva, manteniendo una separación clara entre el dominio, los casos de uso, la infraestructura y las interfaces.

Esta guía servirá como referencia para todos los integrantes del equipo durante la construcción y evolución de la plataforma.

---

**Fin del documento — DEVELOPMENT.md**

**NodoExecute — Organiza. Conecta. Ejecuta.**