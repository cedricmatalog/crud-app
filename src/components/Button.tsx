interface IButton {
  text: string;
  color: string;
  onClick: () => void;
}

export default function Button({ text, color, onClick }: IButton) {
  const colors: Record<string, string> = {
    green: 'bg-green-500',
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    gray: 'bg-gray-500'
  };

  return (
    <button
      onClick={onClick}
      className={`inline-block w-16 py-3 mt-6 mr-2 text-sm text-white rounded text-center m ${colors[color]}`}
    >
      {text}
    </button>
  );
}
