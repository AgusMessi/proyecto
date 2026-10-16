const pool = require('./db');

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const query = `
        SELECT g.id, g.concepto, g.monto, g.fecha, g.metodo_pago_id, m.nombre AS metodo_pago_nombre
        FROM gastos g
        JOIN metodos_pago m ON g.metodo_pago_id = m.id
        ORDER BY g.fecha DESC, g.id DESC
      `;
      const result = await pool.query(query);
      return res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error al obtener gastos:', error);
      return res.status(500).json({ error: 'Error interno del servidor al obtener gastos' });
    }
  } else if (req.method === 'POST') {
    try {
      const { concepto, monto, fecha, metodo_pago_id } = req.body;

      if (!concepto || !monto || !fecha || !metodo_pago_id) {
        return res.status(400).json({ error: 'Faltan campos obligatorios (concepto, monto, fecha, metodo_pago_id)' });
      }

      const query = `
        INSERT INTO gastos (concepto, monto, fecha, metodo_pago_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `;
      const values = [concepto, monto, fecha, metodo_pago_id];
      const result = await pool.query(query, values);

      return res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error al registrar gasto:', error);
      return res.status(500).json({ error: 'Error interno del servidor al registrar gasto' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
};
