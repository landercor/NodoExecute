# SECURITY.md
# Seguridad del Sistema — NodoExecute

**Proyecto:** NodoExecute  
**Lema:** Organiza. Conecta. Ejecuta.  
**Versión:** 1.0  
**Tecnologías principales:** Node.js, Express, PostgreSQL y Sequelize  
**Estado:** Propuesta de seguridad

---

# 1. Introducción

Este documento establece las políticas, mecanismos y controles de seguridad que deberán implementarse en NodoExecute para proteger la información, los usuarios, las organizaciones y las operaciones de la plataforma.

NodoExecute administra información empresarial relacionada con procesos, tareas, proyectos, equipos, inventarios, recursos, costos y documentos. Por esta razón, la seguridad debe formar parte de cada módulo y no limitarse únicamente al inicio de sesión.

La estrategia de seguridad estará basada en los siguientes principios:

- Confidencialidad: impedir que personas no autorizadas accedan a información.
- Integridad: proteger los datos frente a modificaciones no autorizadas o incorrectas.
- Disponibilidad: mantener los servicios accesibles y recuperables.
- Autenticación: verificar la identidad de los usuarios.
- Autorización: controlar las acciones permitidas.
- Trazabilidad: conservar evidencia de las operaciones importantes.
- Aislamiento: impedir que una organización acceda a los datos de otra.

# 2. Objetivos

1. Proteger las cuentas y credenciales de los usuarios.
2. Implementar mecanismos seguros de autenticación.
3. Controlar el acceso a módulos y funcionalidades.
4. Garantizar el aislamiento de información entre organizaciones.
5. Proteger las comunicaciones entre cliente y servidor.
6. Prevenir vulnerabilidades comunes en aplicaciones web y API.
7. Proteger las operaciones críticas de inventario y gestión empresarial.
8. Registrar actividades relevantes mediante auditoría.
9. Definir mecanismos de recuperación y respuesta ante incidentes.
10. Establecer estándares de seguridad para el desarrollo y mantenimiento.

# 3. Principios generales de seguridad

## 3.1. Mínimo privilegio

Cada usuario deberá disponer únicamente de los permisos necesarios para realizar sus funciones.

No se concederán privilegios administrativos de manera predeterminada.

## 3.2. Denegación por defecto

Si una solicitud no tiene autorización explícita, el sistema deberá rechazarla.

No se permitirá el acceso por el simple hecho de que una ruta o funcionalidad no tenga una validación implementada.

## 3.3. Validación en el servidor

Toda operación deberá validarse en el backend.

Las restricciones implementadas en el frontend sirven para mejorar la experiencia de usuario, pero no sustituyen las verificaciones del servidor.

## 3.4. Separación de responsabilidades

La autenticación, autorización, validación de datos, acceso a la base de datos y auditoría deberán mantenerse organizados dentro de sus respectivas responsabilidades arquitectónicas.

## 3.5. Seguridad por capas

La protección de NodoExecute deberá contemplar varios niveles:

1. Seguridad del navegador y cliente.
2. Seguridad de las rutas y API.
3. Seguridad de la lógica de negocio.
4. Seguridad de la base de datos.
5. Seguridad de los archivos y documentos.
6. Seguridad de la infraestructura.

# 4. Autenticación

El módulo de autenticación será responsable de verificar la identidad de los usuarios que intenten ingresar a NodoExecute.

## 4.1. Registro de usuarios

El registro deberá contemplar:

- Nombre y apellidos.
- Correo electrónico.
- Contraseña.
- Confirmación de contraseña.
- Validación del correo electrónico.
- Aceptación de condiciones de uso cuando corresponda.

El sistema deberá verificar que el correo no se encuentre registrado previamente.

La pertenencia a una organización deberá gestionarse mediante el mecanismo de invitación, registro autorizado o incorporación definido por la plataforma.

## 4.2. Contraseñas

