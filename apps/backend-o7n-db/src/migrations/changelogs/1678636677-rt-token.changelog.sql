-- liquibase formatted sql

-- changeset User:1678636677-rt-token

alter table users add column refresh_token varchar(255) default '';
-- rollback alter table users drop column refresh_token;