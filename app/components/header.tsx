import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar, faBook, faClipboardList } from "@fortawesome/free-solid-svg-icons";

type HeaderProps = {
  titulo: string;
  setShowDisciplinas: (value: boolean) => void;
};

const Header: React.FC<HeaderProps> = ({ titulo, setShowDisciplinas }) => {
  return (
    <header className="w-full bg-sky-600 text-white p-4 shadow-md flex flex-col items-center">
      <h1 className="text-base font-semibold">{titulo}</h1>
      <div className="w-full flex justify-between mt-2 max-w-lg">
        <button className="flex-1 bg-sky-500 p-2 mx-0.5 rounded-md flex flex-col items-center justify-center text-sm">
          <FontAwesomeIcon icon={faChartBar} className="w-6 h-6 mb-1" />
          <span>Estatísticas</span>
        </button>
        <button
          onClick={() => setShowDisciplinas(true)}
          className="flex-1 bg-sky-500 p-2 mx-0.5 rounded-md flex flex-col items-center justify-center text-sm"
        >
          <FontAwesomeIcon icon={faBook} className="w-6 h-6 mb-1" />
          <span>Disciplina</span>
        </button>
        <button className="flex-1 bg-sky-500 p-2 mx-0.5 rounded-md flex flex-col items-center justify-center text-sm">
          <FontAwesomeIcon icon={faClipboardList} className="w-6 h-6 mb-1" />
          <span>Revisão</span>
        </button>
      </div>
    </header>
  );
};

export default Header;