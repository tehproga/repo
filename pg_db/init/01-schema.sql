CREATE EXTENSION IF NOT EXISTS citext;
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE user_status AS ENUM ('pending', 'active', 'blocked');

CREATE TYPE user_role AS ENUM ('customer', 'technician', 'admin');

CREATE DOMAIN phone_number AS TEXT CHECK (VALUE ~ '^7[0-9]{10}$');

CREATE TABLE IF NOT EXISTS users (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    status user_status NOT NULL DEFAULT 'pending',
    date_joined timestamp with time zone NOT NULL DEFAULT now() CHECK (date_joined > birthdate),
    middle_name varchar(256),
    first_name varchar(256),
    last_name varchar(256),
    email citext,
    phone phone_number UNIQUE NOT NULL,
    birthdate date CHECK (birthdate > '1930-01-01'),
    role user_role NOT NULL DEFAULT 'customer'
);

CREATE TABLE IF NOT EXISTS restricted_zones (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    polygon geometry NOT NULL,
    speed_limit smallint NOT NULL CHECK (speed_limit >= 0)
);

CREATE TABLE IF NOT EXISTS subscriptions (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    title varchar(64) NOT NULL,
    duration integer NOT NULL CHECK (duration >= 0),
    price integer NOT NULL CHECK (price >= 0)
);

CREATE TABLE IF NOT EXISTS purchases (
    subscription_id uuid NOT NULL REFERENCES subscriptions(id),
    user_id uuid NOT NULL REFERENCES users(id),
    date_started timestamp with time zone NOT NULL DEFAULT now(),
    date_finished timestamp with time zone NOT NULL CHECK (date_finished > date_started),
    date_purchased timestamp with time zone NOT NULL DEFAULT now()
);