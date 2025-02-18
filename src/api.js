const API_KEY = "8d89145f5018031fd94adb99834e04c8"

// Base URL for The Movie Database API
// URL base para a API do The Movie Database
const BASE_URL = 'https://api.themoviedb.org/3'

// Movie Categories Definition
// Definição das Categorias de Filmes
const categories = [
    {
        name: "trending", // Internal identifier for trending category
        title: "Em alta", // Display title in Portuguese
        path: `/trending/all/week?language=pt-BR`, // API endpoint for trending content
        isLarge: true, // Flag to determine if category should use large poster view
    },
    {
        name: "netflixOriginals", // Internal identifier for Netflix Originals
        title: "Originais Netflix", // Display title in Portuguese
        path: `/discover/tv?with_networks=213`, // API endpoint for Netflix original series
        isLarge: false, // Use standard poster view
    },
    {
        name: "topRated", // Internal identifier for top-rated movies
        title: "Populares", // Display title in Portuguese
        path: `/movie/top_rated?language=pt-BR`, // API endpoint for top-rated movies
        isLarge: false, // Use standard poster view
    },
    {
        name: "comedy", // Internal identifier for comedy category
        title: "Comédias", // Display title in Portuguese
        path: `/discover/movie?with_genres=35`, // API endpoint for comedy movies
        isLarge: false, // Use standard poster view
    },
    {
        name: "romances", // Internal identifier for romance category
        title: "Romances", // Display title in Portuguese
        path: `/discover/movie?with_genres=10749`, // API endpoint for romance movies
        isLarge: false, // Use standard poster view
    },
    {
        name: "documentarios", // Internal identifier for documentary category
        title: "Documentários", // Display title in Portuguese
        path: `/discover/movie?with_genres=99`, // API endpoint for documentary movies
        isLarge: false, // Use standard poster view
    }
];

// Function to fetch movies from API
// Função para buscar filmes da API
export const getMovies = async (path) => {
    try {
        // Construct full URL with API key
        // Construir URL completa com chave de API
        const url = `${BASE_URL}${path}&api_key=${API_KEY}`
        
        // Fetch data from API
        // Buscar dados da API
        const response = await fetch(url);

        // Check if response is successful
        // Verificar se a resposta é bem-sucedida
        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        // Parse JSON response
        // Analisar resposta JSON
        const data = await response.json()
        
        // Return movie data to calling component
        // Retornar dados de filmes para o componente que chama
        return data 
    } catch (error) {
        // Log and handle any errors during fetch
        // Registrar e tratar quaisquer erros durante a busca
        console.error("Erro ao buscar filmes: ", error.message)
        
        // Return null if fetch fails
        // Retornar null em caso de falha
        return null; 
    }
};

// Function to return movie categories
// Função para retornar categorias de filmes
export const getCategories = () => {
    return categories
};

// Export categories as default
// Exportar categorias como padrão
export default categories