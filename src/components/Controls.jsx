import React from "react";

const Controls = ({
  region,
  setRegion,
  seed,
  setSeed,
  randomizeSeed,
  avgLikes,
  setAvgLikes,
  avgReviews,
  setAvgReviews,
}) => {
  return (
    <div className="p-4 bg-gray-100 rounded shadow space-y-4">
      {/* Language & Region */}
      <div>
        <label className="block font-medium">Language / Region:</label>
        <select
          className="mt-1 p-2 border rounded w-full"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          <option value="en">English</option>
          <option value="de">German</option>
          <option value="ru">Russian</option>
        </select>
      </div>

      {/* Seed */}
      <div>
        <label className="block font-medium">Seed:</label>
        <div className="flex space-x-2">
          <input
            className="flex-1 p-2 border rounded"
            type="text"
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
          />
          <button
            onClick={randomizeSeed}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            🎲 Random
          </button>
        </div>
      </div>

      {/* Avg Likes */}
      <div>
        <label className="block font-medium">
          Avg Likes: {avgLikes.toFixed(1)}
        </label>
        <input
          className="w-full"
          type="range"
          min={0}
          max={10}
          step={0.1}
          value={avgLikes}
          onChange={(e) => setAvgLikes(parseFloat(e.target.value))}
        />
      </div>

      {/* Avg Reviews */}
      <div>
        <label className="block font-medium">Avg Reviews:</label>
        <input
          className="w-full p-2 border rounded"
          type="number"
          min={0}
          step={0.1}
          value={avgReviews}
          onChange={(e) => setAvgReviews(parseFloat(e.target.value))}
        />
      </div>
    </div>
  );
};

export default Controls;
