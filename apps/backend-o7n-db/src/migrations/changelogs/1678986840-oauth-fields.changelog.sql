-- liquibase formatted sql

-- changeset User:1678986840-oauth-fields


ALTER TABLE users ALTER COLUMN password DROP NOT NULL;
ALTER TABLE users ADD COLUMN oauth_id VARCHAR(255);

ALTER TABLE users ADD COLUMN is_oauth BOOLEAN NOT NULL DEFAULT FALSE;

-- rollback ALTER TABLE users ALTER COLUMN password SET NOT NULL; ALTER TABLE users DROP COLUMN oauth_id; ALTER TABLE users DROP COLUMN is_oauth; 