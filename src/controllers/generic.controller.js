export const makeController = (Model) => ({
  getAll: async (req, res) => {
    try {
      const data = await Model.getAll();
      res.json({ ok: true, data });
    } catch (err) { res.status(500).json({ ok: false, message: err.message }); }
  },
  getById: async (req, res) => {
    try {
      const data = await Model.getById(req.params.id);
      if (!data) return res.status(404).json({ ok: false, message: 'Registro no encontrado' });
      res.json({ ok: true, data });
    } catch (err) { res.status(500).json({ ok: false, message: err.message }); }
  },
  create: async (req, res) => {
    try {
      const result = await Model.create(req.body);
      res.status(201).json({ ok: true, message: 'Registro creado', id: result.insertId });
    } catch (err) { res.status(500).json({ ok: false, message: err.message }); }
  },
  update: async (req, res) => {
    try {
      await Model.update(req.params.id, req.body);
      res.json({ ok: true, message: 'Registro actualizado' });
    } catch (err) { res.status(500).json({ ok: false, message: err.message }); }
  },
  remove: async (req, res) => {
    try {
      await Model.remove(req.params.id);
      res.json({ ok: true, message: 'Registro eliminado' });
    } catch (err) { res.status(500).json({ ok: false, message: err.message }); }
  }
});
