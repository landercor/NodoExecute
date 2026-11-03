# NodoExecute — Reglas de Negocio

**Nombre del proyecto:** NodoExecute  
**Lema:** Organiza. Conecta. Ejecuta.  
**Documento:** Reglas de Negocio  
**Archivo:** `BUSINESS_RULES.md`  
**Versión:** 1.0  
**Estado:** Documento base de reglas de negocio

---

# 1. Introducción

Este documento establece las reglas de negocio que regulan el funcionamiento de NodoExecute.

Las reglas de negocio representan las condiciones, restricciones, comportamientos y procedimientos que deben respetarse durante las operaciones del sistema.

Su propósito es garantizar que los procesos, proyectos, nodos, tareas, usuarios, recursos e inventarios funcionen de manera coherente y controlada.

Estas reglas deberán implementarse principalmente en la capa de dominio y aplicación, evitando que dependan de la interfaz gráfica o de los mecanismos de persistencia.

# 2. Objetivos

1. Definir las condiciones necesarias para realizar operaciones.
2. Establecer restricciones sobre los datos.
3. Controlar los estados y transiciones de las actividades.
4. Garantizar la integridad de los procesos.
5. Regular la asignación de responsabilidades.
6. Establecer las reglas de utilización de recursos.
7. Garantizar la trazabilidad de las operaciones.
8. Definir las condiciones de integración entre módulos.
9. Evitar inconsistencias y operaciones no autorizadas.
10. Proporcionar criterios para implementar y probar las funcionalidades.

# 3. Principios generales del negocio

Todas las operaciones de NodoExecute deberán respetar los siguientes principios:

### 3.1. Integridad

Los datos deben mantenerse consistentes durante todas las operaciones.

### 3.2. Trazabilidad

Las operaciones importantes deben permitir identificar quién realizó una acción, cuándo la realizó y qué información fue modificada.

### 3.3. Responsabilidad

Toda actividad ejecutable debe tener un responsable o un mecanismo explícito de asignación.

### 3.4. Control de acceso

Cada usuario solamente podrá ejecutar operaciones autorizadas.

### 3.5. Consistencia operativa

Las operaciones relacionadas deben mantener coherencia entre sus estados y resultados.

### 3.6. No duplicación

El sistema debe prevenir registros duplicados cuando una operación de negocio requiera unicidad.

### 3.7. Historial

Los cambios importantes deben conservar información suficiente para reconstruir la evolución de los registros.

# 4. Reglas generales de organizaciones y usuarios

## 4.1. Organizaciones

**ORG-001.** Toda organización deberá tener un identificador único.

**ORG-002.** Una organización deberá contar con un nombre y la información institucional obligatoria.

**ORG-003.** Los usuarios podrán pertenecer a una o varias organizaciones, según las políticas de acceso.

**ORG-004.** Los datos de una organización no podrán ser consultados o modificados por usuarios externos sin autorización.

**ORG-005.** Una organización desactivada no podrá iniciar nuevas operaciones, salvo las excepciones administrativas definidas.

**ORG-006.** La eliminación de una organización deberá estar restringida si existen operaciones o registros históricos asociados.

## 4.2. Usuarios

**USR-001.** Cada usuario deberá contar con un identificador único.

**USR-002.** Las credenciales deberán almacenarse de forma segura.

**USR-003.** Un usuario deberá tener una cuenta activa para iniciar operaciones.

**USR-004.** Los usuarios deberán tener una relación válida con la organización en cuyo contexto trabajan.

**USR-005.** Las cuentas desactivadas no podrán iniciar sesión.

**USR-006.** La eliminación de usuarios con historial de operaciones deberá realizarse mediante desactivación o eliminación lógica cuando corresponda.

**USR-007.** Las operaciones realizadas por usuarios deberán poder identificarse en el historial de auditoría.

# 5. Reglas de roles y permisos

**PER-001.** Todo acceso a una funcionalidad protegida deberá verificar los permisos correspondientes.

**PER-002.** Los permisos deberán asociarse a roles o políticas autorizadas.

**PER-003.** Un usuario podrá tener diferentes roles según la organización a la que pertenezca.

**PER-004.** Los permisos deberán aplicarse también a las operaciones sobre registros específicos.

**PER-005.** Un usuario no podrá asignar permisos que excedan sus propias facultades administrativas, salvo una autorización superior definida.

**PER-006.** Las modificaciones de roles y permisos deberán quedar registradas.

