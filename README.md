# Colegio GT API

## Descripción del proyecto

La API de Colegio GT es un servicio web que proporciona endpoints para gestionar información relacionada con un colegio. Permite realizar operaciones como crear y leer estudiantes y asignaturas.

## Estructura del proyecto

La estructura del proyecto sigue las mejores prácticas de organización de código. A continuación se muestra la estructura de directorios y archivos:

```
colegio-gt-api/
├── .env
├── .gitignore
├── .mocharc.json
├── .nycrc
├── estructura_repositorio.txt
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.json
├── db/
│ └── tablas.sql
├── node_modules/
├── src/
│ ├── app.ts
│ ├── oracle.ts
│ ├── domain/
│ │ ├── frameworks-drivers/
│ │ │ ├── App.ts
│ │ │ ├── Index.ts
│ │ ├── implementations/
│ │ │ ├── alumno/
│ │ │ │ └── AlumnoImp.ts
│ │ │ ├── curso/
│ │ │ │ ├── CursoImp.ts
│ │ │ │ └── EstadoCursoImp.ts
│ │ │ ├── estado-alumno/
│ │ │ │ └── EstadoAlumnoImp.ts
│ │ │ ├── genero/
│ │ │ └── GeneroImp.ts
│ │ ├── models/
│ │ │ ├── data/
│ │ │ │ ├── Alumno.ts
│ │ │ │ ├── Asignacion.ts
│ │ │ │ ├── Curso.ts
│ │ │ │ ├── EstadoAlumno.ts
│ │ │ │ ├── EstadoAsignacion.ts
│ │ │ │ ├── EstadoCurso.ts
│ │ │ │ ├── Genero.ts
│ │ │ │ └── Trimestre.ts
│ │ │ ├── interfaces/
│ │ ├── routes/
│ │ │ ├── alumnosRoutes.ts
│ │ │ ├── cursosRoutes.ts
│ │ │ ├── estadosAlumnoRoutes.ts
│ │ │ └── generoRoutes.ts
│ │ ├── use-cases/
│ │ │ ├── alumno/
│ │ │ │ └── alumnoUseCase.ts
│ │ │ ├── curso/
│ │ │ │ ├── cursoUseCase.ts
│ │ │ │ └── estadoCursoUseCase.ts
│ │ │ ├── estado-alumno/
│ │ │ │ └── estadoAlumnoUseCase.ts
│ │ │ ├── genero/
│ │ │ └── generoUseCase.ts
│ ├── infrastructure/
│ │ ├── db/
│ │ │ ├── Mongo.ts
│ │ │ └── Oracle.ts
│ │ ├── logs/
│ │ └── Logger.ts
│ ├── utils/
│ │ ├── formatoFechaNacimiento.ts
│ │ ├── mapeoAlumnos.ts
│ │ └── validations/
│ │ ├── validacionFormatoFecha.ts
│ │ ├── validarCreacionAlumno.ts
│ │ └── validarEmail.ts
├── test/
```

## Tecnologias utilizadas

 - Typescript
 - Express
 - Nodejs
 - Mongo
 - Oracle

## Cómo iniciar el servidor

    Para iniciar el ambiente de desarrollo

    ```shell
        npm run dev
    ```

## Diagrama de base de datos

![Diagrama db](./img/colegio-gt.drawio.png)


