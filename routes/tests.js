const router = require('express').Router();
const Test = require('../db/models/test');

router.get('/', async (req, res, next) => {
  try {
    const allTests = await Test.findAll();
    res.status(200).json(allTests);
  } catch (error) {
    next(error);
  }
});

router.get('/:testId', async (req, res, next) => {
  try {
    const aTest = await Test.findById(req.params.testId);
    if (aTest === null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(aTest);
    }
  } catch (error) {
    next(error);
  }
});

router.post('/student/:studentId', async (req, res, next) => {
  try {
    const addedTest = await Test.create({
      ...req.body,
      studentId: req.params.studentId,
    });
    res.status(201).send(addedTest);
  } catch (error) {
    next(error);
  }
});

router.delete('/:testId', async (req, res, next) => {
  try {
    const numDeletedTests = await Test.destroy({
      where: {
        id: req.params.testId,
      },
    });
    if (numDeletedTests === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
