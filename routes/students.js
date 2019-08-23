const router = require('express').Router();
const Student = require('../db/models/student');

router.get('/', async (req, res, next) => {
  try {
    const allStudents = await Student.findAll();
    res.status(200).json(allStudents);
  } catch (error) {
    next(error);
  }
});

router.get('/:studentId', async (req, res, next) => {
  try {
    const aStudent = await Student.findById(req.params.studentId);
    if (aStudent === null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(aStudent);
    }
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const addedStudent = await Student.create(req.body);
    res.status(201).send(addedStudent);
  } catch (error) {
    next(error);
  }
});

router.put('/:studentId', async (req, res, next) => {
  try {
    const [numUpdatedStudents, updatedStudent] = await Student.update(
      req.body,
      {
        where: {
          id: req.params.studentId,
        },
        returning: true,
      }
    );
    res.status(200).send(updatedStudent[0]);
  } catch (error) {
    next(error);
  }
});

router.delete('/:studentId', async (req, res, next) => {
  try {
    const numDeletedStudents = await Student.destroy({
      where: {
        id: req.params.studentId,
      },
    });
    if (numDeletedStudents === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
