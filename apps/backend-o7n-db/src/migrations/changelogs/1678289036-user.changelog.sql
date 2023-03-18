-- liquibase formatted sql

-- changeset User:1678289036-user

alter table users add constraint users_email_unique unique (email);
-- rollback alter table users drop constraint users_email_unique;
