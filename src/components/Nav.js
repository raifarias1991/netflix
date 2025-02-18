import React, { useEffect } from 'react'
// Import React and useEffect hook / Importar React e hook useEffect
import "./Nav.css"
// Import component-specific CSS styles / Importar estilos CSS específicos do componente

function Nav() {
    // Define functional component for navigation / Define componente funcional para navegação

    // State to track scroll position and change nav background / Estado para rastrear posição do scroll e mudar fundo da navegação
    const [show, setShow] = React.useState(false)
    // Initial state is false (transparent background) / Estado inicial é falso (fundo transparente)

    // Effect hook to add scroll event listener / Hook de efeito para adicionar ouvinte de evento de rolagem
    useEffect (() => {
        // Function to handle scroll event / Função para manipular evento de rolagem
        window.addEventListener("scroll", () => {
            // Change nav background to black when scrolled more than 100px / Mudar fundo da navegação para preto quando rolado mais de 100px
            setShow(window.scrollY > 100)
        })

        // Empty dependency array means this runs once on component mount / Array de dependência vazia significa que roda uma vez ao montar o componente
    }, [])

    // Render navigation component / Renderizar componente de navegação
    return (
        // Dynamic className based on scroll position / Nome de classe dinâmico baseado na posição do scroll
        <div className={`nav-container ${show ? "nav-container-black" : ""}`}>
            {/* Netflix logo image / Imagem do logo Netflix */}
            <img 
                className='nav-logo' 
                src='https://pngimg.com/uploads/netflix/netflix_PNG6.png' 
                alt='Netflix'
            />

            {/* User avatar image / Imagem do avatar do usuário */}
            <img 
                className='nav-avatar' 
                src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png' 
                alt='Raí Barcelos'
            />
        </div>
    );
}

export default Nav;
// Export component as default / Exportar componente como padrão