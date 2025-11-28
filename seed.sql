INSERT INTO auth_user (password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined)
VALUES
('123', NULL, 0, 'user', 'João', 'Silva', 'joao@example.com', 0, 1, '2025-01-10 10:00:00');
('321', NULL, 0, 'user2', 'João', 'Silva', 'joao@example.com', 0, 1, '2025-01-10 10:00:00');
('abc', NULL, 0, 'user3', 'João', 'Silva', 'joao@example.com', 0, 1, '2025-01-10 10:00:00');

DELETE FROM auth_user WHERE id = 7;
SELECT * FROM auth_user;

INSERT INTO api_product (name, minimum_quantity, description, current_quantity)
VALUES
('Caneta Azul', 10, 'Caneta esferográfica azul', 120),
('Caderno Universitário', 5, 'Caderno 200 folhas', 45),
('Grampeador', 2, 'Grampeador metálico grande', 18);

INSERT INTO api_historical (operation_type, operation_date, quantity_moved, movement_responsible_id, product_id)
VALUES
('Entrada', '2025-03-10 09:30:00', 20, 1, 1),
('Saída', '2025-03-11 15:20:00', 5, 2, 2),
('Entrada', '2025-03-12 11:10:00', 12, 3, 3);
