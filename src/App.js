import './App.css'; 
// Import global application styles / Importar estilos globais da aplicação

import Row from './components/Row'; 
// Import Row component for displaying movie categories / Importar componente Row para exibir categorias de filmes

import categories from './api'; 
// Import predefined movie categories from API configuration / Importar categorias de filmes da configuração de API

import Banner from './components/Banner'; 
// Import Banner component for main featured content / Importar componente Banner para conteúdo principal em destaque

import Nav from './components/Nav'; 
// Import Navigation component / Importar componente de Navegação

function App() {
  // Main application component / Componente principal da aplicação
  return (
    // Main application container / Contêiner principal da aplicação
    <div className="App">
      {/* Navigation component / Componente de Navegação */}
      <Nav />

      {/* Banner component for featured content / Componente Banner para conteúdo em destaque */}
      <Banner/>

      {/* Dynamically render movie rows based on categories / Renderizar linhas de filmes dinamicamente baseadas em categorias */}
      {categories.map((category) => {
        return (
          // Row component for each movie category / Componente Row para cada categoria de filmes
          <Row 
            key={category.name} // Unique key for React list rendering / Chave única para renderização de lista do React
            title={category.title} // Category title to display / Título da categoria para exibição
            path={category.path} // API path for fetching movies / Caminho da API para buscar filmes
            isLarge={category.isLarge} // Flag to determine poster size / Sinalizador para determinar tamanho do pôster
          />
        );
      })}
    </div>
  );
}

// Export App component as default / Exportar componente App como padrão
export default App;