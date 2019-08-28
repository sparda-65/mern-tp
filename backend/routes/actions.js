const router = require('express').Router();
let Action = require('../models/action.model');

router.route('/').get((req, res) => {
  Action.find()
    .then(actions => res.json(actions))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const objectif = String(req.body.objectif);
  const date = Date.parse(req.body.date);
  const statut= Boolean(req.body.statut);

  const newaction = new Action({
    username,
    description,
    objectif,
    date,
    statut,
  });

  newaction.save()
  .then(() => res.json('Action added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Action.findById(req.params.id)
    .then(action => res.json(action))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Action.findByIdAndDelete(req.params.id)
    .then(() => res.json('Action deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Action.findById(req.params.id)
    .then(action => {
      action.username = req.body.username;
      action.description = req.body.description;
      action.objectif = Number(req.body.objectif);
      action.date = Date.parse(req.body.date);

      action.save()
        .then(() => res.json('Action updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;