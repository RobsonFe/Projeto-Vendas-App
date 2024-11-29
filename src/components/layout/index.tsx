import { LayoutProps } from "app/interfaces/layout.interface";
import { Sidebar } from "./sidebar";

export const Layout: React.FC<LayoutProps> = (props: LayoutProps) =>{

    return(
        <div className="app">
            <section className="main-content columns is-fullheight">
                <Sidebar />
                <div className="container column is-10">
                    <div className="section">
                        <div className="card">
                        <div className="card-header">
                        <p className="card-header-title">
                        {props.titulo}
                        </p>
                        </div>
                        <div className="card-content">
                        <div className="conteudo">
                            {props.children}
                        </div>
                        </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

