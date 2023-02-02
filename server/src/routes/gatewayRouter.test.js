import { connectDB, dropDB, dropCollections } from './mockConnectDB';

// Testing suite for the GatewaysRouter
const assert = require('assert');
const request = require('supertest');
const express = require('express');
const { Gateway } = require('@/utils/schema');
const { gatewaysRouter } = require('./gatewaysRouter');

describe('GatewaysRouter', () => {
  let app;

  beforeAll(async () => {
    await connectDB();
  });
  afterAll(async () => {
    await dropDB();
  });
  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/', gatewaysRouter);
  });
  afterEach(async () => {
    await dropCollections();
  });

  describe('GET /', () => {
    it('should return an array of all gateways', async () => {
      const gateways = [
        {
          serialNumber: '123',
          name: 'My Gateway',
          ipv4Address: '127.0.0.1',
          devices: [],
        },
      ];
      await Gateway.insertMany(gateways);

      const res = await request(app).get('/');

      assert.deepEqual(res.body.map(mapGivenValues), gateways);
    });

    it('should return a 500 error if the database fails', async () => {
      const DatabaseMock = {
        find: () => {
          throw new Error('Database error');
        },
      };
      Gateway.find = DatabaseMock.find;

      const res = await request(app).get('/');

      assert.deepEqual(res.status, 500);
      assert.deepEqual(res.body.message, 'Database error');
    });
  });

  describe('GET /:id', () => {
    it('should return a single gateway', async () => {
      const gateway = {
        serialNumber: '123',
        name: 'My Gateway',
        ipv4Address: '127.0.0.1',
        devices: [],
      };
      const gate = new Gateway(gateway);
      gate.save();
      const res = await request(app).get('/' + gate._id.toString());

      assert.deepEqual(mapGivenValues(res.body), gateway);
    });

    it('should return a 404 error if the gateway is not found', async () => {
      const id = '58f8085dc1840e050034d98f';
      const res = await request(app).get('/' + id);

      assert.deepEqual(res.status, 404);
      assert.deepEqual(res.body.message, 'Cannot find gateway');
    });

    it('should return a 500 error if the database fails', async () => {
      const DatabaseMock = {
        findById: () => {
          throw new Error('Database error');
        },
      };
      Gateway.findById = DatabaseMock.findById;

      const res = await request(app).get('/12345');

      assert.deepEqual(res.status, 500);
      assert.deepEqual(res.body.message, 'Database error');
    });
  });

  describe('POST /', () => {
    it('should create a new gateway', async () => {
      const res = await request(app).post('/').send({
        serialNumber: '123',
        name: 'My Gateway',
        ipv4Address: '127.0.0.1',
      });

      assert.deepEqual(res.status, 201);
      assert.notStrictEqual(res.body._id, undefined);
    });

    it('should return a 500 error if the database fails', async () => {
      const DatabaseMock = {
        findById: () => {
          throw new Error('Database error');
        },
      };
      Gateway.findById = DatabaseMock.findById;

      const res = await request(app);
    });
  });
});

const mapGivenValues = i => ({
  serialNumber: i.serialNumber,
  name: i.name,
  ipv4Address: i.ipv4Address,
  devices: i.devices,
});
