interface IButton {
  text: string;
  color: string;
  onClick: () => void;
}

export default function Button({ text, color, onClick }: IButton) {
  return (
    <button
      onClick={onClick}
      className={`inline-block w-16 py-3 mt-6 mr-2 text-sm text-white bg-${color}-500 rounded text-center m`}
    >
      {text}
    </button>
  );
}
