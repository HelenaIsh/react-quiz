# Quiz App – React + Vite + useReducer

This is a simple quiz application built as a learning project. It uses React (powered by Vite) and focuses on practicing state management with the useReducer hook.

### 🧠 Project Goal

The main purpose of this project was to get hands-on experience with the useReducer hook, especially useful when managing more complex application state.

### 🚀 Features
•	Simulated question loading and error handling
•	Multiple app states: loading, ready, active, finished, error
•	Answering questions with point tracking
•	“Next Question” navigation
•	Progress bar and countdown timer
•	Final results screen
•	Option to restart the quiz

### 🛠️ Tech Stack
•	React + TypeScript
•	Vite
•	useReducer (core concept)
•	Simple component-based architecture
•	Basic CSS styling

### ▶️ How to Run the Project

1. Start the JSON server (required for loading questions):
```npm run server```
This will start json-server at http://localhost:8000 and serve the questions from data/questions.json.
2.	In a new terminal tab, start the Vite dev server: ```npm run dev```
3. 	Open your browser at http://localhost:5173 (or the port shown in your terminal).