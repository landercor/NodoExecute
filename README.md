# Plataforma de Gestión Empresarial por Nodos

## Propuesta funcional, módulos, arquitectura y hoja de ruta

> Documento de diseño inicial para una plataforma modular que integra
> gestión de tareas jerárquicas, proyectos, equipos, inventarios,
> automatizaciones, costos y analítica.

------------------------------------------------------------------------

## 1. Visión del producto

El objetivo es construir una plataforma de gestión empresarial en la que
los procesos se puedan organizar mediante nodos relacionados entre sí.
Un nodo puede representar una tarea, subtarea, actividad, hito,
incidencia, solicitud o proceso.

La plataforma no debe limitarse a mostrar un árbol de tareas. Debe
permitir que una organización planifique trabajo, asigne
responsabilidades, controle recursos físicos, registre operaciones, mida
resultados y mantenga trazabilidad.

### Principios de diseño

-   **Modularidad:** cada módulo tiene responsabilidades claras y puede
    evolucionar sin romper los demás.
-   **Jerarquía flexible:** los nodos pueden tener hijos, niveles
    ilimitados razonables y relaciones con otros nodos.
-   **Trazabilidad:** las acciones importantes dejan un registro
    consultable.
-   **Permisos granulares:** cada usuario solo puede ejecutar las
    operaciones autorizadas.
-   **Integridad de datos:** inventarios, costos y estados deben
    actualizarse mediante operaciones controladas.
-   **Automatización segura:** las reglas automáticas deben ser
    explícitas, auditables y configurables.
-   **Escalabilidad progresiva:** comenzar con un monolito modular y
    separar servicios solo cuando exista una necesidad real.

------------------------------------------------------------------------

## 2. Módulo central: gestión visual por nodos

### 2.1 Tipos de nodos

No todos los nodos deben ser tareas. Se recomienda permitir distintos
tipos:

  Tipo            Propósito
  --------------- ------------------------------------------
  Proyecto        Contenedor de objetivos y entregables
  Tarea           Trabajo asignable a una persona o equipo
  Subtarea        Parte de una tarea principal
  Hito            Punto importante del cronograma
  Incidencia      Problema que requiere seguimiento
  Solicitud       Petición de un usuario o área
  Proceso         Conjunto de actividades relacionadas
  Aprobación      Paso que requiere autorización
  Entregable      Resultado que debe producirse
  Mantenimiento   Actividad preventiva o correctiva

### 2.2 Estructura madre e hijas

Ejemplo:

``` text
Proyecto: Implementación de almacén
│
├── Tarea madre: Preparar el almacén
│   ├── Hija 1: Adecuar el espacio
│   ├── Hija 2: Instalar estanterías
│   └── Hija 3: Señalizar zonas
│
├── Tarea madre: Registrar productos
│   ├── Hija 1: Crear categorías
│   ├── Hija 2: Registrar referencias
│   └── Hija 3: Definir existencias iniciales
│
└── Hito: Almacén operativo
```

Cada nodo debería tener como mínimo:

-   Identificador único.
-   Nombre y descripción.
-   Tipo de nodo.
-   Nodo padre (si existe).
-   Proyecto o espacio al que pertenece.
-   Responsable principal.
-   Colaboradores.
-   Estado y prioridad.
-   Fecha de inicio y vencimiento.
-   Porcentaje de avance.
-   Etiquetas y categoría.
-   Archivos y comentarios.
-   Fecha de creación y actualización.
-   Usuario creador.
-   Historial de cambios.

### 2.3 Relaciones adicionales entre nodos

La jerarquía padre-hijo no es suficiente para representar todos los
procesos. Añadir relaciones como:

-   Depende de: una tarea no puede comenzar hasta que otra termine.
-   Bloquea: una tarea impide avanzar a otra.
-   Relacionada con: existe una conexión informativa.
-   Duplica: referencia otra tarea similar.
-   Reemplaza: una tarea sustituye a otra.
-   Genera: una actividad produce una solicitud, incidencia o
    movimiento.

Las dependencias deben formar un grafo dirigido sin ciclos cuando
representen precedencias. El sistema debe validar que una tarea no
dependa indirectamente de sí misma.

### 2.4 Vistas de trabajo

Ofrecer distintas formas de visualizar los mismos datos:

-   Árbol jerárquico expandible.
-   Grafo visual con conexiones.
-   Tablero Kanban.
-   Lista con filtros y agrupaciones.
-   Calendario.
-   Diagrama de Gantt.
-   Vista de carga de trabajo por persona.
-   Vista de dependencias y ruta crítica.

