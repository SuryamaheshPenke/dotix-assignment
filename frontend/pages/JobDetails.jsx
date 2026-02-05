import { useEffect, useState } from 'react';
import { fetchJobById } from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

export default function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobById(id).then(setJob);
  }, [id]);

  if (!job) return <p>Loading...</p>;

  return (
    <div className="card">
      <button onClick={() => navigate(-1)}>← Back</button>

      <h2>{job.taskName}</h2>

      <p>
        Status:
        <span className={`badge ${job.status}`}>
          {job.status}
        </span>
      </p>

      <p>Priority: {job.priority}</p>

      <pre
        style={{
          background: '#f1f5f9',
          padding: '15px',
          borderRadius: '8px'
        }}
      >
        {JSON.stringify(JSON.parse(job.payload), null, 2)}
      </pre>
    </div>
  );
}
