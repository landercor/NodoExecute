# DATABASE.md
# Diseño de la Base de Datos — NodoExecute

**Proyecto:** NodoExecute  
**Lema:** Organiza. Conecta. Ejecuta.  
**Versión:** 1.0  
**Motor de base de datos:** PostgreSQL  
**ORM:** Sequelize  
**Estado:** Propuesta de diseño lógico

---

# 1. Introducción

Este documento define el diseño lógico de la base de datos de NodoExecute. Su finalidad es establecer las entidades, atributos, relaciones, restricciones e índices necesarios para almacenar y gestionar la información de la plataforma.

La base de datos debe permitir administrar organizaciones, usuarios, equipos, procesos, procedimientos, nodos, tareas, proyectos, inventarios, recursos y demás componentes del sistema.

El diseño se fundamenta en los principios establecidos en:

- `ARCHITECTURE.md`
- `MODULES.md`
- `BUSINESS_RULES.md`

La estructura propuesta debe garantizar integridad, consistencia, trazabilidad, seguridad y capacidad de crecimiento.

Este documento representa una propuesta lógica inicial. Antes de implementar las migraciones definitivas, las entidades y sus relaciones deberán validarse con los requisitos funcionales de cada módulo.

# 2. Objetivos

1. Definir las entidades principales de NodoExecute.
2. Establecer las relaciones entre los módulos.
3. Determinar los campos necesarios para cada entidad.
4. Definir claves primarias y foráneas.
5. Establecer restricciones para proteger la integridad de los datos.
6. Diseñar una estructura compatible con PostgreSQL y Sequelize.
7. Facilitar la implementación progresiva de los módulos.
8. Garantizar la trazabilidad de los procesos y operaciones.
9. Permitir la evolución de la plataforma sin comprometer los datos existentes.

# 3. Principios de diseño

## 3.1. Base de datos relacional

NodoExecute utilizará PostgreSQL como sistema de gestión de bases de datos relacional.

Las entidades se organizarán mediante tablas relacionadas a través de claves primarias y foráneas.

## 3.2. Separación por módulos

Las tablas se agruparán conceptualmente según el módulo funcional al que pertenecen.

Esta separación permitirá mantener una organización coherente con la arquitectura modular del proyecto.

## 3.3. Identificación de registros

Las entidades principales utilizarán identificadores únicos.

Se recomienda utilizar UUID como clave primaria para facilitar la generación de identificadores y evitar dependencias de secuencias numéricas entre módulos.

Tipo recomendado:

`UUID`

## 3.4. Trazabilidad

Las entidades que representen operaciones, procesos o cambios relevantes deberán conservar información sobre su creación, modificación y responsable.

Campos generales recomendados:

- `id`: identificador único.
- `created_at`: fecha de creación.
- `updated_at`: fecha de última modificación.
- `created_by`: usuario que creó el registro, cuando corresponda.
- `updated_by`: usuario que realizó la última modificación, cuando corresponda.

No todos los registros requieren todos estos campos. Se aplicarán según su naturaleza.

## 3.5. Separación organizacional

NodoExecute debe permitir que distintas organizaciones utilicen la plataforma sin mezclar sus datos.

Las entidades pertenecientes a una organización deberán incluir `organization_id`, directamente o mediante una relación verificable.

Las consultas y operaciones deberán validar el acceso a la organización correspondiente.

## 3.6. Conservación de información

No todas las entidades podrán eliminarse físicamente.

Los registros históricos, movimientos de inventario, auditorías y ejecuciones finalizadas deberán conservarse.

Se utilizará eliminación lógica únicamente donde resulte apropiado.

# 4. Modelo conceptual de datos

El modelo conceptual se organiza en los siguientes grupos:

| Grupo | Entidades principales |
|---|---|
| Identidad y acceso | Usuarios, organizaciones, membresías, equipos, roles y permisos |
| Organización y planificación | Procesos, versiones, procedimientos y pasos |
| Nodos y tareas | Nodos, ejecuciones, tareas, asignaciones y dependencias |
| Proyectos | Proyectos, hitos y entregables |
| Inventario | Productos, categorías, unidades y lotes |
| Almacenes | Almacenes, ubicaciones y existencias |
| Movimientos | Movimientos, detalles y reservas |
| Compras | Proveedores, órdenes y recepciones |
| Activos | Activos y mantenimientos |
| Finanzas | Presupuestos y costos |
| Servicios transversales | Documentos, notificaciones, eventos y auditoría |

# 5. Entidades y estructura de tablas

## 5.1. Identidad y acceso

### 5.1.1. Tabla: users

Almacena la información de las personas registradas en NodoExecute.

| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID | Identificador del usuario |
| first_name | VARCHAR(100) | Nombre |
| last_name | VARCHAR(100) | Apellido |
| email | VARCHAR(255) | Correo electrónico |
| password_hash | VARCHAR(255) | Contraseña cifrada mediante hash |
| phone | VARCHAR(30) | Teléfono |
| status | VARCHAR(30) | Estado de la cuenta |
| last_login_at | TIMESTAMP | Último acceso |
| created_at | TIMESTAMP | Fecha de creación |
| updated_at | TIMESTAMP | Fecha de actualización |

