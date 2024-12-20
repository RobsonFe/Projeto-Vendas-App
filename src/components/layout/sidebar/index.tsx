import { MenuItem } from "../menu";

export const Sidebar: React.FC = () => {

  return (
    <aside className="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile">
      <p className="menu-label is-hidden-touch">
        Minhas Vendas
      </p>
      <ul className="menu-list">
        <MenuItem href="/" label="Home" />
        <MenuItem href="/cadastros/produtos" label="Produtos" />
        <MenuItem href="/consultas/produtos" label="Tabela" />
        <MenuItem href="/" label="Sair" />
      </ul>
    </aside>
  );
};