Las contraseñas deberán almacenarse utilizando algoritmos especializados de hash.

Tecnología recomendada: **Argon2id**.

Reglas:

- Nunca almacenar contraseñas en texto plano.
- Nunca registrar contraseñas en logs.
- No utilizar cifrado reversible como sustituto del hash.
- Validar la fortaleza mínima de las contraseñas.
- Permitir cambios de contraseña mediante un procedimiento seguro.
- Evitar revelar si un correo existe durante los procesos de recuperación.

## 4.3. Inicio de sesión

El proceso de autenticación deberá:

1. Recibir las credenciales.
2. Validar los datos.
3. Buscar la cuenta correspondiente.
4. Verificar el hash de la contraseña.
5. Comprobar el estado de la cuenta.
6. Crear una sesión autenticada.
7. Registrar el acceso cuando corresponda.
8. Redirigir al usuario a la sección autorizada.

Los mensajes de error no deberán revelar información sensible sobre las cuentas.

## 4.4. Recuperación de contraseña

El sistema deberá permitir recuperar el acceso mediante un procedimiento seguro.

Requisitos:

- Generar tokens aleatorios y difíciles de adivinar.
- Establecer una fecha de expiración.
- Utilizar tokens de un solo uso.
- Almacenar el token de forma protegida, preferiblemente mediante hash.
- Invalidar el token después de utilizarlo.
- Notificar el cambio de contraseña cuando corresponda.

## 4.5. Cierre de sesión

El cierre de sesión deberá invalidar la sesión activa en el servidor.

La eliminación de información de sesión en el navegador no será suficiente si la sesión continúa vigente en el backend.

# 5. Gestión de sesiones

Para la versión web de NodoExecute se recomienda utilizar sesiones administradas desde el servidor mediante `express-session`.

## 5.1. Configuración

La sesión deberá cumplir las siguientes condiciones:

- Utilizar un almacenamiento persistente apropiado para producción.
- Evitar utilizar MemoryStore en producción.
- Utilizar cookies protegidas.
- Regenerar el identificador de sesión después de autenticarse.
- Definir tiempos de expiración.
- Invalidar sesiones al cerrar sesión.
- Proteger los mecanismos de actualización de sesión.

## 5.2. Configuración de cookies

Se recomienda:

| Propiedad | Configuración |
|---|---|
| httpOnly | true |
| secure | true en producción bajo HTTPS |
| sameSite | Lax, salvo que la arquitectura requiera otra política |
| maxAge | Según la política de duración de sesión |
| path | / |

La configuración deberá ajustarse si existen dominios separados, integraciones externas o necesidades específicas de autenticación.

## 5.3. Protección de sesiones

Se deberán implementar controles para:

- Prevenir ataques de fijación de sesión.
- Evitar exposición del identificador de sesión.
- Limitar sesiones simultáneas cuando sea necesario.
- Revocar sesiones ante eventos de seguridad.
- Invalidar sesiones al desactivar una cuenta.

# 6. Autorización y control de permisos

La autorización determinará qué operaciones puede realizar un usuario una vez autenticado.

NodoExecute utilizará un modelo basado en roles y permisos, conocido como RBAC (Role-Based Access Control).

## 6.1. Roles

Los roles agrupan permisos que representan responsabilidades dentro de una organización.

Roles iniciales sugeridos:

| Rol | Responsabilidad |
|---|---|
| Superadministrador | Administración global de la plataforma |
| Administrador de organización | Administración de su organización |
| Gerente | Supervisión general |
| Coordinador | Organización y seguimiento de equipos |
| Supervisor | Supervisión de procesos y tareas |
| Colaborador | Ejecución de tareas asignadas |
| Consulta | Acceso de lectura autorizado |

Los roles podrán personalizarse según las necesidades de cada organización.

El rol de superadministrador deberá mantenerse separado de los roles administrativos de las organizaciones.

## 6.2. Permisos

