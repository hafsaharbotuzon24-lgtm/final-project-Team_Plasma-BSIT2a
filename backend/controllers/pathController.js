const Path = require('../models/path');

exports.createPath = async (req, res) => {
  const path = await Path.create(req.body);
  res.status(201).json(path);
};

exports.getPaths = async (req, res) => {
  const paths = await Path.find();
  res.json(paths);
};