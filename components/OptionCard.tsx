import React from 'react';
import { Option } from '../types';

interface OptionCardProps {
  option: Option;
  isSelected: boolean;
  onClick: () => void;
}

const OptionCard: React.FC<OptionCardProps> = ({ option, isSelected, onClick }) => {
  const baseClasses = "flex flex-col items-center justify-center p-4 text-center border-2 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg";
  const selectedClasses = "bg-purple-500/30 border-purple-400 ring-2 ring-purple-400 shadow-purple-500/30";
  const unselectedClasses = "bg-slate-800/60 border-slate-700 hover:border-purple-400";

  return (
    <div
      className={`${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`}
      onClick={onClick}
      role="button"
      aria-pressed={isSelected}
      aria-label={option.name}
    >
      {option.icon}
      <span className="font-semibold text-gray-200">{option.name}</span>
    </div>
  );
};

export default OptionCard;
