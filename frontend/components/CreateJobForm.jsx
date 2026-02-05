import { useState, useEffect } from 'react';
import { createJob } from '../services/api';

export default function CreateJobForm({ onJobCreated, onSuccess, onError }) {
  const [taskName, setTaskName] = useState('');
  const [priority, setPriority] = useState('Low');
  const [payload, setPayload] = useState('');

  const [taskError, setTaskError] = useState('');
  const [payloadError, setPayloadError] = useState('');

  const [taskTouched, setTaskTouched] = useState(false);
  const [payloadTouched, setPayloadTouched] = useState(false);

  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (!taskTouched) return;

    if (!taskName.trim()) {
      setTaskError('Task name is required');
    } else {
      setTaskError('');
    }
  }, [taskName, taskTouched]);

  useEffect(() => {
    if (!payloadTouched) return;

    if (!payload.trim()) {
      setPayloadError('');
      return;
    }

    try {
      JSON.parse(payload);
      setPayloadError('');
    } catch {
      setPayloadError('Invalid JSON format');
    }
  }, [payload, payloadTouched]);

  useEffect(() => {
    if (!taskName.trim() || payloadError) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [taskName, payloadError]);

  const submitJob = async () => {
    try {
      const parsedPayload = payload ? JSON.parse(payload) : {};

      await createJob({
        taskName,
        priority,
        payload: parsedPayload,
      });

      onJobCreated();
      onSuccess?.('Job created successfully');

    } catch {
      onError?.('Failed to create job');
    }
  };

  return (
  <form
    className="form-container"
    onSubmit={(e) => {
      e.preventDefault();
      submitJob();
    }}
  >

    
    <div className="form-group">
      <input
        placeholder="Task Name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        onBlur={() => setTaskTouched(true)}
      />
      {taskTouched && taskError && (
        <p className="error-text">{taskError}</p>
      )}
    </div>

    <div className="form-group">
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
    </div>

    <div className="form-group">
      <textarea
        rows="4"
        placeholder="Payload JSON (optional)"
        value={payload}
        onChange={(e) => setPayload(e.target.value)}
        onBlur={() => setPayloadTouched(true)}
      />
      {payloadTouched && payloadError && (
        <p className="error-text">{payloadError}</p>
      )}
    </div>

    <div className="form-actions">
      <button type="submit" disabled={isDisabled}>
        Create Job
      </button>
    </div>

  </form>
);

}