### 2.5 Estados y flujo de trabajo

Estados sugeridos:

`Borrador → Pendiente → Asignada → En progreso → En revisión → Aprobada → Completada`

Estados alternativos:

-   Bloqueada.
-   En espera.
-   Cancelada.
-   Rechazada.
-   Vencida.

Los estados deben configurarse por tipo de proceso. Por ejemplo, una
incidencia puede tener estados distintos a una tarea normal.

### 2.6 Reglas de avance

Definir cómo se calcula el avance de una tarea madre:

1.  Manual: el responsable registra el porcentaje.
2.  Automático por subtareas: calcula el avance según el progreso de las
    hijas.
3.  Ponderado: cada hija tiene un peso diferente.
4.  Por entregables: el avance depende de entregables aceptados.

No marcar una tarea madre como completada automáticamente si existen
hijas obligatorias pendientes, salvo que una persona autorizada confirme
una excepción.

------------------------------------------------------------------------

## 3. Módulo de usuarios, equipos, roles y permisos

### 3.1 Administración de usuarios

-   Alta, edición, desactivación y bloqueo de cuentas.
-   Perfil, cargo, departamento y equipo.
-   Estado de disponibilidad.
-   Horario laboral y zona horaria.
-   Habilidades y especialidades.
-   Historial de participación.
-   Invitaciones y recuperación segura de cuenta.

### 3.2 Roles sugeridos

  -----------------------------------------------------------------------
  Rol                                 Responsabilidad
  ----------------------------------- -----------------------------------
  Superadministrador                  Configuración global de la
                                      plataforma

  Administrador de organización       Usuarios, equipos y configuración
                                      organizacional

  Director de proyecto                Planificación, asignaciones y
                                      seguimiento

  Coordinador                         Distribución y supervisión del
                                      trabajo

  Líder de equipo                     Gestión de tareas de su equipo

  Responsable                         Ejecución de tareas asignadas

  Colaborador                         Participación en tareas compartidas

  Auditor                             Consulta de registros y evidencias

  Almacenero                          Operaciones autorizadas de
                                      inventario

  Aprobador                           Revisión y autorización de
                                      operaciones
  -----------------------------------------------------------------------

Los roles son plantillas de permisos, no deben ser la única condición de
autorización.

### 3.3 Permisos granulares

Implementar RBAC (control de acceso basado en roles) y complementarlo
con reglas de alcance:

-   Ver.
-   Crear.
-   Editar.
-   Eliminar o archivar.
-   Asignar.
-   Reasignar.
-   Aprobar.
-   Cerrar.
-   Exportar.
-   Administrar.
-   Consultar información confidencial.

Los permisos deben limitarse por organización, proyecto, equipo, almacén
o recurso. Ejemplo: un almacenero puede registrar entradas en el almacén
A, pero no modificar movimientos cerrados del almacén B.

### 3.4 Asignación y reasignación

Al asignar o reasignar una tarea:

-   Registrar responsable anterior y nuevo.
-   Guardar quién realizó el cambio y cuándo.
-   Solicitar motivo cuando la política lo requiera.
-   Notificar a las personas involucradas.
-   Mantener los comentarios y archivos existentes.
-   Recalcular la carga de trabajo.
-   Comprobar que el nuevo responsable tenga permisos y disponibilidad.

Funciones avanzadas:

-   Asignación individual o grupal.
-   Asignación por habilidades.
-   Reglas de distribución automática.
-   Sustitutos por vacaciones o ausencia.
-   Bandeja de tareas sin responsable.
-   Aceptación o rechazo de asignaciones.
-   Escalamiento cuando una tarea vence.

------------------------------------------------------------------------

## 4. Módulo de proyectos y planificación

Funciones recomendadas:

-   Crear proyectos, programas y portafolios.
-   Definir objetivos, alcance y entregables.
-   Asociar nodos a proyectos.
-   Definir presupuesto, responsables y fechas.
-   Crear hitos y fases.
-   Identificar dependencias.
-   Calcular ruta crítica.
-   Comparar fechas planificadas y reales.
-   Controlar riesgos, problemas y cambios.
-   Registrar lecciones aprendidas.
-   Cerrar proyectos con acta y evidencias.

Indicadores:

-   Avance real frente al plan.
-   Tareas pendientes, vencidas y bloqueadas.
-   Cumplimiento de hitos.
-   Variación de presupuesto.
-   Carga por equipo.
-   Tiempo promedio de resolución.

------------------------------------------------------------------------

