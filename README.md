# Taskudu - A Modern Todo Application

Taskudu is a full-stack todo application built with Next.js, Prisma, and Auth.js. It provides a clean, intuitive interface for managing your daily tasks with user authentication.

- [Demo Application](https://taskudu.vercel.app) - try out the live demo

## Features

- **User Authentication**: Secure signup and login functionality
- **Full CRUD Operations:** Create, edit, toggle, and delete To-Dos using secure Server Actions
- **Todo Management**: Create, edit, delete, and toggle todo status
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Modern UI**: Clean interface built with Tailwind CSS

## Tech Stack

| Category         | Technology                                                 |
| ---------------- | ---------------------------------------------------------- |
| Framework        | Next.js 16 (App Router)                                    |
| Authentication   | Auth.js (NextAuth) – Credentials Provider + Prisma Adapter |
| Database         | PostgreSQL (via Prisma ORM)                                |
| Security Actions | `authActionClient` from **Next Safe Action**               |
| Validation       | Zod                                                        |
| Forms            | React Hook Form + `useHookFormAction`                      |
| Styling          | Tailwind CSS                                               |
| UI Components    | Shadcn UI / Custom components                              |
| Deployment       | Vercel                                                     |

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL database

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Amin-Afshari/taskudu.git
   cd taskudu
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:

   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/taskudu"
   AUTH_SECRET="your-secret-key"
   ```

4. Run database migrations:

   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Security & Architecture Decisions

- **Authentication**: Using Auth.js with bcrypt for secure password hashing
- **Data Validation**: All inputs are validated using Zod schemas
- **Database Access**: Prisma ORM provides type-safe database access with prepared statements to prevent SQL injection
- **Server Actions**: Leveraging Next Safe Action for secure server-side operations
- **Form Security**: Using React Hook Form with validation to ensure data integrity

## Deployment

The application can be deployed to Vercel with minimal configuration:

```bash
npm run build
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## License

This project is licensed under the MIT License — feel free to use, modify, and distribute with attribution.