**PER-007.** Las restricciones de acceso deberán validarse en el servidor, no solamente en la interfaz.

# 6. Reglas de organización y planificación

Este módulo permite definir la estructura de trabajo de la empresa antes de ejecutar sus actividades.

## 6.1. Procesos

**PRO-001.** Todo proceso deberá pertenecer a una organización.

**PRO-002.** Todo proceso deberá tener un nombre y una descripción.

**PRO-003.** Todo proceso deberá tener un objetivo y un alcance definidos antes de su aprobación.

**PRO-004.** Todo proceso deberá contar con un responsable o área responsable.

**PRO-005.** Un proceso podrá contener uno o varios procedimientos.

**PRO-006.** Un proceso podrá relacionarse con otros procesos.

**PRO-007.** Los procesos podrán tener versiones para conservar sus modificaciones.

**PRO-008.** Un proceso aprobado y utilizado en ejecuciones activas no deberá modificarse retroactivamente de forma que altere las ejecuciones existentes.

**PRO-009.** Los cambios estructurales importantes deberán generar una nueva versión.

**PRO-010.** Un proceso archivado no podrá utilizarse para crear nuevas ejecuciones, salvo autorización específica.

## 6.2. Procedimientos

**PRC-001.** Un procedimiento deberá pertenecer a un proceso.

**PRC-002.** Todo procedimiento deberá tener un nombre y una finalidad.

**PRC-003.** Un procedimiento deberá contener pasos ordenados o relaciones de dependencia explícitas.

**PRC-004.** Un procedimiento podrá incluir instrucciones, documentos y criterios de cumplimiento.

**PRC-005.** Un procedimiento podrá requerir responsables, aprobaciones y recursos.

**PRC-006.** Un procedimiento no podrá ejecutarse si pertenece a un proceso que no se encuentra aprobado o habilitado.

## 6.3. Pasos de los procedimientos

**PAS-001.** Cada paso deberá pertenecer a un procedimiento.

**PAS-002.** Cada paso deberá tener un identificador único dentro del contexto correspondiente.

**PAS-003.** Cada paso deberá tener una descripción de la acción que debe realizarse.

**PAS-004.** Los pasos deberán tener un orden o dependencias definidas.

**PAS-005.** Un paso podrá depender de uno o varios pasos anteriores.

**PAS-006.** Un paso no podrá ejecutarse mientras sus dependencias obligatorias no estén satisfechas.

**PAS-007.** Los pasos podrán requerir responsables, recursos y aprobaciones.

**PAS-008.** Los pasos podrán convertirse en nodos ejecutables.

**PAS-009.** La conversión de un paso en nodo deberá conservar la referencia al proceso, procedimiento y paso de origen.

**PAS-010.** Una modificación del diseño original no deberá alterar automáticamente una ejecución que ya comenzó.

## 6.4. Aprobación y publicación de procesos

**APR-001.** Un proceso podrá encontrarse en estado borrador, en revisión, aprobado, publicado, suspendido o archivado.

**APR-002.** Solamente los usuarios autorizados podrán aprobar procesos.

**APR-003.** Un proceso deberá cumplir los requisitos obligatorios antes de ser aprobado.

**APR-004.** Un proceso aprobado podrá publicarse para generar nuevas ejecuciones.

**APR-005.** La suspensión de un proceso deberá impedir nuevas ejecuciones, sin eliminar automáticamente las existentes.

**APR-006.** Toda aprobación deberá registrar al usuario responsable, fecha y versión aprobada.

# 7. Reglas del sistema de nodos

Los nodos constituyen el mecanismo central para representar elementos y relaciones dentro de NodoExecute.

## 7.1. Creación de nodos

**NOD-001.** Todo nodo deberá pertenecer a una organización.

**NOD-002.** Todo nodo deberá tener un identificador único.

**NOD-003.** Todo nodo deberá tener un tipo definido.

**NOD-004.** Todo nodo deberá tener un nombre o título.

**NOD-005.** Un nodo podrá pertenecer jerárquicamente a otro nodo, cuando su tipo lo permita.

**NOD-006.** Un nodo podrá relacionarse con otros nodos sin que exista necesariamente una relación padre-hijo.

**NOD-007.** Los tipos de nodo deberán determinar las propiedades y operaciones permitidas.

**NOD-008.** Un nodo no podrá relacionarse con registros de otra organización sin una autorización y mecanismo explícito de integración.