## 5. Módulo avanzado de inventarios y almacenes

Este módulo debe tratarse como un subsistema con reglas propias. No
conviene administrar existencias simplemente editando un campo de
cantidad en el producto.

### 5.1 Catálogo de productos

Cada producto puede incluir:

-   SKU o código interno único.
-   Código de barras o QR.
-   Nombre y descripción.
-   Categoría y subcategoría.
-   Unidad de medida.
-   Marca, modelo y fabricante.
-   Imagen y documentos técnicos.
-   Costo y precio, según permisos.
-   Stock mínimo y máximo.
-   Punto de reposición.
-   Lote, serie o fecha de vencimiento cuando aplique.
-   Estado: activo, inactivo o discontinuado.

### 5.2 Almacenes y ubicaciones

Estructura sugerida:

``` text
Organización
└── Almacén principal
    ├── Zona A
    │   ├── Estantería A1
    │   └── Estantería A2
    └── Zona B
        ├── Estantería B1
        └── Estantería B2
```

Permitir varios almacenes, zonas, pasillos, estanterías y posiciones.

### 5.3 Operaciones de inventario

-   Entrada por compra.
-   Entrada por devolución.
-   Salida por consumo.
-   Salida por venta o entrega.
-   Transferencia entre almacenes.
-   Ajuste por conteo físico.
-   Reserva para una tarea o proyecto.
-   Liberación de reservas.
-   Devolución a proveedor.
-   Baja por daño, pérdida o vencimiento.
-   Inventario inicial.

Cada movimiento debe registrar producto, cantidad, unidad, origen,
destino, fecha, usuario, motivo, documento de soporte y referencia
relacionada.

### 5.4 Existencias y trazabilidad

Mantener un libro de movimientos (kardex) inmutable desde el punto de
vista operativo. Los errores se corrigen con movimientos compensatorios,
no borrando movimientos históricos.

Consultar:

-   Existencia física.
-   Existencia disponible.
-   Cantidad reservada.
-   Cantidad en tránsito.
-   Existencia por almacén y ubicación.
-   Historial por producto.
-   Historial por lote o serie.
-   Productos próximos a vencer.
-   Productos bajo mínimo.

Fórmula básica:

`Disponible = Existencia física - Reservado - Bloqueado`

La definición debe adaptarse si se manejan mercancías en tránsito o
controles especiales.

### 5.5 Compras y proveedores

-   Registro de proveedores.
-   Solicitudes de compra.
-   Comparación de cotizaciones.
-   Órdenes de compra.
-   Aprobación según montos.
-   Recepción parcial o completa.
-   Validación contra orden de compra.
-   Registro de facturas y documentos.
-   Devoluciones y evaluación de proveedores.

### 5.6 Inventario conectado con tareas

Esta integración es especialmente importante:

-   Una tarea puede solicitar materiales.
-   El responsable de almacén puede reservar existencias.
-   El sistema puede impedir iniciar una actividad si falta un recurso
    obligatorio.
-   La entrega de materiales queda asociada al nodo.
-   El consumo real se registra contra el proyecto o tarea.
-   Al finalizar, se pueden devolver sobrantes.
-   El costo de materiales se incorpora al costo del proyecto.

Ejemplo:

``` text
Tarea: Instalar 10 estaciones de trabajo
│
├── Solicitar 10 escritorios
├── Solicitar 10 sillas
├── Solicitar 10 computadores
└── Solicitar 10 kits de cableado

Al aprobar la solicitud:
- Se verifica disponibilidad.
- Se reservan las existencias.
- Se autoriza la entrega.
- Se registra el consumo.
- Se actualiza el costo del proyecto.
```

### 5.7 Controles críticos

-   No permitir stock negativo salvo autorización y política explícita.
-   Evitar movimientos duplicados.
-   Usar transacciones de base de datos para actualizar movimientos y
    existencias.
-   Controlar concurrencia cuando dos personas operen el mismo producto.
-   Registrar unidades y conversiones.
-   Realizar conteos cíclicos y conciliaciones.
-   Separar permisos de creación, aprobación y reversión.
-   Mantener trazabilidad completa.

------------------------------------------------------------------------

## 6. Módulo de compras, proveedores y abastecimiento

Puede crecer a partir del inventario:

-   Directorio de proveedores.
-   Evaluación de calidad, precio y cumplimiento.
-   Solicitudes internas de compra.
-   Cotizaciones comparables.
-   Órdenes de compra.
-   Flujos de aprobación.
-   Recepciones parciales.
-   Devoluciones.
-   Alertas de contratos y vencimientos.
-   Historial de precios.
-   Análisis de tiempos de entrega.

