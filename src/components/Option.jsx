import React from 'react'

const Option = ({ text, onClick, isCorrect, isSelected, correctAnswer, state }) => {
  const getButtonStyle = () => {
    if (state === 'selected') {
      if (isCorrect === true) {
        return 'bg-green-500 text-white';
      } else if (isCorrect === false) {
        return 'bg-red-500 text-white';
      }
      return 'bg-blue-500 text-white';
    } else if (state === 'default') {
      return 'bg-gray-200 hover:bg-gray-300';
    }
  };

  return (
    <button
      onClick={onClick}
      className={`w-full p-2 text-left rounded transition duration-300 ${getButtonStyle()}`}
      disabled={isCorrect !== null}
    >
      {text}
      {isCorrect !== null && isSelected && (
        <span className="ml-2">
          {isCorrect ? '✓' : '✗'}
        </span>
      )}
    </button>
  )
}

export default Option