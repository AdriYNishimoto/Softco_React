import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Cadastro from "./pages/Cadastro"
import EsqueciMinhaSenha from "./pages/EsqueciMinhaSenha"
import DashboardAdm from "./pages/ADM/DashboardAdm"
import TicketsAdm from "./pages/ADM/TicketsAdm"
import AnaliseAdm from "./pages/ADM/AnaliseAdm"
import ChatAdm from "./pages/ADM/ChatAdm"
import Dashboard from "./pages/User/Dashboard"
import Tickets from "./pages/User/Tickets"
import Contato from "./pages/User/Contato"
import Chat from "./pages/User/Chat"

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Home/> } ></Route>
                <Route path="/login" element={ <Login/> } ></Route>
                <Route path="/cadastro" element={ <Cadastro/> } ></Route>
                <Route path="/esqueci_minha_senha" element={ <EsqueciMinhaSenha/> } ></Route>
                <Route path="/dashboard_adm" element={ <DashboardAdm/> } ></Route>
                <Route path="/tickets_adm" element={ <TicketsAdm/> } ></Route>
                <Route path="/analise_adm" element={ <AnaliseAdm/> } ></Route>
                <Route path="/chat_adm" element={ <ChatAdm/> } ></Route>
                <Route path="/dashboard" element={ <Dashboard/> } ></Route>
                <Route path="/tickets" element={ <Tickets/> } ></Route>
                <Route path="/contato" element={ <Contato/> } ></Route>
                <Route path="/chat" element={ <Chat/> } ></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;
