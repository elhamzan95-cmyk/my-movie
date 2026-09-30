// src/components/common/ProgressBar.jsx
const ProgressBar = ({ progress }) => {
  if (progress <= 0) return null;

  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-600">Uploading...</span>
        <span className="text-sm font-bold">{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;