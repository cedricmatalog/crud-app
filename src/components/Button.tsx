interface IButton {
  text: string;
  color?: string;
  size?: string;
  border?: string;
  disabled?: boolean;
  onClick: () => void;
}

const colors: Record<string, string> = {
  white: '',
  green: 'bg-green-500',
  red: 'bg-red-500',
  blue: 'bg-blue-500',
  gray: 'bg-gray-500',
};

const sizes: Record<string, string> = {
  16: 'w-16',
  24: 'w-24',
  48: 'w-48',
};

const borders: Record<string, string> = {
  none: 'text-white',
  red: 'border border-red-500 text-red-500',
};

export default function Button({
  text,
  color = 'green',
  size = '16',
  border = 'none',
  disabled = false,
  onClick,
}: IButton) {
  return (
    <button
      data-testid={text}
      disabled={disabled}
      onClick={onClick}
      className={`inline-block w-16 py-3 mt-6 mr-2 text-sm rounded text-center m 
      ${colors[color]} ${sizes[size]} ${borders[border]} 
      ${disabled ? 'cursor-not-allowed' : ''}`}
    >
      {text}
    </button>
  );
}
