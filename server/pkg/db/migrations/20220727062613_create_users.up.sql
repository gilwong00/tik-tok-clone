BEGIN;

CREATE TABLE users(
	id BIGSERIAL PRIMARY KEY,
	first_name VARCHAR(250),
	last_name VARCHAR(250),
	email VARCHAR(255) UNIQUE NOT NULL,
	password VARCHAR(255) NOT NULL,
	avatar_uri VARCHAR(255),
	created_at TIMESTAMP NOT NULL DEFAULT NOW(),
	updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

COMMIT;