# Task Manager App
A simple React application for managing tasks.

Users can add new tasks, mark them as complete or incomplete, and search through the list of tasks; task data is persisted via a local JSON server.

---

## Features
- Add new tasks
- Toggle task completion
- Search and filter tasks in real-time
- Fetch and persist tasks via JSON server
- Global state management using React Context API

---

## Tech Stack

- React
- React Context API
- React Hooks (`useState`, `useEffect`, `useContext`, `useRef`, `useId`)
- JSON Server (mock API)
- Testing with Vitest and React Testing Library

## Notes
- Tasks are stored and retrieved from `http://localhost:6001/tasks`
- Context is used to avoid prop drilling and allow components to access task-related state and functions globally

---

## Installation & Setup
1. Clone the repository:
```bash
git clone <your-repo-url>
cd task-manager
```
2. Install dependencies:
```bash
npm install
```
3. Start the JSON server:
```bash
npx json-server --watch db.json --port 6001
```
4. Start the React app:
```bash
npm run dev
```

### Run Tests
```bash
npm run test
```

### File Structure
```css
src/
├── components/
│   ├── App.jsx
│   ├── TaskForm.jsx
│   ├── TaskList.jsx
│   └── SearchBar.jsx
├── context/
│   └── TaskContext.jsx
├── __tests__/
│   └── App.test.jsx
├── index.css
└── main.jsx
```

## Future Ideas (Stretch Goals)
- Add user authentication
- Introduce a theme toggle (light/dark mode), maybe also with a parchment texture or color/style
- Persist completed task status in local storage
- Add due dates or priorities and categories
- Add the ability to drag and drop to reorder tasks
- Add an embedded pomodoro timer functionality
- Add a graphical indicator besides crossing it out when a task is completed (yay dopamine!)
- Find a way to add a version of this [Anya pointing image](https://images.gamebanana.com/img/ico/sprays/627d932c150ba.png) to quickly identify and separate visuall the current task with the highest priority

## About This Repo

### Author
Nick Rathbone
[GitHub Profile](https://github.com/nrathbone-turing)

*Note: This project is part of the Flatiron React Module lab/assessment*

### License
MIT — feel free to use or remix!

### Demo
[Include a screenshot or short GIF of the app in action]()