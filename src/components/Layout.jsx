import { Outlet } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-primary-foreground p-4">
        <nav className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">SNS Domains</Link>
          <div className="space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/search">Search</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/marketplace">Marketplace</Link>
            </Button>
          </div>
        </nav>
      </header>
      <main className="flex-grow container mx-auto p-4">
        <Outlet />
      </main>
      <footer className="bg-secondary text-secondary-foreground p-4">
        <div className="container mx-auto text-center">
          &copy; 2024 SNS Domains. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
