import { useEffect, useState } from 'react';
import { fetchJobs } from '../services/api';
import JobTable from '../components/JobTable';
import CreateJobForm from '../components/CreateJobForm';
import Modal from '../components/Modal';

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  const loadJobs = async () => {
    setLoading(true);
    const data = await fetchJobs({ status, priority });
    setJobs(data);
    setLoading(false);
  };

  useEffect(() => {
    loadJobs();
  }, [status, priority]);

  return (
    <div>
      <h1 style={{ marginBottom: 20 }}>Job Scheduler Dashboard</h1>
      <div className="toolbar">
        <div className="filter-group">
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="running">Running</option>
            <option value="completed">Completed</option>
            </select>

            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="">All Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            </select>
        </div>

        <button className="create-btn" onClick={() => setShowModal(true)}>
            + Create Job
        </button>
      </div>


      {loading ? (
        <p>Loading jobs...</p>
      ) : (
        <JobTable jobs={jobs} refresh={loadJobs} />
      )}

      {showModal && (
        <Modal
            title="Create Job"
            onClose={() => setShowModal(false)}
        >

        <CreateJobForm
            onJobCreated={() => {
              loadJobs();
              setShowModal(false);
            }}
            onSuccess={(msg) => showToast(msg, 'success')}
            onError={(msg) => showToast(msg, 'error')}
        />
        </Modal>
      )}

      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}