Una solicitud de compra puede originarse en una tarea que no tenga
materiales disponibles.

------------------------------------------------------------------------

## 7. Módulo de finanzas, costos y presupuestos

Funciones:

-   Presupuesto por proyecto.
-   Costos de materiales.
-   Costos de mano de obra.
-   Gastos operativos.
-   Costos por departamento.
-   Órdenes y compromisos de compra.
-   Control de ejecución presupuestal.
-   Comparación entre presupuesto y costo real.
-   Reportes de rentabilidad por proyecto.

No es necesario construir desde el principio un sistema contable
completo. Conviene iniciar con control de costos y presupuestos, y
después evaluar integración con software contable.

------------------------------------------------------------------------

## 8. Módulo de automatizaciones y reglas

Un motor de reglas permite que el sistema reaccione a eventos.

Ejemplos:

  -----------------------------------------------------------------------
  Evento                  Regla                   Acción
  ----------------------- ----------------------- -----------------------
  Tarea vencida           Tiene responsable       Notificar y escalar

  Tarea completada        Tiene tarea dependiente Habilitar siguiente
                                                  tarea

  Stock bajo mínimo       Producto activo         Crear solicitud de
                                                  reposición

  Solicitud de material   Requiere aprobación     Enviar al aprobador

  Compra recibida         Recepción validada      Registrar entrada

  Usuario ausente         Tiene tareas activas    Notificar al
                                                  coordinador

  Proyecto sin avances    Supera umbral           Generar alerta
                          configurado             
  -----------------------------------------------------------------------

Características avanzadas:

-   Constructor visual de reglas.
-   Condiciones AND/OR.
-   Acciones encadenadas.
-   Retrasos y vencimientos.
-   Aprobación humana antes de ejecutar acciones sensibles.
-   Historial de ejecuciones.
-   Reintentos controlados.
-   Protección contra ejecuciones duplicadas.
-   Activación y desactivación por organización.

No permitir que los usuarios ejecuten JavaScript arbitrario dentro de
las reglas. Utilizar condiciones y acciones previamente definidas.

------------------------------------------------------------------------

## 9. Módulo de notificaciones y comunicación

-   Notificaciones dentro de la plataforma.
-   Centro de notificaciones.
-   Comentarios por nodo.
-   Menciones a usuarios.
-   Adjuntos y evidencias.
-   Alertas de vencimiento.
-   Notificaciones por correo.
-   Resúmenes diarios o semanales.
-   Preferencias por usuario.
-   Historial de notificaciones.

Las notificaciones deben generarse a partir de eventos de negocio, no
directamente desde cada pantalla.

------------------------------------------------------------------------

## 10. Módulo documental y conocimiento

-   Biblioteca de archivos.
-   Carpetas por proyecto, tarea o área.
-   Versiones de documentos.
-   Control de acceso.
-   Plantillas.
-   Procedimientos operativos.
-   Manuales e instructivos.
-   Evidencias de ejecución.
-   Aprobación documental.
-   Búsqueda por contenido y metadatos.

Guardar los archivos en almacenamiento de objetos y en la base de datos
únicamente sus metadatos, referencias y permisos.

------------------------------------------------------------------------

## 11. Módulo de mantenimiento y activos

Complementa el inventario: un producto consumible y un activo
reutilizable no deben administrarse exactamente igual.

Funciones:

-   Registro de activos y equipos.
-   Código QR o placa patrimonial.
-   Responsable y ubicación.
-   Asignación y devolución.
-   Historial de mantenimiento.
-   Mantenimiento preventivo y correctivo.
-   Calendario de revisiones.
-   Garantías y contratos.
-   Vida útil y depreciación estimada.
-   Registro de daños e incidencias.

Un activo puede estar relacionado con tareas, proyectos, personas y
órdenes de mantenimiento.

------------------------------------------------------------------------

## 12. Módulo de analítica, indicadores y reportes

Paneles recomendados:

### Operación

-   Tareas abiertas y cerradas.
-   Tareas vencidas.
-   Tiempo promedio de ejecución.
-   Tareas bloqueadas.
-   Cumplimiento por equipo.

### Personas y equipos

-   Carga de trabajo.
-   Asignaciones por usuario.
-   Capacidad disponible.
-   Tiempos de respuesta.
-   Distribución de tareas.

### Proyectos

