# Lit-View 📚

[Live Demo](https://litview.netlify.app/books/)

**Lit-View** is a simple book catalog application built with **Next.js** and **TypeScript**.  
It was developed as a test assignment for [Plan9](https://plan9.tech/).

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Installation](#installation)  
- [Usage](#usage)  
- [Project Structure](#project-structure)  

---

## Features

- Browse a list of books  
- View detailed book information (title, author, description, etc.)  
- Responsive UI  
- Deployed with **Netlify**  

---

## Tech Stack

| Category       | Technology |
|----------------|------------|
| Framework      | [Next.js](https://nextjs.org/) (App Router) |
| Language       | [TypeScript](https://www.typescriptlang.org/) |
| Styling        | CSS Modules / PostCSS (or Tailwind if applied) |
| Deployment     | [Netlify](https://www.netlify.com/) |
| Code Quality   | ESLint, Prettier |

---

## Installation

Clone the repository:

```bash
git clone https://github.com/PaHuMbIu/lit-view.git
```

```bash
cd lit-view
```

Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```
## Usage

Development:
```bash
npm run dev
```

The app will be available at:
👉 http://localhost:3000

## Production

Build and start:

```bash
npm run build
npm run start
```
## Project Structure

```bash
lit-view/
├── public/         # Static assets
├── src/            # Source code
│   ├── app/        # App Router pages
│   ├── components/ # Reusable UI components
│   ├── styles/     # Styling
│   └── utils/      # Helpers and utilities
├── next.config.mjs
├── tsconfig.json
├── package.json
├── netlify.toml    # Netlify deployment config
└── …               # Linting, formatting configs, etc.
```
