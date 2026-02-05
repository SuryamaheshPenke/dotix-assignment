const axios = require('axios');

const WEBHOOK_URL = 'https://webhook.site/84ceb8a7-71bd-4c72-bbde-50cd3466b3cb';

async function triggerWebhook(job) {
  try {
    await axios.post(WEBHOOK_URL, {
      jobId: job.id,
      taskName: job.taskName,
      status: job.status,
      priority: job.priority,
      payload: JSON.parse(job.payload),
      completedAt: new Date()
    });
  } catch (err) {
    console.error('Webhook failed');
  }
}

module.exports = triggerWebhook;