## 7.2. Jerarquía de nodos

**JER-001.** Un nodo podrá tener nodos hijos.

**JER-002.** Un nodo podrá tener un nodo padre cuando su tipo admita jerarquía.

**JER-003.** No se permitirán relaciones jerárquicas circulares.

**JER-004.** Un nodo no podrá ser padre de sí mismo.

**JER-005.** La eliminación o traslado de un nodo deberá considerar las relaciones existentes.

**JER-006.** Las modificaciones de jerarquía deberán conservar la integridad de los registros relacionados.

## 7.3. Relaciones entre nodos

**REL-001.** Las relaciones deberán tener un tipo definido.

**REL-002.** Las relaciones deberán identificar los nodos de origen y destino.

**REL-003.** Las relaciones de dependencia deberán respetar las condiciones de ejecución.

**REL-004.** No se permitirán dependencias circulares que impidan completar las actividades.

**REL-005.** Las relaciones podrán tener atributos propios cuando el tipo de relación lo requiera.

**REL-006.** La eliminación de una relación no deberá eliminar automáticamente los nodos relacionados.

**REL-007.** Los permisos de acceso deberán aplicarse también a las relaciones y recursos vinculados.

## 7.4. Tipos de relaciones

Se contemplan inicialmente los siguientes tipos:

- PADRE_DE.
- DEPENDE_DE.
- REQUIERE.
- PERTENECE_A.
- ASIGNADO_A.
- UTILIZA_RECURSO.
- APROBADO_POR.
- RELACIONADO_CON.
- BLOQUEA.
- HACE_USO_DE.

Las relaciones definitivas deberán validarse según los tipos de nodos y las reglas de cada dominio.

# 8. Reglas de tareas y actividades

## 8.1. Creación de tareas

**TAR-001.** Toda tarea deberá pertenecer a una organización.

**TAR-002.** Toda tarea deberá tener un título y una descripción de su finalidad.

**TAR-003.** Toda tarea deberá contar con un estado inicial.

**TAR-004.** Una tarea podrá estar relacionada con un proceso, proyecto o nodo superior.

**TAR-005.** Una tarea podrá tener subtareas.

**TAR-006.** Una tarea podrá tener uno o varios participantes, pero deberá definirse un responsable principal cuando su ejecución lo requiera.

**TAR-007.** Una tarea podrá incluir fechas, prioridades y duración estimada.

**TAR-008.** Una tarea podrá requerir recursos y aprobaciones.

## 8.2. Asignación de tareas

**ASI-001.** Una tarea solamente podrá asignarse a usuarios autorizados dentro de la organización correspondiente.

**ASI-002.** El usuario asignado deberá tener una cuenta activa.

**ASI-003.** Una tarea podrá tener un responsable principal y varios colaboradores.

**ASI-004.** Los cambios de responsable deberán registrarse.

**ASI-005.** El responsable podrá ser sustituido mediante una reasignación autorizada.

**ASI-006.** La reasignación no deberá eliminar el historial de responsables anteriores.

**ASI-007.** Una tarea sin responsable podrá permanecer en estado pendiente de asignación.

## 8.3. Dependencias

**DEP-001.** Una tarea podrá depender de una o varias tareas.

**DEP-002.** Una tarea bloqueada por una dependencia obligatoria no podrá comenzar.

**DEP-003.** La dependencia deberá considerarse satisfecha cuando la tarea precedente alcance el estado que la regla haya definido como válido.

**DEP-004.** La finalización de una tarea podrá habilitar automáticamente las tareas dependientes.

**DEP-005.** No se permitirán ciclos de dependencias.

**DEP-006.** Las dependencias deberán conservarse durante las modificaciones de tareas.

## 8.4. Estados de tareas

Los estados iniciales propuestos son:

- Pendiente de asignación.
- Pendiente.
- En ejecución.
- En revisión.
- Bloqueada.
- Completada.
- Cancelada.

### Transiciones permitidas

| Estado actual | Estado siguiente | Condición |
|---|---|---|
| Pendiente de asignación | Pendiente | Se asigna responsable. |
| Pendiente | En ejecución | Se cumplen las condiciones de inicio. |
| En ejecución | En revisión | Se solicita validación. |
| En revisión | Completada | Se aprueba el resultado. |
| En revisión | En ejecución | Se requieren correcciones. |
| Pendiente | Bloqueada | Aparece una condición de bloqueo. |
| En ejecución | Bloqueada | Se identifica un impedimento. |
| Bloqueada | Pendiente | Se resuelve el bloqueo y no había comenzado. |
| Bloqueada | En ejecución | Se resuelve el bloqueo de una tarea iniciada. |
| Pendiente | Cancelada | Se autoriza la cancelación. |
| En ejecución | Cancelada | Se autoriza la cancelación. |

