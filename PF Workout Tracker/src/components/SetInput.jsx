function SetInput({ set, index, onUpdate, onRemove, isLast }) {
  const adjustWeight = (amount) => {
    const currentWeight = parseFloat(set.weight) || 0;
    const newWeight = Math.max(0, currentWeight + amount);
    onUpdate(index, 'weight', newWeight.toString());
  };

  return (
    <div className="flex items-center space-x-2 mb-2">
      <input
        type="number"
        value={set.weight}
        onChange={(e) => onUpdate(index, 'weight', e.target.value)}
        placeholder="Weight (lbs)"
        className="w-24 p-2 border rounded dark:bg-gray-600 dark:text-white"
      />
      <button
        onClick={() => adjustWeight(5)}
        className="px-2 py-1 bg-blue-500 text-white rounded"
      >
        +5
      </button>
      <button
        onClick={() => adjustWeight(-5)}
        className="px-2 py-1 bg-red-500 text-white rounded"
      >
        -5
      </button>
      <input
        type="number"
        value={set.reps}
        onChange={(e) => onUpdate(index, 'reps', e.target.value)}
        placeholder="Reps"
        className="w-20 p-2 border rounded dark:bg-gray-600 dark:text-white"
      />
      {!isLast && (
        <button
          onClick={onRemove}
          className="text-red-500 hover:text-red-700"
        >
          ×
        </button>
      )}
    </div>
  );
}

export default SetInput;