Los permisos deberán definir acciones concretas.

Ejemplos:

- `users.read`
- `users.create`
- `users.update`
- `users.delete`
- `processes.read`
- `processes.create`
- `processes.publish`
- `nodes.read`
- `nodes.create`
- `nodes.update`
- `tasks.assign`
- `tasks.complete`
- `inventory.read`
- `inventory.adjust`
- `inventory.transfer`
- `purchases.approve`
- `reports.read`
- `audit.read`

## 6.3. Alcance de los permisos

Los permisos deberán considerar tres dimensiones:

1. Módulo: dónde se realiza la operación.
2. Acción: qué puede hacer el usuario.
3. Alcance: sobre qué información puede hacerlo.

Ejemplos de alcance:

- Información propia.
- Información asignada al usuario.
- Información de su equipo.
- Información de su departamento.
- Información de su organización.

Un usuario podría tener permiso para consultar tareas, pero únicamente aquellas asignadas a su equipo.

## 6.4. Validación de permisos

Cada ruta protegida deberá comprobar:

1. Que el usuario esté autenticado.
2. Que la cuenta esté activa.
3. Que pertenezca a la organización correspondiente.
4. Que tenga el permiso necesario.
5. Que el recurso solicitado pertenezca al ámbito autorizado.

La autorización deberá validarse también dentro de los casos de uso cuando la operación pueda ejecutarse desde diferentes interfaces.

# 7. Aislamiento entre organizaciones

El aislamiento de datos constituye uno de los controles más importantes de NodoExecute.

Una organización no deberá acceder, modificar ni eliminar información perteneciente a otra organización.

## 7.1. Identificación organizacional

Las entidades que pertenezcan a una organización deberán mantener una relación verificable con ella.

Se utilizará `organization_id` cuando corresponda.

## 7.2. Validación de acceso

Toda consulta deberá comprobar que el usuario tenga acceso a la organización y al recurso solicitado.

No se confiará en el `organization_id` enviado desde el frontend.

La organización activa deberá verificarse contra las membresías y permisos del usuario autenticado.

## 7.3. Prevención de acceso cruzado

El backend deberá impedir situaciones como:

- Consultar proyectos de otra organización.
- Modificar tareas de otra empresa.
- Consultar existencias de otro almacén organizacional.
- Acceder a documentos ajenos.
- Modificar roles de otra organización.
- Consultar reportes empresariales sin autorización.

## 7.4. Row-Level Security

Se recomienda evaluar Row-Level Security (RLS) de PostgreSQL como una capa adicional de protección.

Su implementación deberá contemplar:

- Contexto de organización.
- Contexto del usuario.
- Políticas de lectura y escritura.
- Configuración segura de las conexiones.
- Uso correcto de transacciones y contexto de sesión.
- Prevención de accesos que evadan las políticas mediante roles privilegiados.

RLS no sustituye la autorización de aplicación.

# 8. Seguridad de rutas y API

Todas las rutas privadas deberán estar protegidas mediante middleware y controles de autorización.

## 8.1. Protección de rutas

Las rutas deberán utilizar controles adecuados para cada operación.

Ejemplo conceptual:

`Autenticación → Validación de organización → Autorización → Validación de datos → Controlador → Caso de uso`

## 8.2. Validación de entradas

Se recomienda utilizar **Zod** para validar los datos recibidos.

Deberán validarse:

- Parámetros de URL.
- Parámetros de consulta.
- Cuerpos de solicitudes.
- Identificadores.
- Tipos de datos.
- Longitudes máximas.
- Valores permitidos.
- Archivos recibidos.

No se deberán enviar directamente los objetos recibidos del usuario a las operaciones de persistencia.

## 8.3. Protección frente a IDOR

Se deberá prevenir el acceso directo a recursos mediante identificadores ajenos.

Conocer un UUID no concede autorización sobre el recurso.

Toda consulta deberá comprobar pertenencia organizacional y permisos.

