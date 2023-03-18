-- liquibase formatted sql

-- changeset Talimul Bari:1678122447-create-user-table
create table if not exists users (
    id serial primary key,
    name varchar(255) not null,
    email varchar(255) not null,
    password varchar(255) not null,
    created_at timestamp not null default now(),
    updated_at timestamp not null default now()
);
-- rollback drop table if exists users;
