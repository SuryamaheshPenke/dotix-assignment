# Job Scheduler & Automation System

A full-stack job scheduling and automation system that allows users to create, manage, and execute background jobs with real-time status tracking and webhook integration.

---

## 🚀 Live Demo

Frontend (Vercel):  
👉 https://dotix-assignment-kappa.vercel.app/  

Backend (Render):  
👉 https://dotix-assignment-s0pr.onrender.com 

---

## 🧰 Tech Stack

### Frontend
- React.js
- Vite
- React Router DOM
- Custom CSS Styling
- Fetch API

### Backend
- Node.js
- Express.js
- SQLite Database

### Deployment
- Frontend: Vercel
- Backend: Render

---

## ⭐ Features

### Job Management
- Create background jobs with payload support
- View jobs in dashboard table
- Filter jobs by status and priority
- View detailed job information

### Job Execution
- Manual job trigger
- Background processing simulation
- Status lifecycle tracking:
  - Pending
  - Running
  - Completed

### Automation
- Automatic webhook trigger after job completion

### UI Features
- Modal-based job creation
- Form validation
- Toast notifications (Success & Error)
- Responsive dashboard layout
- Status badges

---

## 📂 Project Structure

```text
dotix-assignment/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── styles/
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── database/
│   └── app.js
```

## ⚙️ How To Run Locally

### 1️⃣ Clone Repository

```bash
git clone https://github.com/SuryamaheshPenke/dotix-assignment.git
cd dotix-assignment
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
node app.js
```
Backend runs at: http://localhost:5000

## 3️⃣ 🌍 Environment Variables Setup

This project uses environment variables to configure the backend API URL.

### 📁 Frontend Environment Setup

Inside the `frontend` folder, create a `.env` file.

Example: `frontend/.env`


### ✏️ Add The Following Variable

```env
VITE_API_BASE_URL=http://localhost:5000
```

### 4️⃣ Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at: http://localhost:5173

## 🔗 API Endpoints

| Method | Endpoint | Description |
|---------|-------------|----------------|
| GET | `/jobs` | Retrieve all jobs |
| GET | `/jobs/:id` | Retrieve single job details |
| POST | `/jobs` | Create a new job |
| POST | `/run-job/:id` | Trigger job execution |

## 🧪 Testing Workflow

1. Create a new job  
2. Verify job appears in dashboard  
3. Run the job  
4. Track status updates  
5. Verify webhook trigger  

---

## 📸 Screenshots

### Dashboard
![Unable to load Dashboard screen](./readme-images/dashboard-screen.png)

### Create Job Modal
![Unable to load Task create modal](./readme-images/task-create-modal.png)

### Job Detail View
![Unable to load Task detail screen](./readme-images/task-detail-screen.png)

---

## 🧠 Real-World Use Cases

- Scheduled email automation  
- Report generation  
- Data synchronization  
- Background processing workflows  

---

## 👨‍💻 Author

Surya Mahesh  

GitHub:  
https://github.com/SuryamaheshPenke