## 8.4. Control de errores

Los errores internos no deberán exponer:

- Consultas SQL.
- Contraseñas.
- Tokens.
- Variables de entorno.
- Rutas internas del servidor.
- Información sensible de otros usuarios.
- Detalles de infraestructura.

Los errores deberán registrarse internamente y presentar mensajes controlados al usuario.

# 9. Protección contra vulnerabilidades web

NodoExecute deberá considerar las vulnerabilidades descritas en OWASP Top 10.

## 9.1. Inyección SQL

Medidas:

- Utilizar Sequelize y consultas parametrizadas.
- Evitar concatenar datos del usuario en consultas SQL.
- Validar entradas.
- Limitar el uso de consultas SQL sin procesar.
- Revisar las consultas personalizadas.

## 9.2. Cross-Site Scripting (XSS)

Medidas:

- Escapar contenido dinámico en las vistas EJS.
- Evitar insertar HTML proporcionado por usuarios sin sanitización.
- Aplicar Content Security Policy.
- Evitar el uso innecesario de `innerHTML`.
- Validar contenido enriquecido cuando exista.

En EJS se deberá utilizar el mecanismo de escape de salida apropiado para contenido no confiable.

## 9.3. Cross-Site Request Forgery (CSRF)

Cuando se utilicen sesiones mediante cookies, las operaciones que modifiquen información deberán contar con protección CSRF.

Se recomienda implementar tokens CSRF y validar su origen cuando corresponda.

Las operaciones de cambio no deberán realizarse mediante solicitudes GET.

## 9.4. Clickjacking

Se deberán configurar encabezados de seguridad que impidan la inserción no autorizada de la aplicación en marcos externos.

## 9.5. Fuerza bruta

Se deberán aplicar límites a los intentos de autenticación y recuperación de contraseña.

Se recomienda utilizar `express-rate-limit`, complementado con controles progresivos ante intentos repetidos.

## 9.6. Exposición de información

Se deberá evitar:

- Publicar archivos `.env`.
- Exponer credenciales en repositorios.
- Mostrar errores técnicos en producción.
- Incluir secretos en el frontend.
- Entregar información innecesaria en las respuestas API.

# 10. Seguridad de inventario y operaciones críticas

Las operaciones de inventario requieren controles adicionales porque afectan recursos físicos y costos.

Se deberá garantizar:

1. Validación de permisos para entradas, salidas y ajustes.
2. Control de existencias disponibles.
3. Prevención de cantidades negativas, salvo política expresa.
4. Uso de transacciones para operaciones relacionadas.
5. Prevención de duplicación de movimientos.
6. Conservación de movimientos confirmados.
7. Registro del usuario responsable.
8. Trazabilidad de las reservas y liberaciones.
9. Validación de transferencias entre almacenes.
10. Registro de correcciones mediante operaciones compensatorias.

Las operaciones críticas deberán implementar controles de concurrencia e idempotencia cuando corresponda.

# 11. Seguridad de documentos y archivos

Los archivos cargados a NodoExecute deberán someterse a controles de seguridad.

Medidas:

- Validar extensiones y tipos MIME.
- Comprobar el contenido real del archivo cuando sea posible.
- Establecer límites de tamaño.
- Generar nombres internos seguros.
- Evitar nombres proporcionados directamente por el usuario como rutas de almacenamiento.
- Almacenar archivos fuera del directorio público.
- Controlar permisos de descarga.
- Utilizar enlaces temporales cuando se requiera acceso externo.
- Considerar análisis antivirus para archivos recibidos.
- Registrar cargas y eliminaciones relevantes.

Los metadatos de los documentos deberán almacenarse en PostgreSQL, mientras que los archivos podrán conservarse en un servicio de almacenamiento independiente.

# 12. Seguridad de comunicaciones

Todas las comunicaciones de producción deberán utilizar HTTPS.

Se recomienda:

