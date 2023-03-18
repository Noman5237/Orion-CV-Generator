-- liquibase formatted sql

-- changeset User:1678510686-address-table
create table if not exists address (
    id serial primary key,
    user_id int not null,
    address varchar(255) default '',
    city varchar(255) not null,
    state varchar(255) not null,
    country varchar(255) not null,
    zip_code varchar(255) default ' ',
    created_at timestamp not null default now(),
    updated_at timestamp not null default now(),
    constraint address_user_id_fk foreign key (user_id) references users(id) on delete cascade
);
-- rollback drop table if exists address;