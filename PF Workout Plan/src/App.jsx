import { useState, useEffect } from 'react';
import DayAccordion from './components/DayAccordion';
import { defaultRoutine } from './data';

function App() {
  const [routine, setRoutine] = useState(defaultRoutine);
  const [workoutHistory, setWorkoutHistory] = useState({});

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('workoutHistory');
    if (savedHistory) {
      setWorkoutHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save history to localStorage on update
  useEffect(() => {
    localStorage.setItem('workoutHistory', JSON.stringify(workoutHistory));
  }, [workoutHistory]);

  const saveWorkout = (day, exercise, sets) => {
    setWorkoutHistory((prev) => ({
      ...prev,
      [day]: { ...prev[day], [exercise]: sets },
    }));
  };

  const copyLastSession = (day, exercise) => {
    const lastSets = workoutHistory[day]?.[exercise] || [];
    if (lastSets.length > 0) {
      setRoutine((prev) =>
        prev.map((d) =>
          d.day === day
            ? {
                ...d,
                exercises: d.exercises.map((ex) =>
                  ex.name === exercise ? { ...ex, sets: [...lastSets] } : ex
                ),
              }
            : d
        )
      );
    }
  };

  return (
    <div className="min-h-screen p-4">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-center">PF Workout Tracker</h1>
      </header>
      <main>
        {routine.map((day) => (
          <DayAccordion
            key={day.day}
            day={day}
            onSave={saveWorkout}
            onCopyLast={copyLastSession}
          />
        ))}
      </main>
    </div>
  );
}

export default App;