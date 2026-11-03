# NodoExecute — Arquitectura del Sistema

**Nombre del proyecto:** NodoExecute  
**Lema:** Organiza. Conecta. Ejecuta.  
**Documento:** Arquitectura de Software  
**Archivo:** `ARCHITECTURE.md`  
**Versión:** 1.0  
**Estado:** Documento base de arquitectura

---

## 1. Introducción

NodoExecute es una plataforma modular de gestión empresarial diseñada para organizar, planificar, conectar y ejecutar actividades, procesos y recursos dentro de una organización.

El sistema utiliza un modelo de nodos jerárquicos e interconectados que permite representar estructuras organizacionales, procesos empresariales, proyectos, tareas, procedimientos, responsabilidades, recursos y dependencias.

Su arquitectura busca proporcionar una plataforma extensible, mantenible y escalable, capaz de integrar diferentes áreas de gestión empresarial dentro de un mismo entorno.

La solución se desarrollará inicialmente como un **monolito modular**, utilizando principios de Clean Architecture y Domain-Driven Design (DDD).

## 2. Objetivos arquitectónicos

La arquitectura de NodoExecute tiene los siguientes objetivos:

1. Organizar el sistema en módulos funcionales independientes.
2. Separar las reglas de negocio de los detalles técnicos.
3. Facilitar el mantenimiento y la ampliación de funcionalidades.
4. Permitir la comunicación controlada entre módulos.
5. Garantizar la integridad de los datos y las operaciones.
6. Facilitar las pruebas automatizadas.
7. Permitir la incorporación gradual de nuevas tecnologías.
8. Evitar dependencias innecesarias entre componentes.
9. Mantener trazabilidad de procesos, actividades y recursos.
10. Preparar el sistema para un crecimiento futuro.

## 3. Estilo arquitectónico

### 3.1. Monolito modular

NodoExecute utilizará una arquitectura de monolito modular.

Esto significa que el sistema se desplegará inicialmente como una sola aplicación, pero su código estará dividido en módulos con responsabilidades claramente definidas.

Cada módulo tendrá su propio dominio, casos de uso, infraestructura y componentes de presentación cuando corresponda.

**Características:**

- Una aplicación principal.
- Una implementación centralizada de autenticación y configuración.
- Módulos funcionales separados.
- Comunicación interna mediante interfaces y eventos.
- Una base de datos principal compartida, con límites de propiedad de datos definidos por módulo.
- Posibilidad de escalar la infraestructura sin introducir microservicios prematuramente.

### 3.2. ¿Por qué utilizar esta arquitectura?

Se selecciona este enfoque porque permite desarrollar NodoExecute de manera progresiva sin añadir desde el inicio la complejidad de administrar múltiples servicios independientes.

También facilita las transacciones entre módulos, la depuración, el despliegue y el mantenimiento.

La separación en módulos permitirá evaluar una futura extracción de servicios independientes si las necesidades de rendimiento, disponibilidad o escalabilidad lo justifican.

## 4. Principios arquitectónicos

### 4.1. Clean Architecture

Se utilizará Clean Architecture para separar las responsabilidades del sistema en capas.

Las dependencias deben dirigirse hacia el dominio y las reglas de negocio, evitando que el núcleo dependa de frameworks, bases de datos o tecnologías externas.

### 4.2. Domain-Driven Design (DDD)

Se utilizarán conceptos de DDD para modelar los procesos y las reglas del negocio.

Cada módulo tendrá un contexto funcional definido y será responsable de sus propias reglas.

Conceptos principales:

- Entidades.
- Objetos de valor.
- Agregados.
- Servicios de dominio.
- Eventos de dominio.
- Repositorios.
- Límites de contexto (Bounded Contexts).

### 4.3. Modularidad

Cada módulo debe tener una responsabilidad concreta y exponer interfaces controladas para interactuar con otros módulos.

No se deben realizar modificaciones directas a las estructuras internas de otro módulo.

### 4.4. Bajo acoplamiento y alta cohesión

Los componentes deben mantener responsabilidades específicas y depender únicamente de los contratos que necesitan.

