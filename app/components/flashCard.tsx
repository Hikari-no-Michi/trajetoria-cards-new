import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
type ConteudoDisciplina = {
  pergunta: string;
  resposta: string;
};
interface FlashcardProps {
  conteudoDisciplina: {
    pergunta: string;
    resposta: string;
  } | null;
  mensagem: string;
  showDisciplinas: boolean;
  setShowDisciplinas: React.Dispatch<React.SetStateAction<boolean>>;
  mostrarPergunta: boolean;
  setMostrarPergunta: React.Dispatch<React.SetStateAction<boolean>>;
  setCardAtual: React.Dispatch<React.SetStateAction<ConteudoDisciplina | null>>;
  setListaDeCards: React.Dispatch<React.SetStateAction<ConteudoDisciplina[]>>;
  selecionarProximoCard: () => void;
}

const Flashcard: React.FC<FlashcardProps> = ({
  conteudoDisciplina,
  mensagem,
  showDisciplinas,
  setShowDisciplinas,
  mostrarPergunta,
  setMostrarPergunta,
  selecionarProximoCard,
}) => {
  return (
    <div className="w-full max-w-lg mt-4 px-2 sm:px-0">
      <div
        onClick={() => setMostrarPergunta(!mostrarPergunta)}
        className="bg-white p-2 rounded-lg shadow-md text-center sm:h-[300px] h-[150%]"
      >
        {conteudoDisciplina ? (
          <>
            {mostrarPergunta === false ? (
              <h2 className="text-2xl font-bold text-[#0288d1] text-center mb-4 transition-opacity duration-500 opacity-100 flex items-center justify-center h-full">
                {conteudoDisciplina.pergunta}
              </h2>
            ) : (
              <p className="text-lg text-center text-gray-700 transition-opacity duration-500 opacity-100 flex items-center justify-center h-full px-4">
                {conteudoDisciplina.resposta}
              </p>
            )}

            <div className="flex justify-center space-x-4 mt-4">
              <div className="w-auto text-center">
                <button className="text-red-500" 
                onClick={(e) => {
                  e.stopPropagation();
                  selecionarProximoCard();
                }}
                >
                  <FontAwesomeIcon icon={faTimesCircle} size="3x" />
                </button>
              </div>
              <div className="w-auto text-center">
                <button className="text-green-500"
                onClick={(e) => {
                  e.stopPropagation(); 
                  selecionarProximoCard();
                }}
                
                >
                  <FontAwesomeIcon icon={faCheckCircle} size="3x" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-[#0288d1] text-center mb-2 py-6 px-2 md:text-3xl md:px-3 lg:text-3xl lg:px-5 mt-3 lg:mt-9">
              {mensagem}
            </h2>
            {!showDisciplinas && (
              <button
                className="bg-[#0288d1] text-white px-8 py-3 rounded-full shadow-lg border-2 border-[#0288d1] hover:bg-[#01579b] focus:outline-none"
                onClick={() => setShowDisciplinas(true)}
              >
                Vamos Começar ?
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Flashcard;
