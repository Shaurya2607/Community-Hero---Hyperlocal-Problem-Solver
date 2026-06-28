# 🌍 Community Hero

Community Hero is an AI-powered civic issue reporting platform that enables citizens to report local problems such as potholes, garbage dumps, water leakage, streetlight failures, and other public infrastructure issues. The platform leverages **Google Gemini AI** to automatically analyze reported issues, categorize them, assign priorities, recommend responsible departments, and generate AI-powered summaries and solutions.

The project aims to bridge the gap between citizens and local authorities by making issue reporting smarter, faster, and more transparent.

---

# 🚀 Features

### 👤 User Authentication

* Secure user registration and login
* JWT-based authentication
* Protected routes

### 📝 Report Issues

* Report civic problems with:

  * Title
  * Description
  * Location
  * Latitude & Longitude
* AI-assisted issue analysis

### 🤖 Google Gemini AI Integration

Automatically generates:

* Issue Category
* Priority Level
* Responsible Department
* AI Summary
* Suggested Solution

### 🗺️ Interactive Maps

* Google Maps integration
* Location picker
* Display issue locations on the map

### 👍 Community Engagement

* Upvote reported issues
* Comment on issues
* Community participation

### 📊 Dashboard

* Total Issues
* Resolved Issues
* Pending Issues
* Upvotes
* Recent Issues
* Analytics Charts

### 🔔 Notifications

* Receive notifications for important issue updates.

### 📈 Admin Analytics

* Issue statistics
* Category distribution
* Resolution status
* Dashboard insights

---

# 🛠️ Tech Stack

## Frontend

* React.js
* Vite
* Bootstrap
* React Router DOM
* Axios
* Chart.js
* React Icons

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Google Gemini AI API

---

# 📂 Project Structure

```
Community-Hero/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── config/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/community-hero.git
```

```bash
cd community-hero
```

---

## Backend Setup

```bash
cd Backend
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

GEMINI_API_KEY=your_google_gemini_api_key
```

Run Backend

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd Frontend
```

Install dependencies

```bash
npm install
```

Run Frontend

```bash
npm run dev
```

---

# 🔑 Environment Variables

Backend `.env`

```env
PORT=5000

MONGO_URI=

JWT_SECRET=

GEMINI_API_KEY=
```

---

# 📡 API Endpoints

## Authentication

```
POST /api/auth/register

POST /api/auth/login
```

## Issues

```
GET    /api/issues

POST   /api/issues

GET    /api/issues/:id

PUT    /api/issues/:id

DELETE /api/issues/:id

PUT    /api/issues/:id/upvote
```

## Dashboard

```
GET /api/dashboard

GET /api/dashboard/analytics
```

---

# 🤖 AI Workflow

1. User reports an issue.
2. Backend sends the description to Google Gemini AI.
3. Gemini analyzes the issue.
4. AI returns:

   * Category
   * Priority
   * Department
   * Summary
   * Suggested Solution
5. The analyzed issue is stored in MongoDB.
6. Users can view, comment, and upvote the issue.

---

# 📸 Screenshots

Add screenshots of:

![alt text](image.png)
![alt text](image-1.png)
![alt text](image-2.png)
![alt text](image-3.png)
![alt text](image-4.png)
![alt text](image-5.png)

---

# 🔮 Future Enhancements

* Email notifications
* Image-based issue detection using AI
* Duplicate issue detection
* Real-time issue tracking
* Authority/Admin Portal
* Mobile application
* Leaderboard and reward system
* Multi-language support
* Push notifications
* AI chatbot for citizen assistance

---

# 👨‍💻 Authors

**Shaurya Gangwar**

Built as a hackathon project to promote smarter civic engagement using Artificial Intelligence.

---

# 🙏 Acknowledgements

* Google Gemini AI
* MongoDB
* Express.js
* React.js
* Node.js
* Bootstrap
* Chart.js
* Vite

---

# 📄 License

This project is licensed under the MIT License.

Feel free to use, modify, and contribute to this project.
