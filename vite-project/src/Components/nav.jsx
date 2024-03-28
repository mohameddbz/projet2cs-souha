import { Link } from 'react-scroll';

const Nav = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="bg-slate-900 text-white lg:flex justify-between items-center p-4 hidden">
        <span className="text-3xl font-bold">Logo</span>
        <ul className="flex gap-8">
          <li><Link to="Home" spy={true} smooth={true} className="cursor-pointer hover:text-yellow-300">Home</Link></li>
          <li><Link to="About" spy={true} smooth={true} className="cursor-pointer hover:text-yellow-300">About</Link></li>
          <li><Link to="Contact" spy={true} smooth={true} className="cursor-pointer hover:text-yellow-300">Contact</Link></li>
          <li><Link to="Projects" spy={true} smooth={true} className="cursor-pointer hover:text-yellow-300">Projects</Link></li>
          <li><Link to="Services" spy={true} smooth={true} className="cursor-pointer hover:text-yellow-300">Services</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
