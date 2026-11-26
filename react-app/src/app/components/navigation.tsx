import React from 'react';
import { Link, NavLink } from 'react-router';

const navItems = (
  <>
    <NavLink to="/ideas" end>
      Discover Ideas
    </NavLink>
  </>
);

const Navigation = () => {
  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          AIdeas
        </Link>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-4">{navItems}</div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
