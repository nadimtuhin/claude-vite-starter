import { render, screen, fireEvent } from '@testing-library/react';
import ExampleCard from './ExampleCard';

describe('ExampleCard', () => {
  it('renders title', () => {
    render(<ExampleCard title="Hello" />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(<ExampleCard title="Hello" description="World" />);
    expect(screen.getByText('World')).toBeInTheDocument();
  });

  it('does not render description when omitted', () => {
    const { container } = render(<ExampleCard title="Hello" />);
    expect(container.querySelector('p')).toBeNull();
  });

  it('calls onClick when clicked', () => {
    const handler = vi.fn();
    render(<ExampleCard title="Hello" onClick={handler} />);
    fireEvent.click(screen.getByTestId('example-card'));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('calls onClick on Enter key', () => {
    const handler = vi.fn();
    render(<ExampleCard title="Hello" onClick={handler} />);
    fireEvent.keyDown(screen.getByTestId('example-card'), { key: 'Enter' });
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('calls onClick on Space key', () => {
    const handler = vi.fn();
    render(<ExampleCard title="Hello" onClick={handler} />);
    fireEvent.keyDown(screen.getByTestId('example-card'), { key: ' ' });
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('has data-testid example-card', () => {
    render(<ExampleCard title="Hello" />);
    expect(screen.getByTestId('example-card')).toBeInTheDocument();
  });
});
