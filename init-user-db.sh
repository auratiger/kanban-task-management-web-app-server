#!/bin/bash

set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER "${DB_USER}" WITH SUPERUSER PASSWORD '${DB_PASSWORD}';
EOSQL
