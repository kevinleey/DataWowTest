import Link from "next/link";

interface NavbarItemProps {
  path?: string;
  icon?: React.ReactNode;
  text: string;
  isActive?: boolean;
  onClick?: () => void;
}

export default function NavbarItem({
  path,
  icon,
  text,
  isActive,
  onClick,
}: NavbarItemProps) {
  const content = (
    <div className="navbar-item-content">
      {icon && icon}
      <span className="navbar-item-text">{text}</span>
    </div>
  );

  return (
    <li
      className="navbar-item"
      style={{ backgroundColor: isActive ? "#EAF5F9" : "transparent" }}
    >
      {path ? (
        <Link href={path}>{content}</Link>
      ) : (
        <div onClick={onClick}>{content}</div>
      )}
    </li>
  );
}
