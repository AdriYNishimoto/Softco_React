import { Link } from "react-router-dom"

const rotas = [
    { caminho: "/login", nome: "Login" },
    { caminho: "/cadastro", nome: "Cadastro" },
    { caminho: "/dashboard", nome: "Área do usuário" },
    { caminho: "/dashboard_adm", nome: "Área administrativa" },
    { caminho: "/analise_adm", nome: "Análise de chamados com IA" },
]

function Home() {
    return (
        <main style={{ maxWidth: 640, margin: "0 auto", padding: "48px 24px", fontFamily: "system-ui, sans-serif" }}>
            <h1 style={{ marginBottom: 4 }}>SoftCo</h1>
            <p style={{ color: "#6b7280", marginTop: 0 }}>
                Plataforma de suporte técnico com triagem de chamados por IA.
            </p>

            <nav style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 32 }}>
                {rotas.map((rota) => (
                    <Link key={rota.caminho} to={rota.caminho}>
                        {rota.nome}
                    </Link>
                ))}
            </nav>
        </main>
    )
}

export default Home
