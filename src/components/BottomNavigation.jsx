import { Link, useLocation } from 'react-router-dom';

export default function BottomNavigation() {
  const location = useLocation();

  const navItems = [
    { path: '/', symbol: 'HOME', label: 'HOME', color: 'cyan' },
    { path: '/nos', symbol: 'NODES', label: 'NODES', color: 'blue' },
    { path: '/manifesto', symbol: 'DOCS', label: 'DOCS', color: 'purple' },
    { path: '/mcp', symbol: 'MCP', label: 'MCP', color: 'green' },
  ];

  const getColorStyles = (color, isActive) => {
    const colors = {
      cyan: {
        active: { text: 'text-cyan-400', shadow: '0 0 8px rgba(0, 255, 255, 0.6), 0 0 16px rgba(0, 255, 255, 0.3)' },
        inactive: { text: 'text-gray-500', shadow: 'none' },
        border: 'rgba(0, 255, 255, 0.3)',
        gradient: 'linear-gradient(90deg, rgba(0,255,255,0.8), rgba(0,255,255,0.4))',
        glow: '0 0 8px rgba(0,255,255,0.6)'
      },
      blue: {
        active: { text: 'text-blue-400', shadow: '0 0 8px rgba(59, 130, 246, 0.6), 0 0 16px rgba(59, 130, 246, 0.3)' },
        inactive: { text: 'text-gray-500', shadow: 'none' },
        border: 'rgba(59, 130, 246, 0.3)',
        gradient: 'linear-gradient(90deg, rgba(59,130,246,0.8), rgba(59,130,246,0.4))',
        glow: '0 0 8px rgba(59,130,246,0.6)'
      },
      purple: {
        active: { text: 'text-purple-400', shadow: '0 0 8px rgba(168, 85, 247, 0.6), 0 0 16px rgba(168, 85, 247, 0.3)' },
        inactive: { text: 'text-gray-500', shadow: 'none' },
        border: 'rgba(168, 85, 247, 0.3)',
        gradient: 'linear-gradient(90deg, rgba(168,85,247,0.8), rgba(168,85,247,0.4))',
        glow: '0 0 8px rgba(168,85,247,0.6)'
      },
      green: {
        active: { text: 'text-green-400', shadow: '0 0 8px rgba(34, 197, 94, 0.6), 0 0 16px rgba(34, 197, 94, 0.3)' },
        inactive: { text: 'text-gray-500', shadow: 'none' },
        border: 'rgba(34, 197, 94, 0.3)',
        gradient: 'linear-gradient(90deg, rgba(34,197,94,0.8), rgba(34,197,94,0.4))',
        glow: '0 0 8px rgba(34,197,94,0.6)'
      }
    };
    return colors[color] || colors.cyan;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-gray-800/95 backdrop-blur-sm border-t border-gray-600/50 shadow-lg safe-area-inset"
         style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="flex items-center px-0 py-2">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          const colorStyles = getColorStyles(item.color, isActive);
          const style = isActive ? colorStyles.active : colorStyles.inactive;
          const isLast = index === navItems.length - 1;
          
          return (
            <div key={item.path} className="flex items-center flex-1">
              <Link
                to={item.path}
                className={`relative flex flex-col items-center justify-center py-2 px-2 flex-1 transition-all touch-manipulation font-mono border-r ${style.text} ${
                  isActive ? 'scale-105' : 'active:text-gray-400'
                }`}
                style={{
                  textShadow: style.shadow,
                  borderRightColor: isLast ? 'transparent' : 'rgba(107, 114, 128, 0.3)',
                  borderRightWidth: isLast ? '0' : '1px'
                }}
              >
                <span className="text-[10px] font-black leading-tight tracking-wider mb-0.5">
                  {item.symbol}
                </span>
                <span className="text-[8px] font-medium leading-tight tracking-wide opacity-80">
                  {item.label}
                </span>
                {isActive && (
                  <div 
                    className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-10 h-0.5 rounded-full"
                    style={{
                      background: colorStyles.gradient,
                      boxShadow: colorStyles.glow
                    }}
                  ></div>
                )}
              </Link>
            </div>
          );
        })}
      </div>
    </nav>
  );
}

