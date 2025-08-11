
---

# Full Stack User & Task Management Application

This is a **full-stack application** built with **React (Vite)** for the frontend and **Spring Boot** for the backend using **MySQL** for data storage.
It allows users to register, log in, manage their profile, and create/manage a to-do list.

<img width="1891" height="915" alt="Image" src="https://github.com/user-attachments/assets/63ae9912-6c89-4d6e-a686-e1f86ba28e3a" />

---

## 📌 Features

### **Frontend (React + Vite)**

* User Registration
* User Login
* Forgot Password
* Dashboard with:
  * User Information
  * Change Password
  * Logout
  * To-Do List (Create, Update, Delete, View, Sort, Highlight Today's Tasks)

### **Backend (Spring Boot)**

* REST API for User & Task Management
* JWT Authentication
* MySQL Database Integration
* Input Validation & Error Handling
* Swagger API Documentation

---

## 🛠 Tech Stack

* **Frontend:** React (Vite), Axios, Tailwind CSS / CSS Modules
* **Backend:** Spring Boot, Spring Security, Spring Data JPA, JWT, Swagger
* **Database:** MySQL

---

## 📂 Project Structure

```
frontend/   → React (Vite) application
backend/    → Spring Boot application
```

---

## ⚙️ Prerequisites

Make sure you have the following installed:

* [Node.js](https://nodejs.org/) (v20+ recommended)
* [Java JDK](https://adoptium.net/) (21+)
* [Maven](https://maven.apache.org/)
* [MySQL Server](https://dev.mysql.com/downloads/)

---

## 🚀 Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/gimhanadeshan/user-task-management-system.git
cd user-task-management-system
```

---

### 2️⃣ MySQL Database Setup

1. Start MySQL server.
2. Create a database:

```sql
CREATE DATABASE task_management_db;
```

3. Update `application.properties` in `backend/src/main/resources`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/task_management_db
spring.datasource.username=YOUR_DB_USERNAME
spring.datasource.password=YOUR_DB_PASSWORD
spring.jpa.hibernate.ddl-auto=update
```

---

### 3️⃣ Backend Setup

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Backend runs on **`http://localhost:8080`**

---

### 4️⃣ Frontend Setup (Vite)

1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

3. Install dependencies and run:

```bash
npm install
npm run dev
```

Frontend runs on **`http://localhost:5173`** (default Vite port)

---

## 📜 API Documentation (Swagger)

Once the backend is running, you can explore and test the API using Swagger UI:
🔗 **[Swagger Documentation](http://localhost:8080/swagger-ui/index.html)**

---

## 🔑 Default API Endpoints

### **User**

* `POST /api/register` – Register user
* `POST /api/login` – Login user
* `POST /api/forgot-password` – Request password reset
* `POST /api/reset-password` – Reset password
* `PUT /api/change-password` – Change password (logged in)

### **Tasks**

* `GET /api/tasks` – Get all tasks
* `POST /api/tasks` – Create task
* `PUT /api/tasks/{id}` – Update task
* `DELETE /api/tasks/{id}` – Delete task
* `GET /api/tasks/today` – Get today’s tasks

---

## 📜 License

This project is for educational and interview purposes.

---
