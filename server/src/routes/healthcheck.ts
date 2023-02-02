import express from 'express';

const indexRouter = express.Router();

indexRouter.get('/', (_req, res) => {
  res.send('OK');
});

export default indexRouter;