**Restricciones:**
- `id` es clave primaria.
- `email` debe ser único, considerando una normalización consistente.
- `password_hash` nunca almacenará contraseñas en texto plano.

### 5.1.2. Tabla: organizations

Registra las organizaciones que utilizan la plataforma.

| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID | Identificador |
| name | VARCHAR(150) | Nombre |
| legal_name | VARCHAR(200) | Razón social |
| tax_id | VARCHAR(50) | Identificación tributaria |
| email | VARCHAR(255) | Correo de contacto |
| phone | VARCHAR(30) | Teléfono |
| address | TEXT | Dirección |
| status | VARCHAR(30) | Estado |
| created_at | TIMESTAMP | Fecha de creación |
| updated_at | TIMESTAMP | Fecha de actualización |

### 5.1.3. Tabla: organization_members

Relaciona usuarios con organizaciones.

| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID | Identificador |
| organization_id | UUID | Organización |
| user_id | UUID | Usuario |
| status | VARCHAR(30) | Estado de membresía |
| joined_at | TIMESTAMP | Fecha de vinculación |
| created_at | TIMESTAMP | Fecha de creación |

**Restricción:** combinación única de `organization_id` y `user_id`.

### 5.1.4. Tabla: teams

Almacena los equipos de trabajo de cada organización.

| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID | Identificador |
| organization_id | UUID | Organización |
| name | VARCHAR(120) | Nombre del equipo |
| description | TEXT | Descripción |
| status | VARCHAR(30) | Estado |
| created_at | TIMESTAMP | Fecha de creación |
| updated_at | TIMESTAMP | Fecha de actualización |

### 5.1.5. Tabla: team_members

Relaciona usuarios con equipos.

| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID | Identificador |
| team_id | UUID | Equipo |
| user_id | UUID | Usuario |
| joined_at | TIMESTAMP | Fecha de incorporación |

**Restricción:** combinación única de `team_id` y `user_id`.

### 5.1.6. Tablas: roles, permissions y role_permissions

Permiten administrar los roles y permisos del sistema.

**roles**

| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID | Identificador |
| organization_id | UUID | Organización, cuando sea un rol personalizado |
| name | VARCHAR(100) | Nombre del rol |
| description | TEXT | Descripción |
| is_system | BOOLEAN | Indica si es un rol del sistema |

**permissions**

| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID | Identificador |
| code | VARCHAR(120) | Código único del permiso |
| module | VARCHAR(80) | Módulo |
| description | TEXT | Descripción |

**role_permissions**

| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID | Identificador |
| role_id | UUID | Rol |
| permission_id | UUID | Permiso |

La asignación de roles a usuarios y organizaciones deberá manejarse mediante una tabla de membresías o asignaciones de roles con alcance definido.

## 5.2. Organización y planificación

Este módulo almacena las definiciones que permiten diseñar procesos, procedimientos y pasos antes de ejecutarlos.

Es importante distinguir entre la definición de un proceso y su ejecución real.

### 5.2.1. Tabla: processes

Registra los procesos diseñados por una organización.

| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID | Identificador |
| organization_id | UUID | Organización |
| name | VARCHAR(150) | Nombre |
| description | TEXT | Descripción |
| status | VARCHAR(30) | Estado |
| current_version_id | UUID | Versión vigente, si corresponde |
| created_by | UUID | Usuario creador |
| created_at | TIMESTAMP | Fecha de creación |
| updated_at | TIMESTAMP | Fecha de actualización |

### 5.2.2. Tabla: process_versions

Conserva las versiones de los procesos.

| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID | Identificador |
| process_id | UUID | Proceso |
| version_number | INTEGER | Número de versión |
| description | TEXT | Descripción de la versión |
| status | VARCHAR(30) | Borrador, publicada o archivada |
| published_at | TIMESTAMP | Fecha de publicación |
| created_by | UUID | Usuario responsable |
| created_at | TIMESTAMP | Fecha de creación |

**Restricción:** combinación única de `process_id` y `version_number`.

Las ejecuciones deberán conservar la versión utilizada para evitar que las modificaciones posteriores alteren su historial.

### 5.2.3. Tabla: procedures

Almacena los procedimientos asociados a las versiones de procesos.

| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID | Identificador |
| process_version_id | UUID | Versión del proceso |
| name | VARCHAR(150) | Nombre |
| description | TEXT | Descripción |
| sequence_order | INTEGER | Orden |
| status | VARCHAR(30) | Estado |

### 5.2.4. Tabla: procedure_steps

Almacena los pasos que componen un procedimiento.

| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID | Identificador |
| procedure_id | UUID | Procedimiento |
| name | VARCHAR(150) | Nombre |
| description | TEXT | Descripción |
| sequence_order | INTEGER | Orden |
| estimated_duration | INTEGER | Duración estimada |
| responsible_role_id | UUID | Rol responsable, opcional |
| is_required | BOOLEAN | Indica si es obligatorio |

Los pasos podrán convertirse en nodos ejecutables, conservando una referencia a su definición original.

## 5.3. Nodos y tareas

Este grupo constituye el núcleo operativo de NodoExecute.