Las transiciones deberán validarse en el dominio y respetar los permisos y condiciones específicas de cada tipo de tarea.

## 8.5. Finalización de tareas

**FIN-001.** Una tarea solamente podrá completarse cuando se hayan cumplido sus condiciones obligatorias.

**FIN-002.** Una tarea podrá requerir evidencia de ejecución.

**FIN-003.** Una tarea podrá requerir aprobación de un supervisor.

**FIN-004.** Una tarea completada deberá conservar su historial.

**FIN-005.** Una modificación posterior al resultado deberá registrarse como una nueva operación.

**FIN-006.** Completar una tarea deberá generar un acontecimiento que pueda ser utilizado por otros módulos.

## 8.6. Cancelación de tareas

**CAN-001.** Una tarea podrá cancelarse únicamente mediante una operación autorizada.

**CAN-002.** La cancelación deberá registrar motivo, responsable y fecha.

**CAN-003.** La cancelación de una tarea no deberá eliminar sus registros históricos.

**CAN-004.** Las tareas dependientes deberán reevaluarse cuando se cancele una tarea precedente.

**CAN-005.** Los recursos reservados deberán liberarse o gestionarse mediante el procedimiento correspondiente.

# 9. Reglas de proyectos

**PROY-001.** Todo proyecto deberá pertenecer a una organización.

**PROY-002.** Todo proyecto deberá tener un nombre, objetivo y responsable.

**PROY-003.** Un proyecto podrá contener procesos, nodos y tareas.

**PROY-004.** Un proyecto podrá tener uno o varios equipos participantes.

**PROY-005.** Un proyecto deberá tener fechas planificadas cuando su naturaleza lo requiera.

**PROY-006.** El progreso del proyecto deberá calcularse mediante una estrategia definida.

**PROY-007.** Los cambios importantes en el alcance deberán quedar registrados.

**PROY-008.** Un proyecto no podrá cerrarse mientras existan entregables obligatorios pendientes, salvo autorización excepcional.

**PROY-009.** Un proyecto cerrado conservará su historial y resultados.

**PROY-010.** Los costos y recursos utilizados podrán asociarse al proyecto.

# 10. Reglas de inventario

El inventario deberá mantener la integridad de las existencias y registrar todas las operaciones que las modifiquen.

## 10.1. Productos

**INV-001.** Todo producto deberá pertenecer a una organización.

**INV-002.** Todo producto deberá tener un identificador único.

**INV-003.** Los productos podrán clasificarse por categorías.

**INV-004.** Los productos deberán tener una unidad de medida definida cuando corresponda.

**INV-005.** El SKU deberá ser único dentro del ámbito organizacional definido.

**INV-006.** Los productos desactivados no podrán utilizarse en nuevas operaciones ordinarias.

## 10.2. Existencias

**EXI-001.** Las existencias deberán representar cantidades verificables.

**EXI-002.** El sistema deberá diferenciar cantidades físicas, reservadas y bloqueadas.

**EXI-003.** La cantidad disponible se calculará como:

Disponible = Existencia física - Cantidad reservada - Cantidad bloqueada.

**EXI-004.** No se permitirán existencias negativas, salvo que una política excepcional lo autorice explícitamente.

**EXI-005.** Las actualizaciones de existencias deberán realizarse mediante movimientos válidos.

**EXI-006.** No se permitirá modificar directamente la cantidad de existencias para corregir una operación histórica.

## 10.3. Reservas

**RES-001.** Una reserva deberá estar asociada a una solicitud, tarea, proyecto u operación autorizada.

**RES-002.** No se podrá reservar una cantidad superior a la disponible.

**RES-003.** Toda reserva deberá identificar el producto, cantidad y ubicación cuando corresponda.

**RES-004.** Las reservas podrán tener vencimiento.

**RES-005.** Las reservas podrán liberarse cuando se cancelen o modifiquen las necesidades.

**RES-006.** El consumo de materiales reservados deberá registrarse mediante un movimiento de salida.

