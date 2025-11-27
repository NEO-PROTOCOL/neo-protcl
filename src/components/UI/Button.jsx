export default function Button({ children, className = '', variant = 'primary', ...props }) {
  const variants = {
    primary: {
      border: 'border-cyan-400/50',
      bg: 'bg-gray-800/50',
      text: 'text-cyan-300',
      hover: 'hover:border-cyan-400 hover:bg-gray-800/70',
      glow: '0 0 15px rgba(0, 255, 255, 0.3), inset 0 0 10px rgba(0, 255, 255, 0.1)',
      textShadow: '0 0 8px rgba(0, 255, 255, 0.6)'
    },
    secondary: {
      border: 'border-blue-400/50',
      bg: 'bg-gray-800/50',
      text: 'text-blue-300',
      hover: 'hover:border-blue-400 hover:bg-gray-800/70',
      glow: '0 0 15px rgba(59, 130, 246, 0.3), inset 0 0 10px rgba(59, 130, 246, 0.1)',
      textShadow: '0 0 8px rgba(59, 130, 246, 0.6)'
    },
    danger: {
      border: 'border-red-400/50',
      bg: 'bg-gray-800/50',
      text: 'text-red-300',
      hover: 'hover:border-red-400 hover:bg-gray-800/70',
      glow: '0 0 15px rgba(239, 68, 68, 0.3), inset 0 0 10px rgba(239, 68, 68, 0.1)',
      textShadow: '0 0 8px rgba(239, 68, 68, 0.6)'
    }
  };

  const style = variants[variant] || variants.primary;

  return (
    <button
      className={`px-6 py-3 border-2 ${style.border} ${style.bg} ${style.text} ${style.hover} backdrop-blur-sm font-mono text-sm transition-all cyber-glow ${className}`}
      style={{
        boxShadow: style.glow,
        textShadow: style.textShadow
      }}
      {...props}
    >
      {children}
    </button>
  );
}

