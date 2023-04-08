BEGIN;

ALTER TABLE users ADD COLUMN ts tsvector
GENERATED ALWAYS AS (
	setweight(to_tsvector('english', coalesce(first_name, '')), 'A') ||
	setweight(to_tsvector('english', coalesce(email, '')), 'B')
) STORED;

CREATE INDEX ts_idx ON users USING GIN (ts);

COMMIT;