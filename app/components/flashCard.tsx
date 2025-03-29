import React, { useState } from 'react';
import { motion } from 'framer-motion';

type ConteudoDisciplina = {
  pergunta: string;
  resposta: string;
};

interface FlashcardProps {
  conteudoDisciplina: ConteudoDisciplina | null;
  mensagem: string;
  showDisciplinas: boolean;
  setShowDisciplinas: React.Dispatch<React.SetStateAction<boolean>>;
  mostrarPergunta: boolean;
  setMostrarPergunta: React.Dispatch<React.SetStateAction<boolean>>;
  setCardAtual: React.Dispatch<React.SetStateAction<ConteudoDisciplina | null>>;
  setListaDeCards: React.Dispatch<React.SetStateAction<ConteudoDisciplina[]>>; // Adicione esta linha
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
  const [animacao, setAnimacao] = useState(0);

  const handleResposta = (direcao: number) => {
    setAnimacao(direcao);
    setTimeout(() => {
      setAnimacao(0);
      selecionarProximoCard();
    }, 300);
  };

  return (
    <div className="w-full max-w-lg mt-4 px-2 sm:px-0">
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: animacao * 300, opacity: animacao ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        onClick={() => setMostrarPergunta(!mostrarPergunta)}
        className="bg-white p-2 rounded-lg shadow-md text-center h-[55vh]"
      >
        {conteudoDisciplina ? (
          <>
            {!mostrarPergunta ? (
              <h2 className="text-2xl font-bold text-[#0288d1] text-center mb-4 flex items-center justify-center h-full px-8">
                {conteudoDisciplina.pergunta}
              </h2>
            ) : (
              <p className="text-lg text-center text-gray-700 flex items-center justify-center h-full px-4 overflow-y-auto">
                {conteudoDisciplina.resposta}
              </p>
            )}
          </>
        ) : (
          <div className="flex flex-col justify-center items-center h-full">
            <h2 className="text-2xl font-bold text-[#0288d1] text-center md:text-3xl px-5 py-5">
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
          </div>
        )}
      </motion.div>

      {conteudoDisciplina && (
        <div className="flex justify-center space-x-4 mt-4">
          <div
            className="w-[200px] text-center bg-red-400 p-2 text-slate-50 select-none cursor-pointer focus:outline-none transition transform duration-200 hover:scale-105 active:scale-95 px-5"
            onClick={(e) => {
              e.stopPropagation();
              handleResposta(-1);
            }}
          >
            Não Acertei 😞
          </div>
          <div
            className="w-[200px] text-center bg-green-400 p-2 text-slate-800 select-none cursor-pointer focus:outline-none transition transform duration-200 hover:scale-105 active:scale-95"
            onClick={(e) => {
              e.stopPropagation();
              handleResposta(1);
            }}
          >
            Acertei 😎
          </div>
        </div>
      )}
    </div>
  );
};

export default Flashcard;
