import { useState } from 'react';
import ExampleCard from './components/ExampleCard';

export default function App() {
  const [selected, setSelected] = useState(null);

  const items = [
    { id: '1', title: 'Example Item One', description: 'Click to select this item' },
    { id: '2', title: 'Example Item Two', description: 'Another example item' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Claude Vite Starter</h1>
      <p className="text-gray-500 text-sm mb-8">Delete this and start building.</p>
      <div className="w-full max-w-md space-y-3">
        {items.map((item) => (
          <ExampleCard
            key={item.id}
            title={item.title}
            description={item.description}
            onClick={() => setSelected(item.id)}
          />
        ))}
      </div>
      {selected && (
        <p className="mt-6 text-sm text-blue-600" data-testid="selected-output">
          Selected: {selected}
        </p>
      )}
    </div>
  );
}