### 4.5. Separación de responsabilidades

Las operaciones HTTP, las reglas del negocio, el acceso a datos y la presentación deben permanecer separados.

## 5. Capas de la arquitectura

NodoExecute estará organizado en cuatro capas principales.

### 5.1. Presentación

Responsable de recibir las solicitudes del usuario y exponer las funcionalidades del sistema.

**Tecnologías:**

- Express 5.
- EJS.
- HTML.
- CSS.
- JavaScript.
- API REST.

**Responsabilidades:**

- Renderizar las vistas.
- Recibir solicitudes HTTP.
- Validar la estructura de entrada.
- Invocar los casos de uso.
- Transformar resultados en respuestas HTTP.
- Administrar la navegación y la interacción con el usuario.

Los controladores no deben contener reglas de negocio.

### 5.2. Aplicación

Contiene los casos de uso que coordinan las operaciones del sistema.

**Responsabilidades:**

- Ejecutar acciones solicitadas.
- Coordinar entidades y servicios de dominio.
- Gestionar las operaciones entre componentes.
- Validar permisos de aplicación.
- Administrar transacciones mediante abstracciones.
- Transformar información mediante DTO.
- Publicar eventos después de operaciones exitosas.

Ejemplos de casos de uso:

- Crear organización.
- Crear proceso.
- Registrar procedimiento.
- Crear nodo.
- Asignar responsable.
- Registrar movimiento de inventario.
- Completar una tarea.
- Aprobar una solicitud.

### 5.3. Dominio

Representa el núcleo del sistema y contiene las reglas de negocio.

**Responsabilidades:**

- Definir entidades.
- Establecer reglas y restricciones.
- Controlar estados y transiciones.
- Administrar relaciones entre objetos del dominio.
- Definir eventos de dominio.
- Declarar contratos de repositorios.

El dominio no debe depender de Express, EJS, Sequelize, PostgreSQL ni servicios externos.

### 5.4. Infraestructura

Implementa los mecanismos técnicos necesarios para que el sistema funcione.

**Tecnologías y componentes:**

- Sequelize.
- PostgreSQL.
- Argon2.
- Redis.
- BullMQ.
- Servicios de almacenamiento.
- Servicios de correo.
- Integraciones externas.

**Responsabilidades:**

- Persistencia de datos.
- Implementación de repositorios.
- Administración de conexiones.
- Gestión de transacciones.
- Almacenamiento de archivos.
- Procesamiento de tareas en segundo plano.
- Integración con servicios externos.

## 6. Estructura general del proyecto

La siguiente estructura representa la organización propuesta del código fuente.

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
│   └── app.js
│
├── public/
│   ├── css/
│   ├── js/
│   ├── img/
│   └── assets/
│
├── migrations/
├── seeders/
├── tests/
│
├── server.js
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

Esta estructura es una propuesta inicial. Los módulos podrán incorporarse progresivamente conforme se implementen sus funcionalidades.

## 7. Estructura interna de los módulos

Cada módulo funcional deberá organizarse de acuerdo con sus responsabilidades.

Ejemplo para el módulo de organización:

```text
organization/
│
├── domain/
│   ├── entities/
│   ├── value-objects/
│   ├── events/
│   ├── services/
│   └── repositories/
│
├── application/
│   ├── use-cases/
│   ├── dto/
│   └── services/
│
├── infrastructure/
│   ├── persistence/
│   └── repositories/
│
└── presentation/
    ├── controllers/
    ├── routes/
    ├── validators/
    └── views/
```

No todos los módulos necesitan implementar todas las carpetas. La estructura debe responder a las necesidades reales de cada dominio y no convertirse en una obligación de crear archivos vacíos.

## 8. Módulos funcionales

NodoExecute estará compuesto por módulos especializados.

### 8.1. Administración

Gestionará las organizaciones, usuarios, equipos, roles y permisos.

### 8.2. Organización y planificación

Permitirá definir estructuras organizacionales, procesos, procedimientos, pasos, responsabilidades y planificación.

### 8.3. Nodos y tareas

Gestionará la creación de nodos, tareas, subtareas, dependencias, estados y relaciones.

