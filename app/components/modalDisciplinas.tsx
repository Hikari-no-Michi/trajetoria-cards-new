import React from 'react';

interface Disciplina {
  nome: string;
  arquivo: string;  // Adicionando a propriedade 'arquivo'
}

interface ModalDisciplinasProps {
  disciplinas: Disciplina[];
  selectedDisciplina: Disciplina | null;
  handleSelectDisciplina: (disciplina: Disciplina) => void;
  setShowDisciplinas: React.Dispatch<React.SetStateAction<boolean>>;
  mostrarPergunta: boolean;
  setMostrarPergunta: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalDisciplinas: React.FC<ModalDisciplinasProps> = ({
  disciplinas,
  selectedDisciplina,
  handleSelectDisciplina,
  setShowDisciplinas,
  mostrarPergunta,
  setMostrarPergunta
}) => {
  // Função chamada quando uma disciplina é selecionada
  const handleDisciplinaClick = (disciplina: Disciplina) => {
    handleSelectDisciplina(disciplina);
    setMostrarPergunta(false); 
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white w-[400px] max-w-full rounded-lg p-6 shadow-xl h-[80%] mx-2 flex flex-col">
        <h2 className="text-2xl font-bold text-center text-[#0288d1] mb-4">
          Selecione uma disciplina
        </h2>
        <div className="flex-grow overflow-y-auto max-h-[400px]">
          {disciplinas.map((disciplina) => (
            <button
              key={disciplina.nome}
              onClick={() => handleDisciplinaClick(disciplina)}
              className={`w-full text-left px-4 py-3 mb-2 rounded-md ${
                selectedDisciplina?.nome === disciplina.nome
                  ? 'bg-pink-500 text-white'
                  : 'bg-[#e0f7fa] text-[#0288d1] hover:bg-[#0288d1] hover:text-white'
              }`}
            >
              {disciplina.nome}
            </button>
          ))}
        </div>
        <button
          className="w-full mt-4 bg-[#0288d1] text-white py-2 rounded-full"
          onClick={() => setShowDisciplinas(false)}
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default ModalDisciplinas;
