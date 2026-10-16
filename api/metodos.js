const pool = require('./db');

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405.0).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const result = await pool.query('SELECT * FROM metodos_pago ORDER BY id ASC');
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener métodos de pago:', error);
    return res.status(500).json({ error: 'Error interno del servidor al obtener métodos de pago' });
  }
};
