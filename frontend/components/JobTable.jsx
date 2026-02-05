// import { runJob } from '../services/api';
// import { Link } from 'react-router-dom';

// export default function JobTable({ jobs, refresh }) {
//   const handleRun = async (id) => {
//     await runJob(id);
//     refresh();
//     setTimeout(() => {
//       refresh();
//     }, 3500);
//   };

// //   return (
// //     <div className="card">
// //         <table border="1" cellPadding="5">
// //         <thead>
// //             <tr>
// //             <th>ID</th>
// //             <th>Task</th>
// //             <th>Priority</th>
// //             <th>Status</th>
// //             <th>Action</th>
// //             </tr>
// //         </thead>

// //         <tbody>
// //             {jobs.map((job) => (
// //             <tr key={job.id}>
// //                 <td>{job.id}</td>
// //                 {/* <td>
// //                 <Link to={`/jobs/${job.id}`} style={{ color: 'blue' }}>
// //                     {job.taskName}
// //                 </Link>
// //                 </td> */}
// //                 <td>
// //                     <Link to={`/jobs/${job.id}`} className="link">
// //                         {job.taskName}
// //                     </Link>
// //                 </td>
// //                 <td>{job.priority}</td>
// //                 {/* <td>{job.status}</td> */}
// //                 <td>
// //                     <span className={`badge ${job.status}`}>
// //                         {job.status}
// //                     </span>
// //                 </td>
// //                 <td>
// //                 {job.status === 'pending' && (
// //                     <button onClick={() => handleRun(job.id)}>Run</button>
// //                 )}
// //                 {job.status === 'running' && 'Running...'}
// //                 {job.status === 'completed' && 'Completed'}
// //                 </td>
// //             </tr>
// //             ))}
// //         </tbody>
// //         </table>
// //     </div>
// //   );
//     return (
//         <div className="card">

//             <table>
//                 <thead>
//                     <tr>
//                     <th>ID</th>
//                     <th>Task</th>
//                     <th>Priority</th>
//                     <th>Status</th>
//                     <th>Action</th>
//                     </tr>
//                 </thead>

//                 <tbody>
//                     {
//                     jobs.length === 0 ? (
//                         <tr>
//                             <td colSpan="5" style={{ textAlign: 'center' }}>
//                                 No jobs found
//                             </td>
//                         </tr>
//                     ) : (
//                         jobs.map((job) => (
//                             <tr key={job.id}>
//                                 <td>{job.id}</td>

//                                 <td>
//                                 <Link to={`/jobs/${job.id}`} className="link">
//                                     {job.taskName}
//                                 </Link>
//                                 </td>

//                                 <td>{job.priority}</td>

//                                 <td>
//                                 <span className={`badge ${job.status}`}>
//                                     {job.status}
//                                 </span>
//                                 </td>

//                                 <td>
//                                 {job.status === 'pending' && (
//                                     <button onClick={() => handleRun(job.id)}>
//                                     Run
//                                     </button>
//                                 )}
//                                 {job.status === 'running' && 'Running...'}
//                                 {job.status === 'completed' && 'Completed'}
//                                 </td>
//                             </tr>
//                         ))
//                     )}
//                 </tbody>
//             </table>
//         </div>
//     );

// }
import { runJob } from '../services/api';
import { Link } from 'react-router-dom';

export default function JobTable({ jobs, refresh }) {
  const handleRun = async (id) => {
    await runJob(id);
    refresh();

    setTimeout(() => {
      refresh();
    }, 3500);
  };

  return (
    <div className="card">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Task</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {jobs.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>
                No jobs found
              </td>
            </tr>
          ) : (
            jobs.map((job) => (
              <tr key={job.id}>
                <td>{job.id}</td>

                <td>
                  <Link to={`/jobs/${job.id}`} className="link">
                    {job.taskName}
                  </Link>
                </td>

                <td>{job.priority}</td>

                <td>
                  <span className={`badge ${job.status}`}>
                    {job.status}
                  </span>
                </td>

                <td>
                  {job.status === 'pending' && (
                    <button onClick={() => handleRun(job.id)}>Run</button>
                  )}
                  {job.status === 'running' && 'Running...'}
                  {job.status === 'completed' && 'Completed'}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

