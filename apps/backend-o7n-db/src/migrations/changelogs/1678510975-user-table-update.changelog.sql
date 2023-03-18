-- liquibase formatted sql

-- changeset User:1678510975-user-table-update

alter table users rename column name to first_name;
alter table users add column last_name varchar(255) not null default '';

-- rollback alter table users rename column first_name to name; alter table users drop column last_name;



