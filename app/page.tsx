"use client"
import React, { useEffect, useState } from 'react';
import Header from './components/header';
import Flashcard from './components/flashCard';
import ModalDisciplinas from './components/modalDisciplinas';
import SearchBar from './components/searchBar.tsx';

type Disciplina = {
  nome: string;
  arquivo: string;
};

type ConteudoDisciplina = {
  pergunta: string;
  resposta: string;
};

const frasesMotivacionais = [
  'A vitória começa com o primeiro passo!',
  'O esforço de hoje é a conquista de amanhã.',
  'Você é mais forte do que imagina.',
  'O sucesso é a soma de pequenos esforços.',
  'O caminho é difícil, mas a vitória é doce.',
  'O único limite é o que você acredita ser.',
  'Transforme seus sonhos em planos.',
  'O trabalho duro traz resultados.',
  'Se você pode sonhar, você pode alcançar.',
  'Acredite em si mesmo e todo o resto virá.',
  'Nunca desista, o começo é sempre o mais difícil.',
  'A jornada é longa, mas cada passo vale a pena.',
  'O fracasso é apenas o começo do sucesso.',
  'Se você não tentar, nunca saberá do que é capaz.',
  'O futuro pertence àqueles que acreditam em seus sonhos.',
  'Sua única competição é você mesmo.',
  'Nada vem fácil, mas tudo vale a pena.',
  'A persistência transforma fracasso em sucesso.',
  'Hoje é o dia perfeito para começar.',
  'Acredite no seu potencial e vá além!',
];

const disciplinas: Disciplina[] = [
  { nome: 'Direito Constitucional', arquivo: 'constitucional.json' },
  { nome: 'Direito Administrativo', arquivo: 'administrativo.json' },
  { nome: 'Direito Penal', arquivo: 'penal.json' },
  { nome: 'Direito Processual Penal', arquivo: 'processual_penal.json' },
];

export default function FlashcardApp() {
  const [showDisciplinas, setShowDisciplinas] = useState(false);
  const [mensagem, setMensagem] = useState<string>('');
  const [selectedDisciplina, setSelectedDisciplina] = useState<Disciplina | null>(null);
  const [listaDeCards, setListaDeCards] = useState<ConteudoDisciplina[]>([]);
  const [cardAtual, setCardAtual] = useState<ConteudoDisciplina | null>(null);
  const [cardAtualNumber, setCardAtualNumber] = useState<number>(1);
  const [mostrarPergunta, setMostrarPergunta] = useState(true);
  const [pesquisa, setPesquisa] = useState<string>('');

  useEffect(() => {
    // Verifique se o código está sendo executado no lado do cliente
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedMensagem = localStorage.getItem('mensagem');
      if (storedMensagem) {
        setMensagem(storedMensagem);
      } else {
        const randomMessage = frasesMotivacionais[Math.floor(Math.random() * frasesMotivacionais.length)];
        localStorage.setItem('mensagem', randomMessage);
        setMensagem(randomMessage);
      }
    }
  }, []);

  const fetchConteudoDisciplina = async (arquivo: string) => {
    try {
      const response = await fetch(`/${arquivo}`);
      const data: ConteudoDisciplina[] = await response.json();
      setListaDeCards(data);
      if (data.length > 0) {
        setCardAtual(data[Math.floor(Math.random() * data.length)]);
      }
    } catch (error) {
      console.error('Erro ao carregar o conteúdo da disciplina:', error);
    }
  };

  const handleSelectDisciplina = (disciplina: Disciplina) => {
    setSelectedDisciplina(disciplina);
    fetchConteudoDisciplina(disciplina.arquivo);
  };

  const selecionarProximoCard = () => {
    setMostrarPergunta(false);
    const proximoIndex = cardAtualNumber % listaDeCards.length;
    setCardAtual(listaDeCards[proximoIndex]);
    setCardAtualNumber(cardAtualNumber + 1);
    setMostrarPergunta(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const randomMessage = frasesMotivacionais[Math.floor(Math.random() * frasesMotivacionais.length)];
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('mensagem', randomMessage);
        setMensagem(randomMessage);
      }
    }, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-full bg-sky-100 flex flex-col items-center">
      <Header
        titulo={selectedDisciplina ? selectedDisciplina.nome : "Trajetória Concursos Cards"}
        setShowDisciplinas={setShowDisciplinas}
      />
      {showDisciplinas && (
        <ModalDisciplinas
          disciplinas={disciplinas}
          selectedDisciplina={selectedDisciplina}
          handleSelectDisciplina={handleSelectDisciplina}
          setShowDisciplinas={setShowDisciplinas}
          mostrarPergunta={mostrarPergunta}
          setMostrarPergunta={setMostrarPergunta}
        />
      )}

      <SearchBar placeholder="Pesquisar card" setPesquisa={setPesquisa} />
      <Flashcard
        conteudoDisciplina={cardAtual}
        mensagem={mensagem}
        showDisciplinas={showDisciplinas}
        setShowDisciplinas={setShowDisciplinas}
        mostrarPergunta={mostrarPergunta}
        setMostrarPergunta={setMostrarPergunta}
        setListaDeCards={setListaDeCards}
        setCardAtual={setCardAtual} 
        selecionarProximoCard={selecionarProximoCard}
      />
    </div>
  );
}