## 10.4. Movimientos

**MOV-001.** Toda modificación de existencias deberá generar un movimiento.

**MOV-002.** Los movimientos deberán tener un tipo definido.

**MOV-003.** Los movimientos deberán registrar fecha, responsable, producto, cantidad y origen o destino cuando corresponda.

**MOV-004.** Los movimientos confirmados no podrán eliminarse físicamente.

**MOV-005.** Las correcciones deberán realizarse mediante movimientos compensatorios.

**MOV-006.** Las operaciones de movimiento deberán ejecutarse mediante transacciones.

**MOV-007.** Las operaciones deberán prevenir duplicaciones por reintentos de solicitudes.

**MOV-008.** Los movimientos deberán conservar su trazabilidad.

## 10.5. Transferencias

**TRA-001.** Una transferencia deberá identificar el almacén y ubicación de origen y destino.

**TRA-002.** No se podrá transferir más cantidad que la disponible en el origen.

**TRA-003.** La transferencia deberá conservar la identidad del producto y, cuando corresponda, su lote o serie.

**TRA-004.** Las transferencias deberán registrarse de forma consistente.

**TRA-005.** Una transferencia entre organizaciones distintas requerirá un procedimiento explícito de autorización y registro.

# 11. Reglas de compras y proveedores

## 11.1. Solicitudes de compra

**COM-001.** Toda solicitud deberá tener una organización solicitante.

**COM-002.** Toda solicitud deberá identificar los productos o servicios requeridos.

**COM-003.** Una solicitud podrá estar asociada a un proyecto, proceso o tarea.

**COM-004.** Las solicitudes deberán pasar por los niveles de aprobación definidos.

**COM-005.** Una solicitud aprobada podrá convertirse en una orden de compra.

**COM-006.** La cancelación deberá conservar el historial.

## 11.2. Órdenes de compra

**ORD-001.** Toda orden deberá estar asociada a un proveedor.

**ORD-002.** Toda orden deberá tener productos o servicios definidos.

**ORD-003.** Una orden deberá respetar los permisos y límites presupuestarios aplicables.

**ORD-004.** La recepción deberá registrar las cantidades realmente recibidas.

**ORD-005.** Las diferencias entre cantidades solicitadas y recibidas deberán quedar registradas.

## 11.3. Proveedores

**PRV-001.** Cada proveedor deberá tener un identificador único dentro de la organización.

**PRV-002.** Los proveedores podrán asociarse a productos y servicios.

**PRV-003.** Los proveedores inactivos no podrán seleccionarse para nuevas órdenes ordinarias.

**PRV-004.** Las evaluaciones y cambios importantes deberán conservarse en el historial.

# 12. Reglas de activos y mantenimiento

## 12.1. Activos

**ACT-001.** Todo activo deberá pertenecer a una organización.

**ACT-002.** Todo activo deberá tener un identificador único.

**ACT-003.** Los activos podrán asignarse a usuarios, equipos o ubicaciones.

**ACT-004.** Un activo no podrá tener asignaciones incompatibles simultáneas.

**ACT-005.** Los cambios de ubicación y responsable deberán registrarse.

**ACT-006.** Un activo dado de baja no podrá recibir nuevas asignaciones ordinarias.

## 12.2. Mantenimiento

**MAN-001.** Toda orden de mantenimiento deberá estar asociada a un activo cuando corresponda.

**MAN-002.** Toda orden deberá tener una descripción y tipo de mantenimiento.

**MAN-003.** Las órdenes podrán requerir responsables, materiales y herramientas.

**MAN-004.** Los materiales utilizados deberán descontarse del inventario mediante movimientos válidos.

**MAN-005.** El cierre de una orden deberá registrar el resultado de la intervención.

**MAN-006.** Los mantenimientos realizados deberán conservarse en el historial del activo.

# 13. Reglas de presupuestos y costos

**COS-001.** Todo presupuesto deberá pertenecer a una organización.

**COS-002.** Los presupuestos podrán asociarse a proyectos, procesos o actividades.

**COS-003.** Los costos estimados deberán diferenciarse de los costos reales.

**COS-004.** El consumo de materiales podrá generar costos asociados a una actividad.

**COS-005.** Las modificaciones presupuestarias deberán estar autorizadas.

**COS-006.** Los resultados deberán conservar información histórica.

**COS-007.** Las operaciones financieras deberán utilizar una moneda y reglas de precisión definidas.