### 8.4. Proyectos

Permitirá organizar actividades dentro de proyectos, objetivos, hitos, cronogramas y entregables.

### 8.5. Inventario

Gestionará productos, categorías, unidades de medida, existencias y disponibilidad.

### 8.6. Almacenes

Administrará almacenes, ubicaciones, entradas, salidas y transferencias.

### 8.7. Compras y proveedores

Gestionará solicitudes de compra, proveedores, cotizaciones y órdenes de adquisición.

### 8.8. Activos y mantenimiento

Controlará los recursos reutilizables, su asignación, mantenimiento y estado.

### 8.9. Automatizaciones

Administrará condiciones, reglas, eventos y acciones automáticas.

### 8.10. Comunicación

Gestionará notificaciones, comentarios y documentos relacionados con las actividades.

### 8.11. Auditoría

Registrará las acciones importantes realizadas por usuarios y módulos.

### 8.12. Reportes e inteligencia

Proporcionará indicadores, estadísticas, informes y análisis de resultados.

La definición detallada de cada módulo y sus submódulos se desarrollará en `MODULES.md`.

## 9. Modelo central de nodos

El modelo de nodos constituye uno de los componentes fundamentales de NodoExecute.

Un nodo representa una unidad de información, organización o ejecución dentro del sistema.

Puede representar:

- Un proceso.
- Un procedimiento.
- Una actividad.
- Una tarea.
- Una subtarea.
- Un objetivo.
- Un hito.
- Una solicitud.
- Una actividad de mantenimiento.

### 9.1. Jerarquía y conexiones

Los nodos podrán organizarse jerárquicamente y establecer relaciones con otros nodos.

Ejemplo:

```text
Proyecto
│
└── Proceso
    │
    ├── Procedimiento
    │   ├── Paso 1
    │   ├── Paso 2
    │   └── Paso 3
    │
    └── Recursos relacionados
        ├── Personal
        ├── Materiales
        └── Herramientas
```

Además de la jerarquía, podrán existir relaciones como:

- Depende de.
- Requiere.
- Pertenece a.
- Asignado a.
- Aprobado por.
- Utiliza recurso.
- Relacionado con.

La jerarquía y las relaciones entre nodos deben modelarse de manera diferenciada para evitar confundir la pertenencia con las dependencias de ejecución.

### 9.2. Independencia del modelo de nodos

El modelo de nodos debe permitir representar distintos tipos de unidades sin obligar a que todos compartan las mismas reglas.

Se podrán utilizar tipos específicos, validaciones y comportamientos especializados.

La definición técnica completa de este modelo se establecerá durante el diseño del dominio y la base de datos.

## 10. Patrones de diseño

Se utilizarán patrones de diseño cuando aporten una solución concreta.

### 10.1. Repository

Se encargará de abstraer las operaciones de persistencia y consulta.

### 10.2. Service Layer

Coordinará operaciones de negocio que involucren varias entidades o componentes.

### 10.3. Factory

Permitirá crear diferentes tipos de nodos y objetos del dominio.

### 10.4. Strategy

Permitirá intercambiar comportamientos o algoritmos.

Ejemplo: diferentes estrategias para calcular el progreso de un proyecto.

### 10.5. Observer y Event-Driven

Permitirán reaccionar a acontecimientos del sistema sin generar dependencias directas entre módulos.

### 10.6. State

Controlará las transiciones válidas entre estados.

Ejemplo: pendiente, en ejecución, bloqueado y completado.

### 10.7. Command

Representará acciones del sistema como operaciones independientes.

Ejemplo: asignar tarea, cancelar proceso o aprobar solicitud.

### 10.8. Unit of Work

Permitirá coordinar operaciones que deban confirmarse o revertirse conjuntamente.

Podrá implementarse utilizando las transacciones de Sequelize sin crear abstracciones innecesarias.

## 11. Comunicación entre módulos

Se utilizarán tres mecanismos complementarios.

### 11.1. API REST

Será el mecanismo principal de comunicación entre el cliente y el servidor.

Permitirá consultar, crear, modificar y ejecutar operaciones.