Los nodos permiten representar unidades de trabajo, relaciones y estructuras jerárquicas.

### 5.3.1. Tabla: nodes

Almacena los nodos de la plataforma.

| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID | Identificador |
| organization_id | UUID | Organización |
| parent_id | UUID | Nodo padre, opcional |
| project_id | UUID | Proyecto asociado, opcional |
| process_id | UUID | Proceso de origen, opcional |
| process_version_id | UUID | Versión de origen, opcional |
| procedure_step_id | UUID | Paso de origen, opcional |
| title | VARCHAR(180) | Título |
| description | TEXT | Descripción |
| node_type | VARCHAR(50) | Tipo de nodo |
| status | VARCHAR(40) | Estado |
| priority | VARCHAR(30) | Prioridad |
| sequence_order | INTEGER | Orden dentro de la jerarquía |
| created_by | UUID | Usuario creador |
| created_at | TIMESTAMP | Fecha de creación |
| updated_at | TIMESTAMP | Fecha de actualización |

**Consideraciones:**
- `parent_id` permite construir jerarquías.
- La jerarquía no debe confundirse con las dependencias.
- Los nodos podrán representar tareas, objetivos, hitos, solicitudes y otros elementos.
- Se deberá validar que un nodo no sea su propio padre ni genere ciclos jerárquicos.

### 5.3.2. Tabla: node_relationships

Permite conectar nodos independientemente de su jerarquía.

| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID | Identificador |
| source_node_id | UUID | Nodo de origen |
| target_node_id | UUID | Nodo de destino |
| relationship_type | VARCHAR(50) | Tipo de relación |
| description | TEXT | Descripción |
| created_by | UUID | Usuario creador |
| created_at | TIMESTAMP | Fecha de creación |

Ejemplos de relaciones:
- Relacionado con.
- Pertenece a.
- Alimenta.
- Complementa.
- Bloquea.
- Genera.

No todas las relaciones implican dependencia de ejecución.

### 5.3.3. Tabla: tasks

Almacena la información operativa de las tareas.

| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID | Identificador |
| node_id | UUID | Nodo asociado |
| title | VARCHAR(180) | Título |
| description | TEXT | Descripción |
| status | VARCHAR(40) | Estado |
| priority | VARCHAR(30) | Prioridad |
| start_date | TIMESTAMP | Fecha de inicio |
| due_date | TIMESTAMP | Fecha límite |
| completed_at | TIMESTAMP | Fecha de finalización |
| estimated_hours | DECIMAL(10,2) | Horas estimadas |
| actual_hours | DECIMAL(10,2) | Horas reales |
| created_at | TIMESTAMP | Fecha de creación |
| updated_at | TIMESTAMP | Fecha de actualización |

La relación entre nodos y tareas deberá permitir identificar qué nodos tienen comportamiento ejecutable.

### 5.3.4. Tabla: task_assignments

Registra los responsables de las tareas.

| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID | Identificador |
| task_id | UUID | Tarea |
| user_id | UUID | Usuario asignado |
| assignment_role | VARCHAR(50) | Función del usuario |
| assigned_by | UUID | Usuario que asigna |
| assigned_at | TIMESTAMP | Fecha de asignación |

Una tarea podrá tener uno o varios responsables, según las reglas de negocio.

### 5.3.5. Tabla: task_dependencies

Registra las dependencias entre tareas.

| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID | Identificador |
| task_id | UUID | Tarea dependiente |
| depends_on_task_id | UUID | Tarea requerida |
| dependency_type | VARCHAR(40) | Tipo de dependencia |
| created_at | TIMESTAMP | Fecha de creación |

Se deberá impedir la creación de ciclos de dependencia.

### 5.3.6. Tabla: task_history

Conserva los cambios importantes realizados sobre las tareas.

| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID | Identificador |
| task_id | UUID | Tarea |
| user_id | UUID | Usuario responsable |
| action | VARCHAR(80) | Acción realizada |
| previous_value | JSONB | Valor anterior |
| new_value | JSONB | Valor nuevo |
| created_at | TIMESTAMP | Fecha del cambio |

## 5.4. Ejecuciones de procesos

Para separar las plantillas de sus ejecuciones reales se propone una entidad independiente.

### 5.4.1. Tabla: process_executions

Registra cada ejecución de un proceso publicado.

| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID | Identificador |
| organization_id | UUID | Organización |
| process_id | UUID | Proceso |
| process_version_id | UUID | Versión ejecutada |
| project_id | UUID | Proyecto asociado, opcional |
| status | VARCHAR(40) | Estado de ejecución |
| started_at | TIMESTAMP | Fecha de inicio |
| completed_at | TIMESTAMP | Fecha de finalización |
| initiated_by | UUID | Usuario que inicia |
| created_at | TIMESTAMP | Fecha de creación |

Esta entidad permite ejecutar un mismo proceso varias veces sin mezclar sus resultados.

Los nodos y tareas generados durante una ejecución deberán conservar su vínculo con la ejecución correspondiente. Para ello se podrá incorporar `process_execution_id` en `nodes` cuando aplique.

## 5.5. Proyectos

### 5.5.1. Tabla: projects

Almacena los proyectos de cada organización.

| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID | Identificador |
| organization_id | UUID | Organización |
| name | VARCHAR(180) | Nombre |
| description | TEXT | Descripción |
| status | VARCHAR(40) | Estado |
| priority | VARCHAR(30) | Prioridad |
| start_date | DATE | Fecha de inicio |
| end_date | DATE | Fecha de finalización prevista |
| manager_id | UUID | Responsable |
| created_at | TIMESTAMP | Fecha de creación |
| updated_at | TIMESTAMP | Fecha de actualización |

### 5.5.2. Tabla: project_milestones

Registra los hitos de un proyecto.

| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID | Identificador |
| project_id | UUID | Proyecto |
| name | VARCHAR(150) | Nombre |
| description | TEXT | Descripción |
| due_date | DATE | Fecha prevista |
| completed_at | TIMESTAMP | Fecha de finalización |
| status | VARCHAR(30) | Estado |

### 5.5.3. Tabla: project_deliverables

Almacena los entregables asociados a un proyecto.

| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID | Identificador |
| project_id | UUID | Proyecto |
| name | VARCHAR(150) | Nombre |
| description | TEXT | Descripción |
| status | VARCHAR(30) | Estado |
| due_date | DATE | Fecha límite |
| completed_at | TIMESTAMP | Fecha de entrega |

## 5.6. Inventario y productos

### 5.6.1. Tabla: product_categories

Registra las categorías de productos.

| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID | Identificador |
| organization_id | UUID | Organización |
| name | VARCHAR(120) | Nombre |
| description | TEXT | Descripción |
| parent_id | UUID | Categoría superior, opcional |

### 5.6.2. Tabla: units_of_measure

Registra las unidades de medida.

| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID | Identificador |
| code | VARCHAR(30) | Código |
| name | VARCHAR(80) | Nombre |
| abbreviation | VARCHAR(15) | Abreviatura |

Ejemplos: unidad, kilogramo, litro, metro y caja.

### 5.6.3. Tabla: products

Almacena los productos y materiales administrados por la organización.

| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID | Identificador |
| organization_id | UUID | Organización |
| category_id | UUID | Categoría |
| unit_id | UUID | Unidad de medida |
| sku | VARCHAR(80) | Código interno |
| name | VARCHAR(180) | Nombre |
| description | TEXT | Descripción |
| product_type | VARCHAR(40) | Consumible, activo u otro |
| barcode | VARCHAR(120) | Código de barras |
| minimum_stock | DECIMAL(14,3) | Existencia mínima |
| status | VARCHAR(30) | Estado |
| created_at | TIMESTAMP | Fecha de creación |
| updated_at | TIMESTAMP | Fecha de actualización |

**Restricción:** SKU único dentro de cada organización.

### 5.6.4. Tabla: product_lots

Permite administrar lotes, fechas de vencimiento y trazabilidad.

| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID | Identificador |
| product_id | UUID | Producto |
| lot_number | VARCHAR(100) | Número de lote |
| expiration_date | DATE | Fecha de vencimiento |
| manufactured_at | DATE | Fecha de fabricación |
| created_at | TIMESTAMP | Fecha de registro |

Cuando un producto requiera control por serie individual, deberá utilizarse una estructura adicional para identificar cada unidad.

## 5.7. Almacenes y existencias

### 5.7.1. Tabla: warehouses

Registra los almacenes de una organización.

| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID | Identificador |
| organization_id | UUID | Organización |
| name | VARCHAR(150) | Nombre |
| code | VARCHAR(50) | Código |
| address | TEXT | Dirección |
| status | VARCHAR(30) | Estado |
| created_at | TIMESTAMP | Fecha de creación |

### 5.7.2. Tabla: warehouse_locations

Permite dividir un almacén en ubicaciones físicas.

| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID | Identificador |
| warehouse_id | UUID | Almacén |
| parent_id | UUID | Ubicación superior |
| code | VARCHAR(80) | Código |
| name | VARCHAR(120) | Nombre |
| description | TEXT | Descripción |

### 5.7.3. Tabla: stock_balances

Mantiene el saldo actual por producto y ubicación.

| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID | Identificador |
| product_id | UUID | Producto |
| warehouse_id | UUID | Almacén |
| location_id | UUID | Ubicación, opcional |
| lot_id | UUID | Lote, opcional |
| quantity_on_hand | DECIMAL(14,3) | Cantidad física |
| quantity_reserved | DECIMAL(14,3) | Cantidad reservada |
| quantity_blocked | DECIMAL(14,3) | Cantidad bloqueada |
| updated_at | TIMESTAMP | Última actualización |

La cantidad disponible se calculará como:

**Disponible = existencia física - reservado - bloqueado.**

El saldo será una representación actualizada de las operaciones registradas en los movimientos de inventario.

## 5.8. Movimientos de inventario

### 5.8.1. Tabla: stock_movements

Registra las operaciones de inventario.

| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID | Identificador |
| organization_id | UUID | Organización |
| warehouse_id | UUID | Almacén |
| movement_type | VARCHAR(40) | Entrada, salida, transferencia o ajuste |
| reference | VARCHAR(100) | Referencia |
| status | VARCHAR(30) | Estado |
| description | TEXT | Descripción |
| performed_by | UUID | Usuario responsable |
| confirmed_at | TIMESTAMP | Fecha de confirmación |
| created_at | TIMESTAMP | Fecha de creación |

### 5.8.2. Tabla: stock_movement_items

Almacena los productos y cantidades correspondientes a cada movimiento.

| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID | Identificador |
| movement_id | UUID | Movimiento |
| product_id | UUID | Producto |
| lot_id | UUID | Lote, opcional |
| source_location_id | UUID | Ubicación de origen |
| destination_location_id | UUID | Ubicación de destino |
| quantity | DECIMAL(14,3) | Cantidad |
| unit_cost | DECIMAL(14,4) | Costo unitario |

### 5.8.3. Tabla: stock_reservations

Registra las reservas de productos para tareas, proyectos u otras necesidades.

| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID | Identificador |
| organization_id | UUID | Organización |
| product_id | UUID | Producto |
| warehouse_id | UUID | Almacén |
| task_id | UUID | Tarea asociada, opcional |
| project_id | UUID | Proyecto asociado, opcional |
| quantity | DECIMAL(14,3) | Cantidad reservada |
| status | VARCHAR(30) | Estado |
| reserved_by | UUID | Usuario responsable |
| reserved_at | TIMESTAMP | Fecha de reserva |
| released_at | TIMESTAMP | Fecha de liberación |

Las reservas confirmadas deberán actualizarse de forma transaccional junto con los saldos correspondientes.

## 5.9. Compras y proveedores

### 5.9.1. Tabla: suppliers

Registra los proveedores.

| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID | Identificador |
| organization_id | UUID | Organización |
| name | VARCHAR(180) | Nombre |
| tax_id | VARCHAR(50) | Identificación tributaria |
| email | VARCHAR(255) | Correo |
| phone | VARCHAR(30) | Teléfono |
| address | TEXT | Dirección |
| status | VARCHAR(30) | Estado |

### 5.9.2. Tabla: purchase_orders

Registra las órdenes de compra.

| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID | Identificador |
| organization_id | UUID | Organización |
| supplier_id | UUID | Proveedor |
| order_number | VARCHAR(80) | Número de orden |
| status | VARCHAR(40) | Estado |
| order_date | DATE | Fecha de orden |
| expected_date | DATE | Fecha prevista |
| subtotal | DECIMAL(14,2) | Subtotal |
| tax_amount | DECIMAL(14,2) | Impuestos |
| total | DECIMAL(14,2) | Total |
| created_by | UUID | Usuario creador |
| created_at | TIMESTAMP | Fecha de creación |

### 5.9.3. Tabla: purchase_order_items

Registra los productos solicitados.

| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID | Identificador |
| purchase_order_id | UUID | Orden |
| product_id | UUID | Producto |
| quantity | DECIMAL(14,3) | Cantidad |
| unit_price | DECIMAL(14,4) | Precio unitario |
| subtotal | DECIMAL(14,2) | Subtotal |

### 5.9.4. Tabla: purchase_receipts

Registra las recepciones de productos.

| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID | Identificador |
| purchase_order_id | UUID | Orden de compra |
| warehouse_id | UUID | Almacén receptor |
| received_by | UUID | Usuario receptor |
| received_at | TIMESTAMP | Fecha de recepción |
| status | VARCHAR(30) | Estado |
| notes | TEXT | Observaciones |

Las recepciones deberán generar los movimientos de entrada correspondientes cuando sean confirmadas.

## 5.10. Activos y mantenimiento

### 5.10.1. Tabla: assets

Registra los activos reutilizables de una organización.

| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID | Identificador |
| organization_id | UUID | Organización |
| product_id | UUID | Producto relacionado, opcional |
| warehouse_id | UUID | Ubicación administrativa |
| asset_code | VARCHAR(80) | Código del activo |
| name | VARCHAR(180) | Nombre |
| description | TEXT | Descripción |
| serial_number | VARCHAR(120) | Número de serie |
| acquisition_date | DATE | Fecha de adquisición |
| acquisition_cost | DECIMAL(14,2) | Costo |
| status | VARCHAR(40) | Estado |

### 5.10.2. Tabla: maintenance_records

Registra las actividades de mantenimiento.

| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID | Identificador |
| organization_id | UUID | Organización |
| asset_id | UUID | Activo |
| task_id | UUID | Tarea asociada, opcional |
| maintenance_type | VARCHAR(40) | Preventivo o correctivo |
| description | TEXT | Descripción |
| scheduled_at | TIMESTAMP | Fecha programada |
| performed_at | TIMESTAMP | Fecha realizada |
| status | VARCHAR(30) | Estado |
| cost | DECIMAL(14,2) | Costo |
| performed_by | UUID | Responsable |

## 5.11. Presupuestos y costos

### 5.11.1. Tabla: budgets

Almacena los presupuestos de proyectos u otras unidades de gestión.

| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID | Identificador |
| organization_id | UUID | Organización |
| project_id | UUID | Proyecto, opcional |
| name | VARCHAR(150) | Nombre |
| total_amount | DECIMAL(14,2) | Valor presupuestado |
| currency | VARCHAR(3) | Moneda |
| status | VARCHAR(30) | Estado |
| created_at | TIMESTAMP | Fecha de creación |

