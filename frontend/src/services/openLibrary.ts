const BASE_URL = "https://openlibrary.org";

export const searchBooks = async (query: string) => {
    try {
        const response = await fetch(`${BASE_URL}/search.json?q=${query}`);
        if (!response.ok) throw new Error("Erro ao buscar livros.");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};