-   Avance planificado frente al real.
-   Hitos cumplidos.
-   Desviaciones.
-   Costos y presupuesto.

### Inventarios

-   Valor del inventario.
-   Rotación.
-   Productos sin movimiento.
-   Productos bajo mínimo.
-   Diferencias de conteo.
-   Vencimientos próximos.

Permitir filtros por periodo, proyecto, área, almacén, categoría y
responsable. Los indicadores deben definirse con fórmulas documentadas
para evitar interpretaciones diferentes.

------------------------------------------------------------------------

## 13. Módulo de auditoría, seguridad y cumplimiento

Registrar eventos importantes:

-   Inicio y cierre de sesión.
-   Intentos fallidos de autenticación.
-   Cambios de roles y permisos.
-   Creación y modificación de nodos.
-   Asignaciones y reasignaciones.
-   Aprobaciones y rechazos.
-   Movimientos de inventario.
-   Cambios de costos.
-   Exportaciones de información.
-   Cambios de configuración.

Cada registro debe contener actor, acción, entidad afectada, fecha,
resultado y contexto relevante. Evitar guardar contraseñas, tokens o
secretos en los logs.

Medidas recomendadas:

-   Contraseñas con Argon2.
-   Sesiones seguras y cookies HttpOnly, Secure y SameSite.
-   Protección CSRF cuando se utilicen sesiones y formularios.
-   Helmet y configuración estricta de CORS.
-   Validación de entradas con Zod.
-   Sanitización contextual y consultas parametrizadas.
-   Limitación de solicitudes.
-   Autorización en el servidor para cada operación.
-   Política de copias de seguridad y restauración.
-   Gestión segura de variables de entorno.
-   Cifrado en tránsito y protección de datos sensibles.
-   Registro y monitoreo de errores.

------------------------------------------------------------------------

## 14. Arquitectura técnica recomendada

### 14.1 Enfoque inicial: monolito modular

Para el estado actual del proyecto, recomiendo comenzar con un monolito
modular en Node.js y Express. Evita introducir microservicios antes de
necesitarlos.

Cada módulo debe tener rutas, controladores, servicios, validaciones y
repositorios claramente separados.

Ejemplo de estructura:

``` text
src/
├── config/
│   ├── database.js
│   ├── env.js
│   └── security.js
│
├── modules/
│   ├── auth/
│   ├── users/
│   ├── organizations/
│   ├── teams/
│   ├── roles/
│   ├── nodes/
│   ├── projects/
│   ├── inventory/
│   ├── warehouses/
│   ├── stock-movements/
│   ├── purchasing/
│   ├── suppliers/
│   ├── assets/
│   ├── maintenance/
│   ├── budgets/
│   ├── automations/
│   ├── notifications/
│   ├── documents/
│   ├── reports/
│   └── audit/
│
├── shared/
│   ├── middleware/
│   ├── errors/
│   ├── events/
│   ├── policies/
│   └── utils/
│
├── jobs/
├── views/
├── public/
└── app.js

server.js
```

Dentro de cada módulo:

``` text
nodes/
├── node.routes.js
├── node.controller.js
├── node.service.js
├── node.repository.js
├── node.model.js
├── node.schema.js
└── node.policy.js
```

Responsabilidades:

-   **Routes:** define endpoints y middleware.
-   **Controller:** recibe la solicitud y devuelve la respuesta.
-   **Service:** contiene las reglas de negocio.
-   **Repository:** consulta y persiste datos.
-   **Model:** define la estructura de datos mediante Sequelize.
-   **Schema:** valida entradas con Zod.
-   **Policy:** comprueba permisos y alcance.

### 14.2 Tecnologías actuales

  Tecnología           Uso recomendado
  -------------------- ---------------------------------------
  Node.js              Entorno de ejecución
  Express 5            Servidor y API
  EJS                  Interfaz renderizada en servidor
  Sequelize            ORM y acceso a base de datos
  Zod                  Validación de datos
  Argon2               Hash de contraseñas
  express-session      Gestión de sesiones
  Helmet               Cabeceras de seguridad
  express-rate-limit   Protección ante exceso de solicitudes
  Jest                 Pruebas automatizadas
  Nodemon              Desarrollo local
  ESLint               Calidad y consistencia del código

