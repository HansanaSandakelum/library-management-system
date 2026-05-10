# 📚 Library Management System

A modern, full-stack Library Management System built with **.NET 9** and **React (Vite)**. This application features a robust Clean Architecture backend and a premium, responsive frontend with role-based authentication and a sleek dark mode.

---

## ✨ Features

- **Authentication & Authorization**: Secure login system using JWT (JSON Web Tokens) and role-based access control (Admin/User).
- **Book Management**: Full CRUD operations (Create, Read, Update, Delete) for books in the library collection.
- **Premium UI/UX**: Modern design with glassmorphism, smooth animations, and a fully functional dark mode.
- **Form Validation**: Robust frontend validation using Formik and Yup.
- **Clean Architecture**: Backend organized into Domain, Application, Infrastructure, and API layers for maximum maintainability.
- **Responsive Design**: Fully optimized for desktops, tablets, and mobile devices.

---

## 🛠️ Tech Stack

### Backend
- **Framework**: .NET 9 Web API
- **Architecture**: Clean Architecture (Onion)
- **Database**: SQLite with Entity Framework Core
- **Security**: JWT Authentication & BCrypt Password Hashing
- **Validation**: FluentValidation

### Frontend
- **Framework**: React 19 (Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Form Handling**: Formik & Yup
- **Notifications**: React Hot Toast
- **State Management**: React Context API (Auth)
- **HTTP Client**: Axios

---

## 🚀 Getting Started

### Prerequisites
- [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)
- [Node.js (v18+)](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend/LibraryManagementAPI/LibraryManagement.API
   ```
2. Restore dependencies:
   ```bash
   dotnet restore
   ```
3. Run the application (this will automatically create and seed the SQLite database):
   ```bash
   dotnet run
   ```
   *The API will be available at `http://localhost:5071`*

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   *The application will be available at `http://localhost:5173`*

---

## 🔑 Demo Credentials

The system comes pre-seeded with the following accounts:

| Role | Username | Password |
| :--- | :--- | :--- |
| **Admin** | `admin` | `admin123` |


---

## 📁 Project Structure

### Backend (Clean Architecture)
- **Domain**: Core entities and repository interfaces.
- **Application**: Business logic, DTOs, service implementations, and validators.
- **Infrastructure**: Data persistence (EF Core, DbContext) and external service implementations.
- **API**: Controllers, Middlewares, and configuration.

### Frontend
- **src/components**: Reusable UI components (Navbar, Modals, etc.).
- **src/context**: Global state providers (AuthContext).
- **src/hooks**: Custom React hooks (useTheme, etc.).
- **src/pages**: Main view components (LoginPage, BooksPage).
- **src/services**: API communication layer.
- **src/types**: TypeScript interface definitions.

---



