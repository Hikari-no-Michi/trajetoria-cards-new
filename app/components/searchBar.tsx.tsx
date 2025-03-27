// SearchBar.tsx
import React, { ChangeEvent } from 'react';

// Definindo a interface para as props
interface SearchBarProps {
  placeholder: string;
  setPesquisa: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, setPesquisa }) => {
  // Função para lidar com a mudança de texto na barra de pesquisa
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPesquisa(e.target.value);
  };

  return (
    <div className="w-full max-w-lg mt-4 px-2 sm:px-0">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full p-2 border border-sky-400 rounded-md"
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
