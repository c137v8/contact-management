# Contact Management Web App (MERN)

A simple **Contact Management Web Application** built as part of a web developer interview task.  
The project demonstrates core **MERN stack fundamentals** with clean architecture, REST APIs, and a responsive UI.

---

## Tech Stack

### Frontend
- Next.js (App Router)
- React (useState, useEffect)
- TypeScript
- CSS (custom, minimal)

### Backend
- Node.js
- Express.js
- MongoDB (MongoDB Atlas)
- Mongoose
- TypeScript

### Deployment
- Backend: Render
- Database: MongoDB Atlas

---

## Features

- Add new contacts (Name, Email, Phone, Message)
- Client-side validation with disabled submit button
- Fetch and display contacts without page reload
- Delete contacts
- Responsive and clean UI
- RESTful API design

---

## Project Structure

```
contact-management/
├── app/                # Next.js frontend
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
├── server/             # Express backend
│   ├── models/
│   │   └── Contact.ts
│   ├── routes/
│   │   └── contactRoutes.ts
│   ├── server.ts
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

---

## Live Backend API

```
https://contact-management-iehc.onrender.com/api/contacts
```

---

## API Endpoints

### GET all contacts
```
GET /api/contacts
```

### Create a contact
```
POST /api/contacts
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "message": "Hello"
}
```

### Delete a contact
```
DELETE /api/contacts/:id
```

---

## Running Locally

### Backend
```bash
cd server
npm install
npm run dev
```

Create a `.env` file in `server/`:
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

---

### Frontend
```bash
npm install
npm run dev
```

Update API URL in `app/page.tsx` if running locally:
```ts
const API_URL = "http://localhost:5000/api/contacts";
```

---

## Notes

- MongoDB Atlas IP access is set to `0.0.0.0/0` to support Render deployment.
- The project prioritizes working functionality and clarity over over-engineering.
- Designed to be completed within a 60-minute interview time limit.

---

## Author

**Ibrahim**

---

## License

This project is for evaluation and learning purposes.
