import { Outlet, Link } from "react-router-dom";


const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-700 via-gray-900 to-black text-white">
      <nav className="p-4">
        <ul className="flex gap-4">
          <li>
            <Link to="/" className="hover:underline">Home</Link>
          </li>
          <li>
            <Link to="/sign-up" className="hover:underline">Sign Up</Link>
          </li>
          <li>
            <Link to="/sign-in" className="hover:underline">Sign In</Link>
          </li>
          <li>
            <Link to="/cart" className="hover:underline">Cart</Link>
          </li>
        </ul>
      </nav>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
