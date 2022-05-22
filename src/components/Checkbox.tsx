import { ChangeEvent } from 'react';

export default function Checkbox({
  onChange,
  label,
  name,
}: {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  name: string;
}) {
  return (
    <div className="flex items-center mr-5">
      <input
        id="toy"
        type="checkbox"
        name={name}
        className="w-5 h-5 border-gray-300 rounded"
        onChange={onChange}
      />

      {label && (
        <label htmlFor="toy" className="ml-3 text-sm font-medium">
          {label}
        </label>
      )}
    </div>
  );
}
