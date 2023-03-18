-- liquibase formatted sql

-- changeset Noman5237:1677192384-create-check-table
create table "__migration_check" (
	"id" serial primary key,
	"name" varchar(255) not null
);
-- rollback drop table "__migration_check";