const express = require('express');
const router = express.Router();
const db = require('../db');
const triggerWebhook = require('../services/webhook');

router.post('/jobs', (req, res) => {
  const { taskName, payload, priority } = req.body;

  if (!taskName || !priority) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const jobPayload = JSON.stringify(payload || {});

  db.run(
    `INSERT INTO jobs (taskName, payload, priority, status)
     VALUES (?, ?, ?, 'pending')`,
    [taskName, jobPayload, priority],
    function () {
      res.json({ id: this.lastID, message: 'Job created' });
    }
  );
});

router.get('/jobs', (req, res) => {
  const { status, priority } = req.query;

  let query = 'SELECT * FROM jobs WHERE 1=1';
  const params = [];

  if (status) {
    query += ' AND status = ?';
    params.push(status);
  }

  if (priority) {
    query += ' AND priority = ?';
    params.push(priority);
  }

  query += ' ORDER BY createdAt DESC';

  db.all(query, params, (err, rows) => {
    res.json(rows);
  });
});

router.get('/jobs/:id', (req, res) => {
  db.get(
    'SELECT * FROM jobs WHERE id = ?',
    [req.params.id],
    (err, row) => {
      if (!row) return res.status(404).json({ message: 'Not found' });
      res.json(row);
    }
  );
});

router.post('/run-job/:id', (req, res) => {
  const jobId = req.params.id;

  db.get('SELECT * FROM jobs WHERE id = ?', [jobId], (err, job) => {
    if (!job) return res.status(404).json({ message: 'Not found' });
    if (job.status !== 'pending') {
      return res.status(400).json({ message: 'Cannot rerun job' });
    }

    db.run(
      'UPDATE jobs SET status = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
      ['running', jobId]
    );

    setTimeout(() => {
      db.run(
        'UPDATE jobs SET status = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
        ['completed', jobId],
        () => {
          triggerWebhook({ ...job, status: 'completed' });
        }
      );
    }, 3000);

    res.json({ message: 'Job started' });
  });
});



module.exports = router;
