import { useState } from 'react';
import SetInput from './SetInput';

function ExerciseCard({ exercise, day, onSave, onCopyLast }) {
  const [sets, setSets] = useState(exercise.sets || [{ weight: '', reps: '' }]);

  const addSet = () => setSets([...sets, { weight: '', reps: '' }]);
  const removeSet = (index) =>
    setSets(sets.filter((_, i) => i !== index));
  const updateSet = (index, field, value) => {
    const newSets = [...sets];
    newSets[index][field] = value;
    setSets(newSets);
    onSave(day, exercise.name, newSets);
  };

  return (
    <div className="mb-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-700">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">{exercise.name}</h3>
        <button
          className="text-sm text-blue-500 hover:underline"
          onClick={() => onCopyLast(day, exercise.name)}
        >
          Copy Last
        </button>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
        Goal: {exercise.goal}
      </p>
      {sets.map((set, index) => (
        <SetInput
          key={index}
          set={set}
          index={index}
          onUpdate={updateSet}
          onRemove={() => removeSet(index)}
          isLast={index === sets.length - 1}
        />
      ))}
      <button
        className="mt-2 text-sm text-blue-500 hover:underline"
        onClick={addSet}
      >
        + Add Set
      </button>
    </div>
  );
}

export default ExerciseCard;