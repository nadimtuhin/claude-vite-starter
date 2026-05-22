export default function ExampleCard({ title, description, onClick }) {
  function handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  }

  return (
    <div
      className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-blue-400 transition-colors"
      data-testid="example-card"
      role="button"
      tabIndex={0}
      aria-label={title}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
    </div>
  );
}