### 11.2. Eventos internos

Se utilizarán para notificar acontecimientos importantes a otros módulos.

Ejemplo:

```text
TaskCompleted
    │
    ├── Projects: actualiza el progreso.
    ├── Notifications: genera notificación.
    └── Audit: registra la operación.
```

Los eventos deben publicarse después de que la operación principal haya sido confirmada correctamente.

### 11.3. Colas de procesamiento

Se utilizarán para tareas que no necesitan ejecutarse dentro de la solicitud HTTP.

Ejemplos:

- Envío de correos.
- Generación de reportes.
- Procesamiento de archivos.
- Notificaciones masivas.
- Trabajos programados.

Se contempla BullMQ junto con Redis para esta funcionalidad.

### 11.4. Consistencia de operaciones

Las operaciones críticas, especialmente las relacionadas con inventario, compras y recursos, deben utilizar transacciones de base de datos.

Para eventos que deban sobrevivir a fallos entre la confirmación de una transacción y su publicación, se podrá implementar el patrón Transactional Outbox.

## 12. Tecnologías principales

| Tecnología | Responsabilidad |
|---|---|
| Node.js | Entorno de ejecución. |
| Express 5 | Framework del servidor. |
| EJS | Renderización de vistas. |
| PostgreSQL | Base de datos principal. |
| Sequelize | ORM y acceso a datos. |
| Zod | Validación de datos. |
| Argon2 | Protección de contraseñas. |
| express-session | Administración de sesiones. |
| Helmet | Protección de cabeceras HTTP. |
| express-rate-limit | Limitación de solicitudes. |
| Jest | Pruebas automatizadas. |

### 12.1. Tecnologías complementarias

| Tecnología | Uso |
|---|---|
| Redis | Caché y coordinación. |
| BullMQ | Procesamiento en segundo plano. |
| Socket.IO | Comunicación en tiempo real. |
| Cytoscape.js | Visualización de nodos y grafos. |
| Playwright | Pruebas de extremo a extremo. |
| Swagger/OpenAPI | Documentación de API. |

Las tecnologías complementarias se incorporarán cuando exista una necesidad funcional concreta.

## 13. Base de datos y persistencia

PostgreSQL será el motor principal de persistencia.

Sequelize se utilizará como ORM para interactuar con la base de datos.

### 13.1. Criterios de persistencia

- Definir relaciones y restricciones de integridad.
- Utilizar migraciones para controlar los cambios de esquema.
- Evitar cambios automáticos e incontrolados en producción.
- Utilizar transacciones para operaciones relacionadas.
- Crear índices según las necesidades de consulta.
- Evitar duplicación innecesaria de información.
- Definir la propiedad de los datos por módulo.
- Registrar las operaciones críticas.

### 13.2. Integridad del inventario

Los movimientos confirmados de inventario no deberán eliminarse físicamente.

Las correcciones se realizarán mediante movimientos compensatorios, manteniendo el historial y la trazabilidad.

La disponibilidad de existencias deberá considerar cantidades físicas, reservas y bloqueos.

El diseño detallado de tablas, relaciones y restricciones se establecerá en `DATABASE.md`.

## 14. Gestión de errores y excepciones

El sistema utilizará una estrategia centralizada para gestionar errores.

Se contemplarán:

- Errores de validación.
- Errores de autenticación.
- Errores de autorización.
- Errores de dominio.
- Errores de persistencia.
- Errores de infraestructura.
- Errores inesperados.

Los errores deberán manejarse de manera controlada y producir respuestas consistentes.

No se expondrán contraseñas, credenciales, consultas internas ni detalles sensibles de infraestructura al usuario final.

Los errores técnicos deberán registrarse mediante un mecanismo de logging que permita diagnosticar problemas.

## 15. Seguridad arquitectónica

La seguridad será transversal a todos los módulos.

Se contemplan los siguientes mecanismos:

- Autenticación de usuarios.
- Autorización mediante roles y permisos.
- Hash de contraseñas con Argon2.
- Administración segura de sesiones.
- Validación de entradas.
- Protección contra solicitudes maliciosas.
- Limitación de solicitudes.
- Protección de secretos mediante variables de entorno.
- Registro de actividades sensibles.
- Restricción de acceso a información por organización.

