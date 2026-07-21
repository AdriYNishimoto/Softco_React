import { useState } from "react"
import { analisarChamado, temChaveConfigurada } from "../../../services/gemini"
import "./style.css"

function AnaliseAdm() {
    const [titulo, setTitulo] = useState("")
    const [descricao, setDescricao] = useState("")
    const [analise, setAnalise] = useState(null)
    const [carregando, setCarregando] = useState(false)
    const [erro, setErro] = useState("")

    async function handleSubmit(evento) {
        evento.preventDefault()
        setCarregando(true)
        setErro("")
        setAnalise(null)

        try {
            const resultado = await analisarChamado({ titulo, descricao })
            setAnalise(resultado)
        } catch (e) {
            setErro(e.message)
        } finally {
            setCarregando(false)
        }
    }

    function copiarResposta() {
        navigator.clipboard.writeText(analise.respostaSugerida)
    }

    return (
        <div className="analise">
            <header className="analise-header">
                <h1>Análise de chamados</h1>
                <p>
                    A IA lê o chamado, classifica a complexidade e já sugere uma resposta
                    para o atendente.
                </p>
            </header>

            {!temChaveConfigurada() && (
                <p className="analise-aviso">
                    Configure <code>VITE_GEMINI_API_KEY</code> no arquivo{" "}
                    <code>.env.local</code> para habilitar a análise.
                </p>
            )}

            <form className="analise-form" onSubmit={handleSubmit}>
                <label htmlFor="titulo">Título do chamado</label>
                <input
                    id="titulo"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    placeholder="Ex.: Não consigo acessar minha conta"
                    required
                />

                <label htmlFor="descricao">Descrição</label>
                <textarea
                    id="descricao"
                    rows={6}
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    placeholder="Cole aqui o relato do cliente"
                    required
                />

                <button type="submit" disabled={carregando}>
                    {carregando ? "Analisando..." : "Analisar com IA"}
                </button>
            </form>

            {erro && <p className="analise-erro">{erro}</p>}

            {analise && (
                <section className="analise-resultado">
                    <div className="analise-resultado-topo">
                        <span className={`analise-nivel nivel-${analise.nivel}`}>
                            Nível {analise.nivel}
                        </span>
                        <span className="analise-categoria">{analise.categoria}</span>
                    </div>

                    <p className="analise-justificativa">{analise.justificativa}</p>

                    <div className="analise-sugestao">
                        <div className="analise-sugestao-topo">
                            <h2>Resposta sugerida</h2>
                            <button type="button" onClick={copiarResposta}>
                                Copiar
                            </button>
                        </div>
                        <p>{analise.respostaSugerida}</p>
                    </div>
                </section>
            )}
        </div>
    )
}

export default AnaliseAdm
