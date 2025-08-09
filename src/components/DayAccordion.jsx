import { useState } from 'react';
import ExerciseCard from './ExerciseCard';

function DayAccordion({ day, onSave, onCopyLast }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800">
      <button
        className="w-full p-4 text-left font-semibold flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {day.day}
        <span>{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && (
        <div className="p-4">
          {day.exercises.map((exercise) => (
            <ExerciseCard
              key={exercise.name}
              exercise={exercise}
              day={day.day}
              onSave={onSave}
              onCopyLast={onCopyLast}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default DayAccordion;