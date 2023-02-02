import express from 'express';
import { Gateway } from '@/utils/schema';
import { randomUUID } from 'crypto';

export const gatewaysRouter = express.Router();

gatewaysRouter.get('/', async (req, res) => {
  try {
    const gateways = await Gateway.find();
    res.json(gateways);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

gatewaysRouter.get('/:id', getGateway, (req, res) => {
  res.json(res.gateway);
});

gatewaysRouter.post('/', async (req, res) => {
  const gateway = new Gateway({
    serialNumber: req.body.serialNumber,
    name: req.body.name,
    ipv4Address: req.body.ipv4Address,
    devices: req.body.devices,
  });
  try {
    const newGateway = await gateway.save();
    res.status(201).json(newGateway);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

gatewaysRouter.post('/:id/devices', getGateway, async (req, res) => {
  const gateway = res.gateway;

  try {
    const device = {
      uid: randomUUID(),
      dateCreated: new Date(),
      vendor: req.body.vendor,
      status: req.body.status,
    };
    gateway.devices.push(device);
    await gateway.save();
    res.status(201).json(device);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// gatewaysRouter.patch('/:id', getGateway, async (req, res) => {
//   if (req.body.serialNumber != null) {
//     res.gateway.serialNumber = req.body.serialNumber;
//   }
//   if (req.body.name != null) {
//     res.gateway.name = req.body.name;
//   }
//   if (req.body.ipv4Address != null) {
//     res.gateway.ipv4Address = req.body.ipv4Address;
//   }
//   if (req.body.devices != null) {
//     res.gateway.devices = req.body.devices;
//   }
//   try {
//     const updatedGateway = await res.gateway.save();
//     res.json(updatedGateway);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

gatewaysRouter.delete('/:id', getGateway, async (req, res) => {
  try {
    await res.gateway.remove();
    res.json({ message: 'Deleted Gateway' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

gatewaysRouter.delete('/:id/devices/:pid', getGateway, async (req, res) => {
  const pid = req.params.pid;
  try {
    const devices = res.gateway.devices;
    res.gateway.devices = devices.filter(device => device.uid != pid);
    if (devices.length > res.gateway.devices.length) {
      await res.gateway.save();
      res.json({ message: 'Deleted Prepheral' });
    } else {
      res.json({ message: 'Deleted Prepheral' }).status(404);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getGateway(req, res, next) {
  let gateway;
  try {
    gateway = await Gateway.findById(req.params.id);
    if (gateway == null) {
      return res.status(404).json({ message: 'Cannot find gateway' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.gateway = gateway;
  next();
}
