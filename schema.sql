-- Script SQL para Control de Gastos Personales

CREATE TABLE IF NOT EXISTS metodos_pago (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS gastos (
    id SERIAL PRIMARY KEY,
    concepto VARCHAR(255) NOT NULL,
    monto DECIMAL(12, 2) NOT NULL,
    fecha DATE NOT NULL,
    metodo_pago_id INTEGER REFERENCES metodos_pago(id) ON DELETE CASCADE
);

-- Insertar datos de prueba en metodos_pago
INSERT INTO metodos_pago (nombre) VALUES 
('Efectivo'),
('Tarjeta de Crédito'),
('Tarjeta de Débito'),
('Transferencia Bancaria')
ON CONFLICT DO NOTHING;
