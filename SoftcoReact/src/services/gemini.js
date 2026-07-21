/*
 * Integração com o Google Gemini para triagem de chamados.
 *
 * ATENÇÃO: como o Vite injeta as variáveis VITE_* no bundle, a chave fica
 * visível para quem abrir o DevTools. Isso é aceitável em ambiente acadêmico
 * e de demonstração, mas em produção esta chamada precisa sair do navegador e
 * ir para um back-end (ou uma serverless function) que guarde a chave.
 * Toda a comunicação com a API está isolada neste arquivo justamente para que
 * essa mudança seja trivial: basta trocar a URL do fetch pelo seu endpoint.
 */

const BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models";
const MODEL = import.meta.env.VITE_GEMINI_MODEL || "gemini-2.0-flash";
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const INSTRUCOES = `Você é o triador de chamados do suporte técnico da SoftCo.

Classifique o chamado em um destes níveis:
- Nível 1: dúvidas de uso, procedimentos padrão, redefinição de senha, cadastro,
  primeiro acesso e qualquer coisa que o próprio atendente resolve pelo roteiro.
- Nível 2: erros do sistema, falhas de integração, perda de dados, lentidão,
  comportamento inesperado — casos que exigem investigação técnica.

Responda SOMENTE com um JSON neste formato, sem markdown:
{
  "nivel": 1 ou 2,
  "categoria": "categoria curta do problema",
  "justificativa": "uma frase explicando a classificação",
  "respostaSugerida": "resposta pronta para enviar ao cliente, cordial e objetiva"
}`;

export function temChaveConfigurada() {
    return Boolean(API_KEY);
}

export async function analisarChamado({ titulo, descricao }) {
    if (!API_KEY) {
        throw new Error(
            "Chave da API não configurada. Copie .env.example para .env.local e preencha VITE_GEMINI_API_KEY."
        );
    }

    const prompt = `${INSTRUCOES}

Título do chamado: ${titulo}
Descrição: ${descricao}`;

    const resposta = await fetch(`${BASE_URL}/${MODEL}:generateContent?key=${API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
                temperature: 0.2,
                responseMimeType: "application/json",
            },
        }),
    });

    if (!resposta.ok) {
        const erro = await resposta.json().catch(() => null);
        throw new Error(erro?.error?.message || `A API respondeu ${resposta.status}.`);
    }

    const dados = await resposta.json();
    const texto = dados?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!texto) {
        throw new Error("A API não retornou nenhuma análise.");
    }

    try {
        return JSON.parse(texto);
    } catch {
        throw new Error("Não foi possível interpretar a resposta da IA.");
    }
}
