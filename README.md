# Job Board Web App

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-blue?logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-7-blue?logo=prisma)](https://www.prisma.io/)
[![NextAuth](https://img.shields.io/badge/NextAuth.js-4-purple?logo=next-auth)](https://next-auth.js.org/)
[![Build](https://img.shields.io/github/actions/workflow/status/happycoder4ever/job-board-web-app/ci-build.yml?branch=main)](https://github.com/happycoder4ever/job-board-web-app/actions)

---

## Overview

A full-stack job board web app with role-based access:

- **Job Seekers**: browse jobs, apply, view applications
- **Employers**: post jobs, edit/delete jobs, view applicants

---

## Quick Start

- Clone the repo and install dependencies:
```bash
git clone <repo-url>
cd job-board-web-app
npm install
```
- Create `.env` file:
```bash
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="<your-secret>"
```
- Run Prisma migrations:
```bash
npx prisma migrate dev --name init
npx prisma generate
```
- Start development server:
```bash
npm run dev
```
---

## Structure

- `app/` – pages and components
- `lib/` – Prisma client and role guard
- `generated/` – Prisma client
- `prisma/schema.prisma` – database schema

---

## License

MIT
