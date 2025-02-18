// Importações necessárias / Necessary imports
import React, { useEffect, useState } from 'react';
// Importa funções de busca de filmes e categorias da API / Imports movie and category fetching functions from API
import { getMovies, getCategories } from '../api';
// Importa componente para reprodução de vídeos / Imports video player component
import ReactPlayer from 'react-player';
// Importa estilos do componente / Imports component styles
import './Row.css';

function Row({ title, path, isLarge, isCategoryRow = false }) {
    // Estado para armazenar lista de filmes / State to store movie list
    const [movies, setMovies] = useState([]);
    
    // Estado para armazenar lista de categorias / State to store category list
    const [categories, setCategories] = useState([]);
    
    // Estado para controlar o trailer em reprodução / State to control playing trailer
    const [playingTrailer, setPlayingTrailer] = useState(null);
    
    // Estado para controlar carregamento / State to control loading
    const [isLoading, setIsLoading] = useState(true);

    // Função assíncrona para buscar trailer de um filme / Async function to fetch movie trailer
    const getTrailer = async (movieId) => {
        try {
            // Faz requisição à API do TMDb para buscar vídeos do filme / Requests movie videos from TMDb API
            const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=8d89145f5018031fd94adb99834e04c8`);
            
            // Converte resposta para JSON / Converts response to JSON
            const data = await response.json();
            
            // Encontra o primeiro trailer na lista de vídeos / Finds first trailer in video list
            const trailer = data?.results?.find(video => video.type === "Trailer");

            if (trailer) {
                // Se encontrar trailer, loga e retorna a chave / If trailer found, logs and returns key
                console.log('Trailer encontrado:', trailer.key);
                return trailer.key;
            } else {
                // Se não encontrar trailer, loga e retorna null / If no trailer found, logs and returns null
                console.log('Nenhum trailer encontrado');
                return null;
            }
        } catch (error) {
            // Trata erros na busca de trailer / Handles trailer fetching errors
            console.error("Erro ao buscar trailer:", error);
            return null;
        }
    };

    // Função para buscar filmes de acordo com o caminho / Function to fetch movies based on path
    const fetchMovies = async (_path) => {
        // Inicia estado de carregamento / Starts loading state
        setIsLoading(true);
        try {
            // Busca filmes usando função importada / Fetches movies using imported function
            const data = await getMovies(_path);
            // Atualiza estado de filmes / Updates movies state
            setMovies(data?.results);
        } catch (error) {
            // Loga erros de busca de filmes / Logs movie fetching errors
            console.error("Error fetching movies:", error);
        } finally {
            // Finaliza estado de carregamento / Ends loading state
            setIsLoading(false);
        }
    };

    // Função para buscar categorias / Function to fetch categories
    const fetchCategories = async () => {
        // Inicia estado de carregamento / Starts loading state
        setIsLoading(true);
        try {
            // Busca categorias usando função importada / Fetches categories using imported function
            const data = await getCategories();
            // Atualiza estado de categorias / Updates categories state
            setCategories(data?.categories);
        } catch (error) {
            // Loga erros de busca de categorias / Logs category fetching errors
            console.error("Error fetching categories:", error);
        } finally {
            // Finaliza estado de carregamento / Ends loading state
            setIsLoading(false);
        }
    };

    // Efeito para buscar filmes ou categorias / Effect to fetch movies or categories
    useEffect(() => {
        if (isCategoryRow) {
            // Se for linha de categorias, busca categorias / If category row, fetch categories
            fetchCategories();
        } else {
            // Senão, busca filmes / Otherwise, fetch movies
            fetchMovies(path);
        }
    }, [path, isCategoryRow]);

    // Função chamada ao clicar em filme ou categoria / Function called when clicking movie or category
    const handleOnClick = async (item) => {
        try {
            // Busca trailer do item clicado / Fetches trailer of clicked item
            const trailerKey = await getTrailer(item.id);
            
            // Loga chave do trailer / Logs trailer key
            console.log('Trailer Key:', trailerKey);
            
            if (trailerKey) {
                // Se trailer existe, atualiza estado com URL completo / If trailer exists, update state with full URL
                setPlayingTrailer(`https://www.youtube.com/watch?v=${trailerKey}`);
            }
        } catch (error) {
            // Loga erros ao obter trailer / Logs trailer fetching errors
            console.error("Erro ao obter trailer:", error);
        }
    };

    return (
        <div className="row-container">
            {/* Título da linha / Row title */}
            <h2 className="row-header">{title}</h2>

            {/* Renderização condicional: categorias ou filmes / Conditional rendering: categories or movies */}
            {isCategoryRow ? (
                // Renderização de categorias / Category rendering
                <div className="category-bar">
                    {categories.length > 0 ? (
                        // Mapeia e renderiza categorias / Maps and renders categories
                        categories.map((category) => (
                            <div
                                className={`category-card ${category.isTrending ? "category-card-trending" : ""}`}
                                key={category.id}
                            >
                                <img
                                    className="category-image"
                                    src={`https://image.tmdb.org/t/p/w500${category.backdrop_path || category.poster_path}`}
                                    alt={category.name}
                                    onClick={() => handleOnClick(category)} // Manipulador de clique / Click handler
                                />
                                <span className="category-name">{category.name}</span>
                            </div>
                        ))
                    ) : (
                        // Mensagem de carregamento / Loading message
                        <p>Carregando categorias...</p>
                    )}
                </div>
            ) : (
                // Renderização de filmes / Movie rendering
                <div className="row-cards">
                    {isLoading ? (
                        // Mensagem de carregamento / Loading message
                        <p>Carregando filmes...</p>
                    ) : (
                        // Mapeia e renderiza filmes / Maps and renders movies
                        movies.map((movie) => (
                            <div className={`movie-card ${isLarge && "movie-card-large"}`} key={movie.id}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                    alt={movie.title || movie.name}
                                    onClick={() => handleOnClick(movie)} // Manipulador de clique / Click handler
                                />
                                {/* Botão para assistir na Netflix (se disponível) / Netflix watch button (if available) */}
                                {movie.netflixUrl && (
                                    <a href={movie.netflixUrl} target="_blank" rel="noopener noreferrer">
                                        <button className="netflix-button">Assistir na Netflix</button>
                                    </a>
                                )}
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* Reprodutor de trailer (se trailer estiver em reprodução) / Trailer player (if trailer is playing) */}
            {playingTrailer && (
                <div className="player-wrapper">
                    {/* Botão para fechar trailer / Close trailer button */}
                    <button onClick={() => setPlayingTrailer(null)}>Fechar</button>
                    <ReactPlayer
                        url={playingTrailer} // URL completa do trailer / Full trailer URL
                        playing={true}
                        controls={true}
                        width="100%"
                        height="100%"
                    />
                </div>
            )}
        </div>
    );
}

export default Row;