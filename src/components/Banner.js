// Importações necessárias de bibliotecas e estilos
// Necessary imports of libraries and styles
import React, { useEffect, useState } from 'react';
import './Banner.css';
import categories, { getMovies } from '../api';

function Banner() {
    // Estado para armazenar o filme aleatório selecionado
    // State to store the randomly selected movie
    const [movie, setMovie] = useState(null);

    // Função assíncrona para buscar um filme aleatório da categoria "Netflix Originals"
    // Async function to fetch a random movie from "Netflix Originals" category
    const fetchRandomMovie = async () => {
        try {
            // Encontra a categoria de Netflix Originals
            // Find the Netflix Originals category
            const netflixOriginalsCategory = categories.find(
                (category) => category.name === 'netflixOriginals'
            );

            // Lança erro se a categoria não for encontrada
            // Throws error if category is not found
            if (!netflixOriginalsCategory) {
                throw new Error('Categoria "netflixOriginals" não encontrada.');
            }

            // Busca filmes da categoria usando a função da API
            // Fetch movies from the category using API function
            const data = await getMovies(netflixOriginalsCategory.path);
            const movies = data?.results;

            // Lança erro se nenhum filme for encontrado
            // Throws error if no movies are found
            if (!movies || movies.length === 0) {
                throw new Error('Nenhum filme encontrado na categoria.');
            }

            // Seleciona um filme aleatório da lista
            // Select a random movie from the list
            const randomIndex = Math.floor(Math.random() * movies.length);
            setMovie(movies[randomIndex]);
        } catch (error) {
            // Registra qualquer erro no console
            // Log any errors to console
            console.error('Erro ao buscar filme aleatório:', error);
        }
    };

    // Hook de efeito para buscar filme aleatório quando o componente monta
    // Effect hook to fetch random movie when component mounts
    useEffect(() => {
        fetchRandomMovie();
    }, []);

    // Função para truncar descrições longas
    // Function to truncate long descriptions
    const truncate = (str, n) => {
        // Retorna string truncada se for mais longa que o limite
        // Returns truncated string if longer than limit
        return str?.length > n ? `${str.substring(0, n)}...` : str;
    };

    return (
        // Container do banner com imagem de fundo dinâmica
        // Banner container with dynamic background image
        <header
            className='banner-container'
            style={{
                // Configurações de estilo para imagem de fundo
                // Background image style settings
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                // Define imagem de fundo do filme ou nenhuma
                // Sets movie background image or none
                backgroundImage: movie?.backdrop_path
                    ? `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`
                    : 'none',
            }}
        >
            {/* Conteúdo do banner */}
            {/* Banner content */}
            <div className='banner-content'>
                {/* Título do filme */}
                {/* Movie title */}
                <h1 className='banner-title'>
                    {/* Usa diferentes propriedades de título, com fallback */}
                    {/* Uses different title properties, with fallback */}
                    {movie?.title || movie?.name || movie?.original_name || 'Filme Desconhecido'}
                </h1>

                {/* Container de botões de ação */}
                {/* Action buttons container */}
                <div className='banner-button-container'>
                    <button className='banner-button play'>Assistir</button>
                    <button className='banner-button list'>Minha lista</button>
                </div>

                {/* Descrição do filme */}
                {/* Movie description */}
                <div className='banner-description'>
                    {/* Descrição truncada para 120 caracteres */}
                    {/* Description truncated to 120 characters */}
                    <p>{truncate(movie?.overview, 120)}</p>
                </div>
            </div>
        </header>
    );
}

export default Banner;