### 14.3 Tecnologías complementarias recomendadas

  -----------------------------------------------------------------------
  Tecnología                          Para qué incorporarla
  ----------------------------------- -----------------------------------
  PostgreSQL                          Base de datos relacional
                                      recomendada para nodos, relaciones
                                      y operaciones

  Redis                               Caché, sesiones distribuidas y
                                      coordinación de trabajos

  BullMQ                              Colas para notificaciones, reportes
                                      y automatizaciones

  Socket.IO                           Actualizaciones en tiempo real

  Chart.js o Apache ECharts           Gráficos y tableros

  FullCalendar                        Calendarios

  Cytoscape.js o React Flow           Visualización de grafos y nodos

  Playwright                          Pruebas de extremo a extremo

  Supertest                           Pruebas HTTP de integración

  OpenAPI / Swagger                   Documentación de API

  S3 compatible                       Almacenamiento de documentos

  Docker                              Entornos reproducibles

  GitHub Actions                      Integración y despliegue continuo
  -----------------------------------------------------------------------

No es necesario instalar todas estas tecnologías desde el primer día.
Incorporarlas cuando el módulo que las necesita esté planificado.

### 14.4 Consideraciones sobre la base de datos

Sequelize puede trabajar con distintos motores, pero debe definirse uno
y configurar correctamente su dialecto y controlador.

Para una plataforma con nodos, usuarios, permisos, inventarios,
movimientos y transacciones, PostgreSQL es una opción especialmente
adecuada. MySQL también puede funcionar correctamente.

Evitar mezclar modelos de MongoDB con Sequelize sin una decisión
arquitectónica clara. `express-mongo-sanitize` está orientado a
aplicaciones MongoDB; si el proyecto utiliza exclusivamente una base
relacional, revisar si realmente se necesita.

------------------------------------------------------------------------

## 15. Modelo de datos conceptual

Entidades principales sugeridas:

### Organización y usuarios

-   organizations
-   users
-   departments
-   teams
-   roles
-   permissions
-   user_roles
-   role_permissions
-   team_members

### Nodos y proyectos

-   projects
-   nodes
-   node_relations
-   node_assignees
-   node_comments
-   node_attachments
-   node_status_history
-   node_dependencies
-   node_checklists
-   node_time_entries

### Inventario

-   products
-   product_categories
-   units_of_measure
-   warehouses
-   warehouse_locations
-   stock_balances
-   stock_movements
-   stock_movement_lines
-   stock_reservations
-   inventory_counts
-   inventory_count_lines
-   lots
-   serial_numbers

### Compras

-   suppliers
-   purchase_requests
-   purchase_request_lines
-   purchase_orders
-   purchase_order_lines
-   goods_receipts
-   goods_receipt_lines

### Gestión y control

-   budgets
-   expenses
-   assets
-   maintenance_orders
-   automation_rules
-   automation_runs
-   notifications
-   documents
-   audit_logs

### Relaciones importantes

-   Un proyecto contiene muchos nodos.
-   Un nodo puede tener un nodo padre y muchos hijos.
-   Un nodo puede tener varios responsables o colaboradores.
-   Un nodo puede relacionarse con otros nodos mediante tipos de
    relación.
-   Un nodo puede solicitar reservas de inventario.
-   Una reserva puede generar una salida de almacén.
-   Un movimiento de inventario puede relacionarse con una tarea,
    proyecto, compra o ajuste.
-   Un proyecto puede acumular costos de materiales y mano de obra.

No todos los módulos necesitan implementarse desde el principio. El
modelo se debe normalizar y evolucionar mediante migraciones
controladas.

------------------------------------------------------------------------

## 16. Diseño de API: ejemplos iniciales

Ejemplos de endpoints REST:

### Nodos

``` http
POST   /api/nodes
GET    /api/nodes/:id
GET    /api/projects/:projectId/nodes
PATCH  /api/nodes/:id
POST   /api/nodes/:id/children
POST   /api/nodes/:id/assignments
POST   /api/nodes/:id/reassign
POST   /api/nodes/:id/relations
POST   /api/nodes/:id/complete
GET    /api/nodes/:id/history
```

### Inventarios

``` http
POST   /api/products
GET    /api/products
GET    /api/products/:id
POST   /api/warehouses
POST   /api/stock/receipts
POST   /api/stock/issues
POST   /api/stock/transfers
POST   /api/stock/reservations
GET    /api/stock/balances
GET    /api/stock/movements
POST   /api/inventory-counts
```

### Aprobaciones

``` http
GET    /api/approvals/pending
POST   /api/approvals/:id/approve
POST   /api/approvals/:id/reject
```

Estos endpoints son una propuesta, no una especificación cerrada.
Definir contratos, permisos, paginación, filtros y formatos de error
antes de implementarlos.

------------------------------------------------------------------------