- Redirigir HTTP a HTTPS.
- Configurar certificados TLS válidos.
- Utilizar encabezados de seguridad.
- Restringir CORS a los orígenes autorizados.
- No permitir orígenes arbitrarios con credenciales.
- Evitar transmitir secretos en parámetros URL.
- Proteger las conexiones a PostgreSQL.

# 13. Encabezados de seguridad

Se recomienda utilizar **Helmet** para establecer encabezados de seguridad HTTP.

La configuración deberá contemplar:

- Content-Security-Policy.
- Strict-Transport-Security.
- X-Content-Type-Options.
- Referrer-Policy.
- Protección contra framing no autorizado.

La política CSP deberá ajustarse a los recursos realmente utilizados por la aplicación, evitando configuraciones excesivamente permisivas.

# 14. Gestión de secretos y variables de entorno

Las credenciales y secretos deberán administrarse mediante variables de entorno o un gestor de secretos.

Ejemplos:

- `DATABASE_URL`
- `SESSION_SECRET`
- `SMTP_HOST`
- `SMTP_USER`
- `SMTP_PASSWORD`
- `STORAGE_ACCESS_KEY`
- `STORAGE_SECRET_KEY`

Reglas:

1. No incluir secretos en Git.
2. No compartir credenciales en archivos públicos.
3. No imprimir secretos en consola.
4. Utilizar credenciales diferentes para desarrollo y producción.
5. Rotar secretos ante sospechas de exposición.
6. Restringir los permisos de las cuentas de servicio.
7. Mantener un archivo `.env.example` sin valores reales.

# 15. Auditoría y registro de actividad

NodoExecute deberá registrar las acciones relevantes para facilitar investigaciones y supervisión.

Se utilizará la tabla `audit_logs` definida en `DATABASE.md`.

Acciones que deberán auditarse:

- Inicio y cierre de sesión.
- Cambios de contraseña.
- Creación y modificación de usuarios.
- Cambios de roles y permisos.
- Publicación de procesos.
- Asignación de tareas.
- Cambios de estados importantes.
- Confirmación de movimientos de inventario.
- Ajustes de existencias.
- Aprobaciones de compras.
- Modificaciones de presupuestos.
- Accesos y cambios administrativos sensibles.

Los registros deberán conservar información suficiente para identificar:

- Quién realizó la acción.
- Qué acción realizó.
- Sobre qué entidad.
- Cuándo ocurrió.
- Qué valores cambiaron, cuando corresponda.

No deberán almacenarse contraseñas, tokens de sesión ni secretos en los registros.

# 16. Monitoreo y detección de incidentes

Se deberán implementar mecanismos para identificar comportamientos anormales.

Eventos que pueden generar alertas:

- Intentos repetidos de inicio de sesión.
- Accesos desde sesiones revocadas.
- Solicitudes no autorizadas reiteradas.
- Cambios inesperados de privilegios.
- Errores internos repetitivos.
- Operaciones inusuales de inventario.
- Intentos de acceso entre organizaciones.
- Cargas de archivos sospechosos.

Los registros de monitoreo deberán protegerse y tener una política de retención definida.

# 17. Copias de seguridad y recuperación

La disponibilidad y recuperación de la información forman parte de la seguridad.

Se deberán establecer:

- Copias de seguridad automáticas.
- Retención según las necesidades del negocio.
- Protección de las copias.
- Control de acceso a respaldos.
- Pruebas periódicas de restauración.
- Procedimientos de recuperación.
- Objetivos de recuperación RPO y RTO.

No se considerará suficiente disponer de copias de seguridad si nunca se ha comprobado su restauración.

# 18. Pruebas de seguridad

La seguridad deberá verificarse durante el desarrollo y antes de las publicaciones importantes.

Herramientas recomendadas:

