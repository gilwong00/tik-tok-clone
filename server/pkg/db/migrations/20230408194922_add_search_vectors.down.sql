BEGIN;

ALTER TABLE users DROP COLUMN ts IF EXISTS;

DROP INDEX ts_idx IF EXISTS;

COMMIT;