## 17. Reglas de negocio que deben definirse antes de programar

1.  ¿Una tarea puede tener varios responsables?
2.  ¿Quién puede reasignar una tarea?
3.  ¿Una tarea madre puede cerrarse si sus hijas están pendientes?
4.  ¿Qué sucede con las hijas cuando se cancela la madre?
5.  ¿Se permite cambiar una tarea completada?
6.  ¿Qué operaciones requieren aprobación?
7.  ¿Se permiten reservas parciales de materiales?
8.  ¿Puede existir stock negativo?
9.  ¿Quién puede realizar ajustes de inventario?
10. ¿Qué sucede si una compra llega parcialmente?
11. ¿Cómo se calcula el costo de materiales?
12. ¿Qué información puede consultar cada departamento?
13. ¿Cuánto tiempo se conserva el historial?
14. ¿Cómo se revierten las operaciones incorrectas?

Documentar estas reglas reduce errores y evita que cada módulo
implemente criterios diferentes.

------------------------------------------------------------------------

## 18. Pruebas y control de calidad

Organizar pruebas por niveles:

  -----------------------------------------------------------------------
  Tipo de prueba          Herramienta             Qué verificar
  ----------------------- ----------------------- -----------------------
  Unitarias               Jest                    Servicios, cálculos y
                                                  reglas

  Integración             Jest + Supertest        Rutas, controladores y
                                                  base de datos

  Interfaz                Playwright              Flujos reales de
                                                  usuario

  Regresión               Jest + Playwright       Que los cambios no
                                                  rompan módulos

  Seguridad               OWASP ZAP               Vulnerabilidades web

  Carga                   k6 o JMeter             Rendimiento y
                                                  concurrencia

  Recuperación            Pruebas controladas     Backups, restauración y
                                                  fallos
  -----------------------------------------------------------------------

Casos críticos:

-   Un usuario sin permiso no puede reasignar tareas.
-   No se puede crear una dependencia circular.
-   Dos usuarios no pueden consumir simultáneamente más stock del
    disponible.
-   Una recepción duplicada no debe duplicar existencias.
-   Un movimiento confirmado no se elimina silenciosamente.
-   Una tarea no se completa si incumple sus condiciones obligatorias.
-   Una regla automática no se ejecuta dos veces por el mismo evento.
-   La restauración de una copia de seguridad debe probarse
    periódicamente.

------------------------------------------------------------------------

## 19. Hoja de ruta de desarrollo

Se recomienda construir el sistema por fases, validando cada una antes
de pasar a la siguiente.

### Fase 1 --- Núcleo de la plataforma

-   Autenticación y sesiones.
-   Organizaciones y usuarios.
-   Roles y permisos.
-   Equipos.
-   Registro de auditoría básico.

**Resultado:** plataforma segura con usuarios y permisos.

### Fase 2 --- Motor de nodos

-   Crear, editar y archivar nodos.
-   Relaciones padre-hijo.
-   Asignación y reasignación.
-   Estados y prioridades.
-   Comentarios y archivos.
-   Historial.
-   Vista de árbol y Kanban.

**Resultado:** gestión funcional de tareas jerárquicas.

### Fase 3 --- Proyectos y planificación

-   Proyectos y fases.
-   Hitos.
-   Dependencias.
-   Calendario y Gantt.
-   Indicadores de avance.
-   Carga de trabajo.

**Resultado:** planificación y seguimiento de proyectos.

### Fase 4 --- Inventario básico

-   Catálogo de productos.
-   Almacenes y ubicaciones.
-   Entradas y salidas.
-   Existencias.
-   Kardex.
-   Conteos y ajustes.
-   Permisos de almacén.

**Resultado:** control de inventario trazable.

### Fase 5 --- Integración de tareas e inventario

-   Solicitudes de materiales desde nodos.
-   Reservas.
-   Aprobaciones.
-   Entregas y devoluciones.
-   Costos asociados a proyectos.

**Resultado:** tareas conectadas con recursos físicos.

### Fase 6 --- Compras, proveedores y activos

-   Solicitudes y órdenes de compra.
-   Recepciones.
-   Proveedores.
-   Activos.
-   Mantenimiento preventivo y correctivo.

**Resultado:** abastecimiento y administración de recursos.

### Fase 7 --- Automatizaciones y comunicación

-   Motor de reglas.
-   Notificaciones.
-   Colas de trabajos.
-   Actualización en tiempo real.
-   Escalamientos.

**Resultado:** procesos automáticos y coordinados.

### Fase 8 --- Finanzas y analítica

