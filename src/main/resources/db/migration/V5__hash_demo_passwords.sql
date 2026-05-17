-- Migrate the original demo password to BCrypt.
-- Demo accounts still use password123 for local testing.
UPDATE users
SET password_hash = '$2a$12$oNUJumwZCiF3ol9H/kUdO.SDz9vx1Lx9TdAVpX0amyi2qWcg6ffqS'
WHERE password_hash = 'password123';