# 14. Reglas de automatización y eventos

**AUT-001.** Toda automatización deberá tener una condición de activación definida.

**AUT-002.** Toda automatización deberá tener una o varias acciones autorizadas.

**AUT-003.** Las automatizaciones deberán ejecutarse dentro de los permisos y límites establecidos.

**AUT-004.** Una automatización deberá registrar su resultado.

**AUT-005.** Los fallos deberán poder identificarse y gestionarse.

**AUT-006.** Las acciones críticas deberán prevenir ejecuciones duplicadas.

**AUT-007.** Las automatizaciones no deberán omitir las validaciones normales del dominio.

**AUT-008.** Una automatización desactivada no deberá iniciar nuevas ejecuciones.

Los eventos internos deberán representar acontecimientos que ya hayan ocurrido y hayan sido confirmados.

Ejemplos:

- OrganizationCreated.
- ProcessApproved.
- TaskAssigned.
- TaskCompleted.
- InventoryReserved.
- StockMovementRegistered.
- PurchaseApproved.
- MaintenanceCompleted.

# 15. Reglas de notificaciones

**NOT-001.** Las notificaciones deberán dirigirse a usuarios identificables.

**NOT-002.** Las notificaciones deberán generarse a partir de acontecimientos o reglas autorizadas.

**NOT-003.** Las notificaciones deberán respetar las preferencias del usuario.

**NOT-004.** Una notificación no deberá conceder permisos ni ejecutar operaciones por sí misma.

**NOT-005.** El sistema podrá registrar el estado de entrega y lectura.

**NOT-006.** Los errores de envío deberán gestionarse sin revertir operaciones de negocio que ya hayan sido confirmadas.

# 16. Reglas de documentos

**DOC-001.** Todo documento deberá tener un identificador único.

**DOC-002.** Todo documento deberá registrar su organización propietaria.

**DOC-003.** Un documento podrá asociarse a procesos, tareas, proyectos y otros registros.

**DOC-004.** El acceso deberá respetar los permisos correspondientes.

**DOC-005.** Las versiones deberán conservarse cuando el tipo de documento lo requiera.

**DOC-006.** Los documentos no deberán quedar accesibles públicamente sin autorización.

**DOC-007.** La eliminación deberá considerar las referencias existentes y las políticas de retención.

# 17. Reglas de auditoría

**AUD-001.** Las operaciones críticas deberán generar registros de auditoría.

**AUD-002.** Los registros deberán identificar al usuario o proceso responsable.

**AUD-003.** Los registros deberán contener fecha y tipo de operación.

**AUD-004.** Los registros deberán identificar el objeto afectado.

**AUD-005.** Las modificaciones importantes deberán conservar información suficiente del cambio.

**AUD-006.** Los registros de auditoría no deberán modificarse mediante operaciones ordinarias.

**AUD-007.** Los accesos a la información de auditoría deberán estar restringidos.

# 18. Reglas de reportes e indicadores

**REP-001.** Los indicadores deberán tener una definición y fórmula identificables.

**REP-002.** Los reportes deberán respetar los permisos de acceso.

**REP-003.** Los resultados deberán considerar la organización y el período consultado.

**REP-004.** Los cálculos deberán diferenciar datos planificados de datos reales.

**REP-005.** Los reportes deberán identificar su período de referencia.

**REP-006.** Los datos históricos no deberán modificarse por cambios posteriores en la configuración de indicadores.

# 19. Reglas de integración entre módulos

**INT-001.** Los módulos deberán comunicarse mediante interfaces o contratos definidos.

**INT-002.** Un módulo no deberá modificar directamente las estructuras internas de otro módulo.

**INT-003.** Las operaciones que involucren varios módulos deberán establecer claramente sus responsabilidades.

**INT-004.** Las operaciones críticas deberán utilizar transacciones cuando compartan una misma unidad de consistencia.

**INT-005.** Los eventos deberán publicarse después de confirmar las operaciones correspondientes.

**INT-006.** Los consumidores de eventos deberán poder gestionar reintentos y duplicaciones.

**INT-007.** Las integraciones deberán respetar los límites de organización.

**INT-008.** Los errores de procesamiento asíncrono deberán registrarse y permitir su recuperación.

# 20. Reglas de eliminación y conservación de información

**ELI-001.** Los registros con dependencias no deberán eliminarse sin evaluar sus relaciones.