-   Presupuestos.
-   Costos reales.
-   Reportes.
-   Indicadores.
-   Exportaciones.
-   Panel ejecutivo.

**Resultado:** control y análisis empresarial.

### Fase 9 --- Escalabilidad y optimización

-   Optimización de consultas.
-   Caché.
-   Observabilidad.
-   Pruebas de carga.
-   Alta disponibilidad según necesidad.
-   Separación de servicios si la escala lo justifica.

**Resultado:** plataforma preparada para crecer.

------------------------------------------------------------------------

## 20. Ajustes importantes al proyecto Node.js actual

El `package.json` compartido contiene una base apropiada para iniciar el
backend. Recomiendo revisar estos puntos:

### Script de producción

Actualmente:

``` json
"dev": "nodemon server.js",
"start": "npm run dev"
```

No es recomendable ejecutar Nodemon en producción. Cambiar a:

``` json
"scripts": {
  "dev": "nodemon server.js",
  "start": "node server.js",
  "test": "jest",
  "lint": "eslint ."
}
```

### Dependencias que se pueden evaluar

-   Un controlador de base de datos compatible con el dialecto Sequelize
    elegido.
-   `socket.io` si se requiere comunicación en tiempo real.
-   `bullmq` y `ioredis` si se incorporan colas con Redis.
-   `multer` si se reciben archivos mediante formularios; validar tipo,
    tamaño y contenido.
-   `swagger-ui-express` y una especificación OpenAPI para documentar la
    API.
-   `supertest` y Playwright para pruebas HTTP y E2E.

No instalar dependencias sin definir primero el uso concreto y revisar
compatibilidad con las versiones de Node.js y Express.

### Precauciones técnicas

-   Configurar variables de entorno y validarlas al iniciar.
-   Usar migraciones de Sequelize; evitar sincronizar automáticamente
    estructuras productivas.
-   No colocar reglas de negocio complejas en controladores.
-   Usar transacciones en movimientos de inventario, reservas y
    aprobaciones.
-   Implementar paginación y filtros en listados grandes.
-   No confiar en permisos enviados desde el navegador.
-   Centralizar el manejo de errores.
-   Separar configuración de desarrollo, pruebas y producción.

------------------------------------------------------------------------

## 21. Funciones avanzadas para una segunda etapa

Una vez establecida la plataforma, considerar:

### Portal de solicitudes

Un espacio para que empleados soliciten materiales, servicios,
mantenimiento o tareas.

### Gestión de contratos

Contratos con proveedores, responsables, fechas, renovaciones y alertas.

### Gestión de calidad

Inspecciones, listas de chequeo, no conformidades y acciones
correctivas.

### Gestión de riesgos

Matriz de riesgos, probabilidad, impacto, controles y planes de
mitigación.

### Gestión de conocimiento

Wiki interna, procedimientos, preguntas frecuentes y lecciones
aprendidas.

### Aplicación móvil

Escaneo de códigos QR, consulta de tareas, inventarios y captura de
evidencias.

### Inteligencia artificial

-   Búsqueda semántica en documentos.
-   Resumen de proyectos.
-   Detección de tareas atrasadas.
-   Sugerencias de asignación según carga y habilidades.
-   Predicción de reposición de inventario.

La IA debe recomendar y explicar. Las operaciones sensibles ---compras,
movimientos, cambios de permisos o aprobaciones--- deben conservar
controles humanos y permisos explícitos.

------------------------------------------------------------------------

## 22. Recomendación final

El orden más conveniente es:

1.  Construir una base sólida de usuarios, organizaciones, roles y
    permisos.
2.  Desarrollar el motor de nodos y sus relaciones.
3.  Añadir proyectos, planificación y seguimiento.
4.  Incorporar inventarios con movimientos y trazabilidad.
5.  Conectar tareas con solicitudes y consumo de materiales.
6.  Añadir compras, proveedores, activos y mantenimiento.
7.  Automatizar procesos y notificaciones.
8.  Integrar presupuestos, analítica e inteligencia artificial.

**La característica diferenciadora del producto debe ser la conexión
entre trabajo, personas y recursos.** Una tarea no solo debe indicar
quién tiene que hacer algo: también debe poder indicar qué necesita, qué
recursos consume, qué aprobaciones requiere, cuánto cuesta, qué otras
tareas bloquea y cuál fue el resultado.

Con este enfoque, el proyecto puede evolucionar desde un gestor visual
de tareas hacia una plataforma integral de operaciones empresariales sin
perder una arquitectura mantenible.
