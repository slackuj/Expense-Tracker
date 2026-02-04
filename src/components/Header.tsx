import './Header.css';
interface HeaderProps {
    title: string;
    description: string;
}

const Header = ({title, description}: HeaderProps) => {
   return (
      <header className="header">
          <h1 className="header-title">{title}</h1>
          <p className="header-description">{description}</p>
      </header>
   )
}

export default Header;