import Link from "next/link";

export const MenuItem: React.FC<MenuItemProps> = (props: MenuItemProps) => {
  return (
    <li>
      <Link href={props.href}>
        
          <span className="icon"></span> {props.label}
        
      </Link>
    </li>
  );
};