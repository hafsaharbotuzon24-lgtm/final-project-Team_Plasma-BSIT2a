const Room = require('../models/Room');

exports.createRoom = async (req, res) => {
  const room = await Room.create(req.body);
  res.status(201).json(room);
};

exports.getRoomsByPath = async (req, res) => {
  const rooms = await Room.find({ path_id: req.params.pathId })
    .populate("path_id");

  res.json(rooms);
};