## Script de base de datos

    ```sql
        -- Creación del esquema
        create user colegio_gt identified by colegio_gt;

        -- Asignando privilegios a colegio_gt
        grant connect, resource to colegio_gt;

        -- Adicionar privilegios adicionales
        grant create session, create table, create view, create procedure, create sequence, create trigger to colegio_gt;

        -- Conectar al esquema
        alter session set current_schema = colegio_gt;


        -- Tablas que serán utilizadas para la creación de la base de datos	de colegio

        -- Tabla genero
        -- validación de la tabla genero
        begin
            execute immediate 'drop table genero';
        exception
            when others then
                if sqlcode != -942 then
                    raise;
                end if;
        end;

        -- Creación de la tabla genero
        create table genero (
            genero_id char(2) check (genero_id in ('M', 'F', 'O')),
            genero varchar(25) not null,
            primary key (genero_id)
        )

        -- Comentarios de la tabla genero
        COMMENT ON COLUMN genero.genero_id IS 'Valores permitidos: M = Masculino, F = Femenino, O = Otro';

        --Permisos para seleccionar los registros de la tabla genero
        GRANT SELECT ON system.genero TO SYSTEM; 

        -- Insertar datos en la tabla genero
        insert into genero (genero_id, genero) values ('M', 'Masculino');
        insert into genero (genero_id, genero) values ('F', 'Femenino');
        insert into genero (genero_id, genero) values ('O', 'Otro');

        -- Tabla estado_alumno
        -- Validación de la tabla estado_alumno
        begin
            execute immediate 'drop table estado_alumno';
        exception
            when others then
                if sqlcode != -942 then
                    raise;
                end if;
        end;

        -- Creación de la tabla estado_alumno
        create table estado_alumno (
            estado_alumno_id char(2) check (estado_alumno_id in ('A', 'G', 'R')),
            estado varchar(25) not null,
            primary key (estado_alumno_id)
        )

        -- Comentarios de la tabla estado_alumno
        COMMENT ON COLUMN estado_alumno.estado_alumno_id IS 'Valores permitidos: A = Activo, G = Graduado, R = Retirado';

        --Permisos para seleccionar los registros de la tabla estado_alumno
        GRANT SELECT ON system.estado_alumno TO SYSTEM; 

        -- Insertar datos en la tabla estado_alumno
        insert into estado_alumno (estado_alumno_id, estado) values ('A', 'Activo');
        insert into estado_alumno (estado_alumno_id, estado) values ('G', 'Graduado');
        insert into estado_alumno (estado_alumno_id, estado) values ('R', 'Retirado');

        -- Tabla alumno
        -- Validación de la tabla alumno
        begin
            execute immediate 'drop table alumno';
        exception
            when others then
                if sqlcode != -942 then
                    raise;
                end if;
        end;

        -- Creación de la tabla alumno
        create table alumno (
            alumno_id number generated by default on null as identity,
            nombres varchar(50) not null,
            apellidos varchar(50) not null,
            fecha_nacimiento date not null,
            genero_id char(2) not null,
            telefono varchar(8) not null,
            email varchar(50) not null,
            estado_alumno_id char(2) not null,
            fecha_creacion date default sysdate,
            primary key (alumno_id),
            foreign key (genero_id) references genero (genero_id),
            foreign key (estado_alumno_id) references estado_alumno (estado_alumno_id)
        )

        -- Comentarios de la tabla alumno
        COMMENT ON COLUMN alumno.alumno_id IS 'Valor autoincremental';

        --Permisos para seleccionar los registros de la tabla alumno
        GRANT SELECT ON system.alumno TO SYSTEM; 

        --Insertar datos en la tabla alumno, al menos 3 registros
        insert into alumno (nombres, apellidos, fecha_nacimiento, genero_id, telefono, email, estado_alumno_id)
        values ('John', 'Doe', TO_DATE('1990-01-01', 'YYYY-MM-DD'), 'M', '12345678', 'john.doe@example.com', 'A');

        insert into alumno (nombres, apellidos, fecha_nacimiento, genero_id, telefono, email, estado_alumno_id)
        values ('Jane', 'Smith',TO_DATE( '1995-05-10','YYYY-MM-DD'), 'F', '87654321', 'jane.smith@example.com', 'A');

        insert into alumno (nombres, apellidos, fecha_nacimiento, genero_id, telefono, email, estado_alumno_id)
        values ('Mike', 'Johnson', TO_DATE( '1992-09-15','YYYY-MM-DD'), 'M', '98765432', 'mike.johnson@example.com', 'G');

        -- Tabla estado_curso
        -- Validación de la tabla estado_curso
        begin
            execute immediate 'drop table estado_curso';
        exception
            when others then
                if sqlcode != -942 then
                    raise;
                end if;
        end;

        -- Creación de la tabla estado_curso
        create table estado_curso (
            estado_curso_id char(2) check (estado_curso_id in ('A', 'I', 'D')),
            estado varchar(25) not null,
            primary key (estado_curso_id)
        )

        -- Comentarios de la tabla estado_curso
        COMMENT ON COLUMN alumno.estado_curso_id IS 'Valores permitidos: A = Activo, I = Inactivo, D = Descontinuado';

        --Permisos para seleccionar los registros de la tabla estado_curso
        GRANT SELECT ON system.estado_curso TO SYSTEM; 


        -- Insertar datos en la tabla estado_curso al menos 3 registros
        insert into estado_curso (estado_curso_id, estado) values ('A', 'Activo');
        insert into estado_curso (estado_curso_id, estado) values ('I', 'Inactivo');
        insert into estado_curso (estado_curso_id, estado) values ('D', 'Descontinuado');

        -- Tabla curso
        -- Validación de la tabla curso
        begin
            execute immediate 'drop table curso';
        exception
            when others then
                if sqlcode != -942 then
                    raise;
                end if;
        end;

        -- Creación de la tabla curso
        create table curso (
            curso_id number generated by default on null as identity,
            nombre varchar(50) not null,
            descripcion varchar(255) not null,
            estado_curso_id char(2) not null,
            fecha_creacion date default sysdate,
            primary key (curso_id),
            foreign key (estado_curso_id) references estado_curso (estado_curso_id)
        )

        -- Comentarios de la tabla curso
        COMMENT ON COLUMN curso.curso_id IS 'Valor autoincremental';

        --Permisos para seleccionar los registros de la tabla curso
        GRANT SELECT ON system.curso TO SYSTEM;
        GRANT INSERT ON system.curso TO SYSTEM;

        -- Insertar datos en la tabla curso, al menos 3 registros
        insert into curso (nombre, descripcion, estado_curso_id)
        values ('Matemáticas', 'Curso de matemáticas básicas', 'A');

        insert into curso (nombre, descripcion, estado_curso_id)
        values ('Lenguaje', 'Curso de lenguaje básico', 'A');

        insert into curso (nombre, descripcion, estado_curso_id)
        values ('Ciencias', 'Curso de ciencias básicas', 'I');


        -- Tabla estado_asignacion
        -- Validación de la tabla estado_asignacion
        begin
            execute immediate 'drop table estado_asignacion';
        exception
            when others then
                if sqlcode != -942 then
                    raise;
                end if;
        end;

        -- Creación de la tabla estado_asignacion con los siguientes  valores  Pendiente, Aprobado, Rechazado, Anulado
        -- tendrá dos propiedades estado_asignacion_id y estado
        create table estado_asignacion (
            estado_asignacion_id char(2) check (estado_asignacion_id in ('P', 'A', 'R', 'N')),
            estado varchar(25) not null,
            primary key (estado_asignacion_id)
        )

        -- Comentarios de la tabla estado_asignacion
        COMMENT ON COLUMN estado_asignacion.estado_asignacion_id IS 'Valores permitidos: P = Pendiente, A = Aprobado, R = Rechazado, N = Anulado';

        --Permisos para seleccionar los registros de la tabla estado_asignacion
        GRANT SELECT ON system.estado_asignacion TO SYSTEM;

        -- Insertar datos en la tabla estado_asignacion
        insert into estado_asignacion (estado_asignacion_id, estado) values ('P', 'Pendiente');
        insert into estado_asignacion (estado_asignacion_id, estado) values ('A', 'Aprobado');
        insert into estado_asignacion (estado_asignacion_id, estado) values ('R', 'Rechazado');
        insert into estado_asignacion (estado_asignacion_id, estado) values ('N', 'Anulado');


        -- Tabla trimestre_curso
        -- Validación de la tabla trimestre_curso
        begin
            execute immediate 'drop table trimestre_curso';
        exception
            when others then
                if sqlcode != -942 then
                    raise;
                end if;
        end;

        -- Creación de la tabla trimestre_curso, esta solo tendrá una propiedad trimestre_curso_id y los valores para esta serán de la siguiente forma:
        -- 12023, 22023, 32023, 42023, 12024, 22024, 32024, 42024, 12025, 22025, 32025, 42025
        create table trimestre_curso (
            trimestre_curso_id char(5) check (trimestre_curso_id in ('12023', '22023', '32023', '42023', '12024', '22024', '32024', '42024', '12025', '22025', '32025', '42025')),
            primary key (trimestre_curso_id)
        )

        -- Comentarios de la tabla trimestre_curso
        COMMENT ON COLUMN trimestre_curso.trimestre_curso_id IS 'Valores permitidos: 12023, 22023, 32023, 42023, 12024, 22024, 32024, 42024, 12025, 22025, 32025, 42025';

        --Permisos para seleccionar los registros de la tabla trimestre_curso
        GRANT SELECT ON system.trimestre_curso TO SYSTEM;

        -- Insertar datos en la tabla trimestre_curso

        insert into trimestre_curso (trimestre_curso_id) values ('12024');
        insert into trimestre_curso (trimestre_curso_id) values ('22024');
        insert into trimestre_curso (trimestre_curso_id) values ('32024');
        insert into trimestre_curso (trimestre_curso_id) values ('42024');


        -- Tabla asignacion_curso
        begin
            execute immediate 'drop table asignacion_curso';
        exception
            when others then
                if sqlcode != -942 then
                    raise;
                end if;
        end;

        create table asignacion_curso (
            asignacion_curso_id number generated by default on null as identity,
            curso_id number not null,
            alumno_id number not null,
            trimestre_curso_id char(5) not null,
            estado_asignacion_id char(2) not null,
            fecha_asignacion date default sysdate,
            primary key (asignacion_curso_id, alumno_id, curso_id, trimestre_curso_id),
            foreign key (curso_id) references curso (curso_id),
            foreign key (alumno_id) references alumno (alumno_id),
            foreign key (trimestre_curso_id) references trimestre_curso (trimestre_curso_id),
            foreign key (estado_asignacion_id) references estado_asignacion (estado_asignacion_id)
        )

        --Permisos para seleccionar los registros de la tabla asignacion_curso
        GRANT SELECT ON system.asignacion_curso TO SYSTEM;

        -- Insertar datos en la tabla asignacion_curso, al menos 3 registros
        insert into asignacion_curso (curso_id, alumno_id, trimestre_curso_id, estado_asignacion_id)
        values (1, 1, '12024', 'A');

        insert into asignacion_curso (curso_id, alumno_id, trimestre_curso_id, estado_asignacion_id)
        values (2, 2, '22024', 'P');

        insert into asignacion_curso (curso_id, alumno_id, trimestre_curso_id, estado_asignacion_id)
        values (3, 3, '32024', 'R');

    ```