La política completa de seguridad se documentará en `SECURITY.md`.

## 16. Pruebas y calidad

La arquitectura deberá permitir probar los componentes de manera independiente.

Se contemplarán:

- Pruebas unitarias del dominio.
- Pruebas de casos de uso.
- Pruebas de integración con PostgreSQL.
- Pruebas de API.
- Pruebas de sistema.
- Pruebas End-to-End.
- Pruebas de seguridad.
- Pruebas de rendimiento.

Se utilizará Jest para las pruebas unitarias e integración, y Playwright para pruebas E2E.

Los criterios detallados estarán en `TESTING.md`.

## 17. Escalabilidad y evolución

Aunque inicialmente se utilizará un monolito modular, la arquitectura deberá permitir su evolución.

Se considerarán futuras mejoras como:

- Procesamiento asíncrono.
- Caché distribuida.
- Comunicación en tiempo real.
- Optimización de consultas.
- Separación de componentes con alta demanda.
- Servicios independientes cuando exista una justificación técnica.
- Integración con servicios externos.

La escalabilidad no debe comprometer la simplicidad inicial del sistema.

## 18. Reglas obligatorias de desarrollo

Todos los desarrolladores deberán respetar las siguientes reglas:

1. No colocar reglas de negocio en controladores.
2. No acceder directamente a la base de datos desde las vistas.
3. No permitir que un módulo modifique directamente las tablas o estructuras internas de otro módulo.
4. Utilizar casos de uso para ejecutar operaciones de aplicación.
5. Mantener las reglas de negocio dentro del dominio.
6. Utilizar repositorios para abstraer la persistencia.
7. Validar las entradas antes de ejecutar operaciones.
8. Utilizar transacciones en operaciones que requieran consistencia.
9. Mantener separación entre jerarquía y relaciones de nodos.
10. Documentar las interfaces de comunicación entre módulos.
11. Evitar dependencias circulares.
12. Incorporar pruebas para las funcionalidades importantes.
13. Utilizar migraciones para modificar la base de datos.
14. No almacenar secretos en el repositorio.
15. Evitar implementar patrones de diseño sin una necesidad concreta.

## 19. Criterios para incorporar nuevos módulos

Un nuevo módulo deberá cumplir con los siguientes criterios:

- Tener una responsabilidad funcional definida.
- Poseer límites de dominio identificables.
- Exponer interfaces controladas.
- Evitar dependencias innecesarias.
- Definir sus entidades y reglas.
- Establecer sus necesidades de persistencia.
- Integrarse mediante contratos, casos de uso o eventos.
- Incluir pruebas.
- Mantener coherencia con la arquitectura general.

## 20. Decisiones arquitectónicas

Las siguientes decisiones constituyen la base inicial del proyecto:

| Decisión | Selección |
|---|---|
| Estilo arquitectónico | Monolito modular |
| Enfoque de diseño | Clean Architecture + DDD |
| Backend | Node.js + Express 5 |
| Frontend inicial | EJS, HTML, CSS y JavaScript |
| Base de datos | PostgreSQL |
| ORM | Sequelize |
| Comunicación cliente-servidor | API REST |
| Comunicación interna | Eventos |
| Procesamiento asíncrono | BullMQ + Redis |
| Visualización de nodos | Cytoscape.js |
| Pruebas | Jest + Playwright |
| Documentación API | Swagger/OpenAPI |

## 21. Conclusión

La arquitectura de NodoExecute establece una base técnica para desarrollar una plataforma empresarial modular, organizada y extensible.

El monolito modular, Clean Architecture y DDD permitirán mantener separadas las responsabilidades, controlar las dependencias y construir progresivamente los diferentes módulos del sistema.

El modelo de nodos será el componente central de la plataforma, permitiendo relacionar procesos, actividades, personas, recursos y resultados dentro de una estructura integrada.

La arquitectura definida en este documento servirá como referencia para el diseño de los módulos, las reglas de negocio, la base de datos, la seguridad y las fases de implementación.