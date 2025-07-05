import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Bot, User, LogIn, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useState, useRef, useEffect } from 'react';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen]);

  // Close menu on link click
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="p-2 bg-primary rounded-lg">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">AI Marketplace</span>
          </Link>

          {/* Desktop Nav */}
          <div className="flex items-center space-x-4 hidden md:flex">
            <Button variant="ghost" asChild>
              <Link to="/">Home</Link>
            </Button>
            <Button variant="ghost" asChild>
              <a href="https://nouscloud.tech/" target="_blank" rel="noopener noreferrer">Nouscloud</a>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/agents">Browse Agents</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/builder">AgentBuilder</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/ecosystem">AgentEcoSystem</Link>
            </Button>
            {isAuthenticated ? (
              <Button variant="outline" onClick={logout} className="flex items-center space-x-2">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link to="/login" className="flex items-center space-x-2">
                    <LogIn className="h-4 w-4" />
                    <span>Login</span>
                  </Link>
                </Button>
                <Button asChild>
                  <Link to="/signup" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>Sign Up</span>
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Hamburger Icon for Mobile */}
          <button
            className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Open menu"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {/* Mobile Dropdown */}
        {menuOpen && (
          <div
            ref={menuRef}
            className="md:hidden absolute left-0 right-0 top-20 z-50 bg-white border-b border-gray-200 shadow-lg animate-fade-in"
          >
            <div className="flex flex-col items-center py-4 space-y-2">
              <Link to="/" className="w-full text-center py-2 hover:bg-gray-100 rounded" onClick={handleLinkClick}>Home</Link>
              <a href="https://nouscloud.tech/" target="_blank" rel="noopener noreferrer" className="w-full text-center py-2 hover:bg-gray-100 rounded" onClick={handleLinkClick}>Nouscloud</a>
              <Link to="/agents" className="w-full text-center py-2 hover:bg-gray-100 rounded" onClick={handleLinkClick}>Browse Agents</Link>
              <Link to="/builder" className="w-full text-center py-2 hover:bg-gray-100 rounded" onClick={handleLinkClick}>AgentBuilder</Link>
              <Link to="/ecosystem" className="w-full text-center py-2 hover:bg-gray-100 rounded" onClick={handleLinkClick}>AgentEcoSystem</Link>
              {isAuthenticated ? (
                <button onClick={() => { logout(); handleLinkClick(); }} className="w-full text-center py-2 hover:bg-gray-100 rounded flex items-center justify-center gap-2">
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              ) : (
                <>
                  <Link to="/login" className="w-full text-center py-2 hover:bg-gray-100 rounded flex items-center justify-center gap-2" onClick={handleLinkClick}>
                    <LogIn className="h-4 w-4" /> Login
                  </Link>
                  <Link to="/signup" className="w-full text-center py-2 hover:bg-gray-100 rounded flex items-center justify-center gap-2" onClick={handleLinkClick}>
                    <User className="h-4 w-4" /> Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
