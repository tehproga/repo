CREATE EXTENSION IF NOT EXISTS citext;
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS restricted_zones (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    polygon geometry NOT NULL,
    speed_limit smallint NOT NULL CHECK (speed_limit >= 0)
);