### 5.11.2. Tabla: cost_records

Registra costos asociados a las operaciones.

| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID | Identificador |
| organization_id | UUID | Organización |
| project_id | UUID | Proyecto, opcional |
| task_id | UUID | Tarea, opcional |
| asset_id | UUID | Activo, opcional |
| budget_id | UUID | Presupuesto, opcional |
| cost_type | VARCHAR(50) | Tipo de costo |
| description | TEXT | Descripción |
| amount | DECIMAL(14,2) | Valor |
| currency | VARCHAR(3) | Moneda |
| recorded_at | TIMESTAMP | Fecha del registro |
| created_by | UUID | Usuario responsable |

Los costos deberán conservar su referencia de origen para evitar registros sin trazabilidad.

## 5.12. Documentos y archivos

### 5.12.1. Tabla: documents

Almacena los metadatos de los documentos asociados a la plataforma.

| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID | Identificador |
| organization_id | UUID | Organización |
| name | VARCHAR(180) | Nombre |
| description | TEXT | Descripción |
| file_name | VARCHAR(255) | Nombre del archivo |
| storage_key | TEXT | Identificador o ruta interna del almacenamiento |
| mime_type | VARCHAR(120) | Tipo de archivo |
| file_size | BIGINT | Tamaño |
| uploaded_by | UUID | Usuario que carga |
| created_at | TIMESTAMP | Fecha de creación |

### 5.12.2. Tabla: document_links

Relaciona documentos con entidades del sistema.

| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID | Identificador |
| document_id | UUID | Documento |
| entity_type | VARCHAR(80) | Tipo de entidad |
| entity_id | UUID | Identificador de la entidad |
| created_at | TIMESTAMP | Fecha de vinculación |

Esta relación polimórfica deberá validarse desde la aplicación, ya que una clave foránea tradicional no puede garantizar por sí sola la existencia de múltiples tipos de entidad.

## 5.13. Notificaciones y eventos

### 5.13.1. Tabla: notifications

Registra las notificaciones dirigidas a los usuarios.

| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID | Identificador |
| organization_id | UUID | Organización |
| user_id | UUID | Destinatario |
| title | VARCHAR(180) | Título |
| message | TEXT | Mensaje |
| notification_type | VARCHAR(50) | Tipo |
| read_at | TIMESTAMP | Fecha de lectura |
| created_at | TIMESTAMP | Fecha de creación |

### 5.13.2. Tabla: domain_events

Conserva eventos relevantes generados por los módulos.

| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID | Identificador |
| organization_id | UUID | Organización, cuando aplique |
| event_type | VARCHAR(120) | Tipo de evento |
| aggregate_type | VARCHAR(80) | Tipo de entidad |
| aggregate_id | UUID | Identificador de entidad |
| payload | JSONB | Datos del evento |
| occurred_at | TIMESTAMP | Fecha del evento |

### 5.13.3. Tabla: outbox_events

Se recomienda para garantizar la publicación de eventos relacionados con transacciones importantes.

| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID | Identificador |
| event_type | VARCHAR(120) | Tipo de evento |
| payload | JSONB | Datos |
| status | VARCHAR(30) | Estado de procesamiento |
| attempts | INTEGER | Intentos |
| created_at | TIMESTAMP | Fecha de creación |
| processed_at | TIMESTAMP | Fecha de procesamiento |

El registro del evento y la operación de negocio deberán realizarse dentro de la misma transacción cuando se utilice el patrón Transactional Outbox.

## 5.14. Auditoría

### 5.14.1. Tabla: audit_logs

Registra las acciones relevantes realizadas en el sistema.

| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID | Identificador |
| organization_id | UUID | Organización, cuando aplique |
| user_id | UUID | Usuario responsable |
| action | VARCHAR(100) | Acción |
| entity_type | VARCHAR(100) | Tipo de entidad |
| entity_id | UUID | Identificador de entidad |
| previous_data | JSONB | Información anterior |
| new_data | JSONB | Información nueva |
| ip_address | INET | Dirección IP, cuando sea necesario |
| created_at | TIMESTAMP | Fecha del evento |

Los registros de auditoría no deberán modificarse ni eliminarse mediante operaciones ordinarias de la aplicación.

# 6. Relaciones principales

Las relaciones más importantes de NodoExecute serán:

| Entidad principal | Relación | Entidad relacionada |
|---|---|---|
| organizations | 1:N | organization_members |
| users | 1:N | organization_members |
| organizations | 1:N | teams |
| teams | N:M | users mediante team_members |
| roles | N:M | permissions mediante role_permissions |
| processes | 1:N | process_versions |
| process_versions | 1:N | procedures |
| procedures | 1:N | procedure_steps |
| processes | 1:N | process_executions |
| process_executions | 1:N | nodes |
| nodes | 1:N | nodes mediante parent_id |
| nodes | 1:N | tasks, según el modelo operativo |
| nodes | N:M | nodes mediante node_relationships |
| tasks | N:M | users mediante task_assignments |
| tasks | N:M | tasks mediante task_dependencies |
| projects | 1:N | project_milestones |
| projects | 1:N | project_deliverables |
| projects | 1:N | nodes |
| product_categories | 1:N | products |
| products | 1:N | stock_balances |
| warehouses | 1:N | warehouse_locations |
| warehouses | 1:N | stock_movements |
| stock_movements | 1:N | stock_movement_items |
| suppliers | 1:N | purchase_orders |
| purchase_orders | 1:N | purchase_order_items |
| purchase_orders | 1:N | purchase_receipts |
| assets | 1:N | maintenance_records |
| projects | 1:N | cost_records |
| users | 1:N | notifications |