**ELI-002.** Los registros históricos importantes deberán conservarse.

**ELI-003.** Las operaciones de eliminación lógica deberán distinguirse de la eliminación física.

**ELI-004.** Los movimientos confirmados de inventario no deberán eliminarse físicamente.

**ELI-005.** Las tareas y procesos ejecutados deberán conservar su historial.

**ELI-006.** Los datos personales deberán gestionarse conforme a las obligaciones legales y políticas de conservación aplicables.

# 21. Reglas de concurrencia y consistencia

**CON-001.** Las operaciones que modifiquen recursos compartidos deberán controlar la concurrencia.

**CON-002.** Dos solicitudes simultáneas no podrán reservar una cantidad superior a la disponible.

**CON-003.** Las operaciones críticas deberán ejecutarse mediante mecanismos de consistencia de base de datos.

**CON-004.** Las solicitudes susceptibles de reintento deberán utilizar mecanismos de idempotencia cuando corresponda.

**CON-005.** Los conflictos de actualización deberán detectarse y gestionarse.

**CON-006.** Los cambios de estado deberán validar el estado actual antes de aplicar una transición.

# 22. Reglas de ciclo de vida de los procesos

El ciclo de vida general de un proceso será:

1. Creación.
2. Configuración.
3. Definición de procedimientos.
4. Definición de pasos.
5. Asignación de responsabilidades.
6. Identificación de recursos.
7. Revisión.
8. Aprobación.
9. Publicación.
10. Generación de ejecuciones.
11. Seguimiento.
12. Evaluación.
13. Mejora o archivado.

Un proceso podrá requerir menos etapas según su naturaleza y configuración.

# 23. Reglas de ciclo de vida de las tareas

El ciclo de vida general de una tarea será:

1. Creación.
2. Definición de condiciones.
3. Asignación.
4. Verificación de dependencias.
5. Inicio.
6. Ejecución.
7. Registro de resultados.
8. Revisión cuando corresponda.
9. Finalización.
10. Auditoría e historial.

Las tareas podrán cancelarse o bloquearse según las condiciones de negocio.

# 24. Reglas de trazabilidad integral

NodoExecute deberá permitir reconstruir la relación entre la planificación y la ejecución.

Ejemplo:

```text
Organización
    |
    v
Proceso
    |
    v
Procedimiento
    |
    v
Paso
    |
    v
Nodo
    |
    v
Tarea
    |
    ├── Responsable
    ├── Equipo
    ├── Recursos
    ├── Documentos
    ├── Dependencias
    └── Resultado
```

El sistema deberá conservar las referencias necesarias para consultar el origen, la ejecución y el resultado de cada actividad.

# 25. Criterios de implementación de las reglas

Las reglas deberán implementarse de acuerdo con su naturaleza:

| Tipo de regla | Lugar de implementación |
|---|---|
| Reglas de negocio | Dominio |
| Coordinación de operaciones | Aplicación |
| Validación de entradas | Presentación y aplicación |
| Integridad referencial | Base de datos |
| Permisos de acceso | Seguridad y aplicación |
| Persistencia | Infraestructura |
| Auditoría | Aplicación e infraestructura |
| Automatizaciones | Aplicación y procesamiento asíncrono |

Las validaciones importantes no deberán depender exclusivamente de la interfaz.

# 26. Criterios de aceptación

Una funcionalidad se considerará conforme a las reglas de negocio cuando:

1. Respete las condiciones definidas.
2. Rechace operaciones no permitidas.
3. Mantenga la integridad de la información.
4. Registre los acontecimientos importantes.
5. Controle los permisos.
6. Gestione correctamente los estados.
7. Mantenga las relaciones entre módulos.
8. Permita recuperar operaciones cuando corresponda.
9. Disponga de pruebas que verifiquen sus reglas.
10. Mantenga coherencia con la arquitectura general.

# 27. Conclusión

Las reglas de negocio de NodoExecute establecen las condiciones que deberán respetarse durante la gestión de organizaciones, procesos, procedimientos, nodos, tareas, proyectos y recursos.

Estas reglas permitirán construir un sistema coherente, controlado y trazable, evitando inconsistencias y operaciones inválidas.

El documento servirá como referencia para implementar los casos de uso, entidades, servicios de dominio, restricciones de base de datos y pruebas automatizadas.

Las reglas podrán ampliarse a medida que se definan nuevos módulos y se identifiquen necesidades específicas de la operación empresarial.