| Herramienta | Uso |
|---|---|
| OWASP ZAP | Análisis dinámico de vulnerabilidades |
| Postman | Verificación de autorización y respuestas API |
| Jest | Pruebas automatizadas de seguridad |
| Supertest | Pruebas de rutas y middleware |
| Playwright | Pruebas de seguridad en flujos web |
| npm audit | Revisión de dependencias |
| Snyk | Análisis de dependencias y vulnerabilidades |
| Helmet | Configuración de encabezados de seguridad |

Las pruebas deberán incluir:

- Autenticación.
- Autorización.
- Acceso entre organizaciones.
- Validación de entradas.
- Protección CSRF.
- Prevención de XSS.
- Prevención de inyección SQL.
- Control de sesiones.
- Seguridad de archivos.
- Restricciones de inventario.
- Exposición de información sensible.

Los análisis deberán realizarse en entornos autorizados y controlados.

# 19. Organización técnica de seguridad

Se recomienda organizar los componentes de seguridad de la siguiente manera:

```text
src/
├── core/
│   └── security/
│       ├── authentication/
│       ├── authorization/
│       ├── permissions/
│       ├── sessions/
│       ├── csrf/
│       ├── validation/
│       ├── rate-limit/
│       └── audit/
│
├── modules/
│   └── auth/
│       ├── domain/
│       ├── application/
│       ├── infrastructure/
│       └── presentation/
│
└── interfaces/
    └── http/
        ├── middleware/
        ├── routes/
        └── error-handlers/
```

La ubicación definitiva de cada componente deberá respetar las dependencias de Clean Architecture.

Los módulos funcionales no deberán implementar mecanismos de autenticación independientes ni duplicar la lógica central de autorización.

# 20. Criterios de aceptación

La seguridad de NodoExecute se considerará preparada para una primera publicación cuando:

- Las contraseñas se almacenen mediante hash seguro.
- La autenticación esté implementada y probada.
- Las sesiones estén protegidas.
- Las rutas privadas requieran autenticación.
- Los permisos se validen en el servidor.
- Exista aislamiento entre organizaciones.
- Los datos recibidos sean validados.
- Se implementen controles contra CSRF cuando corresponda.
- Los encabezados de seguridad estén configurados.
- Los errores no expongan información sensible.
- Las operaciones críticas utilicen transacciones.
- Los documentos tengan controles de acceso.
- Las acciones sensibles se registren en auditoría.
- Las credenciales estén protegidas.
- Exista una estrategia de copias de seguridad.
- Se hayan ejecutado pruebas de seguridad.

# 21. Decisiones técnicas

| Área | Decisión |
|---|---|
| Autenticación web | Sesiones administradas por servidor |
| Contraseñas | Argon2id |
| Sesiones | express-session con almacenamiento persistente |
| Autorización | RBAC con permisos y alcance |
| Validación | Zod |
| Protección HTTP | Helmet |
| Protección contra fuerza bruta | express-rate-limit |
| Protección CSRF | Tokens CSRF y validación de origen |
| Base de datos | PostgreSQL |
| Acceso a datos | Sequelize |
| Aislamiento | organization_id y controles de autorización |
| Protección adicional | Evaluación de RLS |
| Auditoría | audit_logs |
| Archivos | Almacenamiento privado y controlado |
| Pruebas | Jest, Supertest, Playwright y OWASP ZAP |
| Transporte | HTTPS |

# 22. Conclusión

La seguridad de NodoExecute deberá implementarse como una responsabilidad transversal de toda la plataforma.

La autenticación permitirá verificar la identidad de los usuarios; la autorización determinará las operaciones permitidas; el aislamiento organizacional protegerá la información empresarial; y la auditoría permitirá conservar evidencia de las acciones relevantes.

La aplicación de estos mecanismos deberá realizarse desde las primeras etapas de desarrollo, evitando incorporar la seguridad como una corrección posterior.

**Fin del documento — SECURITY.md**

**NodoExecute — Organiza. Conecta. Ejecuta.**