Las cardinalidades deberán concretarse en el modelo físico y en las restricciones de cada migración.

# 7. Restricciones e integridad de datos

## 7.1. Claves primarias

Todas las entidades principales deberán disponer de una clave primaria única.

Se recomienda UUID.

## 7.2. Claves foráneas

Las relaciones deberán utilizar claves foráneas siempre que sea posible.

Se deberá definir expresamente el comportamiento de eliminación y actualización.

No se utilizará `ON DELETE CASCADE` indiscriminadamente, especialmente en información histórica o financiera.

## 7.3. Restricciones únicas

Se deberán aplicar restricciones únicas para evitar duplicados.

Ejemplos:

- Correo electrónico de usuarios.
- Membresía de un usuario dentro de una organización.
- Código SKU dentro de una organización.
- Código de almacén dentro de una organización.
- Número de versión dentro de un proceso.
- Número de orden de compra dentro de una organización.

## 7.4. Restricciones CHECK

Se deberán establecer validaciones para cantidades y valores.

Ejemplos:

- Cantidades iguales o mayores que cero cuando corresponda.
- Importes no negativos, salvo que exista una operación que permita ajustes con signo.
- Fechas de finalización coherentes con las fechas de inicio.
- Estados dentro de los valores permitidos.

## 7.5. Consistencia organizacional

Las claves foráneas deberán impedir relaciones entre registros de organizaciones diferentes cuando corresponda.

No será suficiente confiar únicamente en que el frontend o el controlador envíen un `organization_id` correcto.

Se deberán utilizar validaciones de aplicación y, donde sea conveniente, restricciones compuestas o Row-Level Security de PostgreSQL.

# 8. Índices recomendados

Los índices deberán diseñarse considerando las consultas reales del sistema.

Índices iniciales recomendados:

| Tabla | Campo o combinación | Propósito |
|---|---|---|
| users | email | Búsqueda de usuarios |
| organization_members | organization_id, user_id | Membresías |
| nodes | organization_id, parent_id | Jerarquías |
| nodes | project_id | Consulta por proyecto |
| tasks | node_id, status | Consulta de tareas |
| tasks | due_date, status | Seguimiento de vencimientos |
| task_assignments | user_id, task_id | Tareas asignadas |
| task_dependencies | task_id, depends_on_task_id | Dependencias |
| processes | organization_id, status | Consulta de procesos |
| stock_balances | product_id, warehouse_id | Existencias |
| stock_movements | organization_id, created_at | Historial |
| products | organization_id, sku | Búsqueda de productos |
| notifications | user_id, read_at | Notificaciones pendientes |
| audit_logs | organization_id, created_at | Auditoría |

También se podrán utilizar índices GIN para determinados campos JSONB y búsquedas de texto cuando exista una necesidad demostrada.

# 9. Transacciones y operaciones críticas

Las siguientes operaciones deberán ejecutarse mediante transacciones de base de datos:

1. Confirmación de movimientos de inventario.
2. Transferencias entre almacenes.
3. Reservas y liberaciones de productos.
4. Recepción de órdenes de compra.
5. Registro de consumos asociados a tareas.
6. Actualizaciones de saldos.
7. Operaciones que modifiquen simultáneamente varias entidades relacionadas.

Se deberá considerar el control de concurrencia para impedir que dos operaciones simultáneas consuman las mismas existencias.

Para movimientos confirmados, se conservará el registro original y se utilizarán movimientos compensatorios para corregir errores.

# 10. Eliminación y conservación

Se aplicarán diferentes políticas según el tipo de información.

| Tipo de información | Política |
|---|---|
| Usuarios | Desactivación lógica |
| Organizaciones | Desactivación lógica |
| Equipos | Desactivación lógica |
| Procesos | Archivado y conservación de versiones |
| Nodos activos | Restricciones según su estado |
| Tareas finalizadas | Conservación histórica |
| Movimientos de inventario | No eliminación ordinaria |
| Reservas canceladas | Conservación de historial |
| Órdenes de compra | Conservación histórica |
| Auditoría | Conservación protegida |
| Notificaciones | Política de retención configurable |
| Documentos | Eliminación controlada y según referencias |

La eliminación física deberá reservarse para registros que puedan eliminarse sin comprometer la integridad, trazabilidad o cumplimiento de las políticas de conservación.

# 11. Convenciones de implementación con Sequelize

## 11.1. Modelos

Cada módulo tendrá sus modelos dentro de su estructura de infraestructura o persistencia.

Ejemplo:

`src/modules/inventory/infrastructure/persistence/models/Product.js`

## 11.2. Migraciones

Las modificaciones de la estructura de PostgreSQL deberán gestionarse mediante migraciones.

No se utilizará la sincronización automática de modelos para modificar el esquema en producción.

## 11.3. Nombres

Se recomienda:

- Tablas en plural y `snake_case`.
- Columnas en `snake_case`.
- Modelos JavaScript en PascalCase.
- Métodos y variables JavaScript en camelCase.

## 11.4. Tipos de datos

| Necesidad | Tipo PostgreSQL |
|---|---|
| Identificadores | UUID |
| Texto corto | VARCHAR |
| Texto largo | TEXT |
| Cantidades | NUMERIC |
| Fechas | DATE |
| Fecha y hora | TIMESTAMPTZ |
| Valores booleanos | BOOLEAN |
| Datos estructurados flexibles | JSONB |
| Direcciones IP | INET |

Se recomienda utilizar `TIMESTAMPTZ` para los eventos que requieran conservar una referencia temporal inequívoca.

# 12. Seguridad de la base de datos

La base de datos deberá proteger la información de las organizaciones y sus usuarios.

Medidas recomendadas:

1. Utilizar credenciales almacenadas en variables de entorno.
2. No incluir contraseñas ni secretos en el repositorio.
3. Utilizar conexiones cifradas cuando corresponda.
4. Aplicar el principio de mínimo privilegio.
5. Separar credenciales de migración y ejecución cuando sea necesario.
6. Validar el acceso organizacional en cada operación.
7. Evaluar Row-Level Security para reforzar el aislamiento de datos.
8. Registrar operaciones sensibles.
9. Proteger la información de autenticación.
10. Realizar copias de seguridad y comprobar su restauración.

# 13. Implementación progresiva

No es necesario implementar todas las tablas desde la primera versión.

Se propone la siguiente distribución:

## Fase 1. Estructura esencial (MVP)

- users
- organizations
- organization_members
- teams
- team_members
- roles
- permissions
- role_permissions
- processes
- process_versions
- procedures
- procedure_steps
- nodes
- node_relationships
- tasks
- task_assignments
- task_dependencies
- task_history
- projects

## Fase 2. Gestión de recursos

- product_categories
- units_of_measure
- products
- product_lots
- warehouses
- warehouse_locations
- stock_balances
- stock_movements
- stock_movement_items
- stock_reservations

## Fase 3. Gestión administrativa

- suppliers
- purchase_orders
- purchase_order_items
- purchase_receipts
- assets
- maintenance_records
- budgets
- cost_records

## Fase 4. Servicios complementarios

- documents
- document_links
- notifications
- domain_events
- outbox_events
- audit_logs
- process_executions

La prioridad definitiva dependerá de los casos de uso que se implementen en cada etapa. Algunas entidades de las fases posteriores, como `process_executions` y `audit_logs`, deberán adelantarse si las primeras funcionalidades necesitan historial y trazabilidad desde el inicio.

# 14. Criterios de aceptación

El diseño de la base de datos se considerará preparado para su implementación cuando:

- Las entidades principales estén identificadas.
- Las relaciones entre módulos estén definidas.
- Las claves primarias y foráneas estén especificadas.
- Las restricciones de integridad estén documentadas.
- Se haya definido el aislamiento de información por organización.
- Las operaciones críticas tengan una estrategia transaccional.
- Se haya definido la conservación de registros históricos.
- El modelo de procesos y sus ejecuciones esté diferenciado.
- La jerarquía de nodos esté separada de sus dependencias y relaciones.
- El inventario permita mantener trazabilidad de movimientos y existencias.
- Las migraciones puedan implementarse progresivamente.
- El modelo físico sea validado antes de su despliegue.

# 15. Decisiones técnicas

| Decisión | Definición |
|---|---|
| Motor | PostgreSQL |
| ORM | Sequelize |
| Identificadores | UUID |
| Organización de tablas | Por módulos funcionales |
| Separación de organizaciones | organization_id y controles de acceso |
| Historial | Tablas históricas y auditoría |
| Datos flexibles | JSONB cuando esté justificado |
| Operaciones críticas | Transacciones |
| Modificaciones del esquema | Migraciones |
| Eliminación | Lógica o restringida según entidad |
| Inventario | Movimientos y saldos controlados |
| Procesos | Versiones y ejecuciones independientes |
| Nodos | Jerarquía y relaciones independientes |

# 16. Conclusión

La base de datos de NodoExecute constituye el soporte central para administrar la información y las operaciones de la plataforma.

Su diseño debe permitir que los módulos funcionen de manera independiente desde el punto de vista arquitectónico, pero compartan información mediante relaciones controladas.

El modelo propuesto establece una base para desarrollar una plataforma escalable, segura y organizada, con especial atención a los nodos interconectados, la ejecución de procesos, la gestión de tareas y el control de recursos.

La implementación deberá realizarse mediante migraciones progresivas y validaciones continuas, evitando crear estructuras innecesarias antes de que exista una funcionalidad que las requiera.

---

**Fin del documento — DATABASE.md**

**NodoExecute — Organiza. Conecta. Ejecuta.**