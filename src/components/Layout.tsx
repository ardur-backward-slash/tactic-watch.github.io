import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Eye, Home, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Scam Types', href: '/scams', icon: Shield },
    { name: 'Dark Patterns', href: '/dark-patterns', icon: Eye },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="bg-dark-grey/90 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="bg-primary/20 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xl font-bold font-heading text-white">
                ScamGuard
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      isActive(item.href)
                        ? 'bg-primary/20 text-primary'
                        : 'text-light-grey hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-paragraph">{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/10 py-4"
            >
              <nav className="flex flex-col gap-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActive(item.href)
                          ? 'bg-primary/20 text-primary'
                          : 'text-light-grey hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-paragraph">{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-dark-grey/50 border-t border-white/10 mt-24">
        <div className="max-w-[100rem] mx-auto px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/20 p-2 rounded-lg">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <span className="text-xl font-bold font-heading text-white">
                  ScamGuard
                </span>
              </div>
              <p className="text-light-grey font-paragraph leading-relaxed">
                Empowering users with knowledge to identify and protect against 
                online scams and deceptive tactics.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold font-heading text-white mb-4">
                Quick Links
              </h3>
              <nav className="flex flex-col gap-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-light-grey hover:text-primary transition-colors duration-200 font-paragraph"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Mission */}
            <div>
              <h3 className="text-lg font-bold font-heading text-white mb-4">
                Our Mission
              </h3>
              <p className="text-light-grey font-paragraph leading-relaxed">
                To create a safer digital environment by educating users about 
                common scams and manipulative design patterns.
              </p>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-light-grey font-paragraph">
              © 2024 ScamGuard. Built to protect and educate.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}