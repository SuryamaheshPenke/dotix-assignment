const BASE_URL = 'https://dotix-assignment-s0pr.onrender.com';

export const fetchJobs = async ({ status, priority }) => {
  let query = '';

  if (status || priority) {
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (priority) params.append('priority', priority);
    query = `?${params.toString()}`;
  }

  const res = await fetch(`http://localhost:5000/jobs${query}`);
  return res.json();
};


export const createJob = async (job) => {
  const res = await fetch(`${BASE_URL}/jobs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(job),
  });
  return res.json();
};

export const runJob = async (id) => {
  return fetch(`${BASE_URL}/run-job/${id}`, { method: 'POST' });
};

export const fetchJobById = async (id) => {
  const res = await fetch(`${BASE_URL}/jobs/${id}`);
  return res.json();
};
