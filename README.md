# TaskEase To-Do App

Welcome to TaskEase, a modern and intelligent to-do list application built with Next.js and enhanced with AI-powered features. This app provides a simple, beautiful, and efficient way to manage your daily tasks.

## ✨ Features

- **Create, Edit, and Delete Tasks:** Easily manage your to-do list with intuitive controls.
- **Task Statuses:** Keep track of your progress by setting a status for each task (`To Do`, `In Progress`, `Done`).
- **Due Dates:** Assign due dates to your tasks to stay organized and on schedule.
- **AI-Powered Suggestions:** Get smart task suggestions based on your current workload.
- **Persistent Storage:** Your tasks are automatically saved to your browser's local storage, so you'll never lose your progress.
- **Light & Dark Modes:** Switch between a light and dark theme to match your preference.
- **Engaging UI:** A beautiful and dynamic interface with a welcoming splash screen and smooth animations.
- **Dynamic Header:** The header displays the current time and your location.

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or later recommended)
- [npm](https://www.npmjs.com/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    - Create a new file named `.env.local` in the root of your project.
    - Add your Gemini API key to this file. You can get a key from [Google AI Studio](https://makersuite.google.com/).

    ```
    GEMINI_API_KEY=YOUR_API_KEY_HERE
    ```

### Running the Development Server

Once you've completed the setup, you can run the development server:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) in your browser to see the application.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
- **AI Integration:** [Genkit](https://firebase.google.com/docs/genkit)
- **Icons:** [Lucide React](https://lucide.dev/guide/packages/lucide-react)
