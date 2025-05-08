import { useState, useEffect } from "react";
import coinChange from "../utils/coinChange";

interface CoinResult {
  [key: number]: number;
}

export default function CoinForm() {
  const [value, setValue] = useState<number>(123456);
  const [coinsInput, setCoinsInput] = useState<string>("5, 10, 25, 50, 100");
  const [coinList, setCoinList] = useState<number[]>([]);
  const [result, setResult] = useState<CoinResult>({});
  const [valueError, setValueError] = useState<string>("");
  const [coinsError, setCoinsError] = useState<string>("");

  useEffect(() => {
    if (typeof coinsInput === "string") {
      const parsed = coinsInput
        .split(",")
        .map((c) => parseFloat(c.trim()))
        .filter((n) => !isNaN(n));
      setCoinList(parsed);
    }
  }, [coinsInput]);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Validação
    let isValid = true;

    if (value < 1) {
      setValueError("Use um valor maior que 1");
      isValid = false;
    } else {
      setValueError("");
    }

    if (coinList.length === 0) {
      setCoinsError("Informe ao menos uma moeda válida");
      isValid = false;
    } else {
      setCoinsError("");
    }

    if (isValid) {
      setResult(coinChange(coinList, value));
    }
  };

  return (
    <div className="p-4 flex flex-col justify-center items-center">
      <div className="grid grid-cols-5 gap-2 w-full max-w-6xl">
        {/* Coluna 1 - Valor */}
        <div className="flex flex-col">
          <label htmlFor="value" className="text-sm font-medium mb-2">
            Valor de troco
          </label>
          <input
            id="value"
            type="number"
            className="border border-black rounded-xl p-2 h-10"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
          />
          <div className="h-6 mt-1">
            {valueError && (
              <span className="text-red-500 text-sm">{valueError}</span>
            )}
          </div>
        </div>

        {/* Símbolo : entre o primeiro e o segundo input */}
        <div className="flex items-start justify-center pt-10">
          <span className="text-3xl font-bold">:</span>
        </div>

        {/* Coluna 2 - Moedas */}
        <div className="flex flex-col">
          <label htmlFor="coins" className="text-sm font-medium mb-2">
            Moedas (separadas por vírgula)
          </label>

          <input
            id="coins"
            type="text"
            className="border border-black rounded-xl p-2 h-10"
            value={coinsInput}
            onChange={(e) => setCoinsInput(e.target.value)}
          />

          <div className="h-6 mt-1">
            {coinsError && (
              <span className="text-red-500 text-sm">{coinsError}</span>
            )}
          </div>

          {/* Visualização das moedas abaixo do input */}
          <div className="flex flex-wrap gap-2 mt-2">
            {coinList.map((coin, i) => (
              <span
                key={i}
                className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                <CoinIcon />
                {coin}
              </span>
            ))}
          </div>
        </div>

        {/* Símbolo de seta entre o segundo e o terceiro input */}
        <div className="flex items-start justify-center pt-10">
          <ArrowIcon />
        </div>

        {/* Coluna 3 - Resultado */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-2">Resultado</label>

          <div className="h-10 border border-gray-200 rounded-xl p-2 flex items-center bg-gray-50">
            {Object.keys(result).length === 0 ? (
              <span className="text-gray-500 text-sm">
                Nenhum resultado ainda
              </span>
            ) : "Infinity" in result ? (
              <span className="text-red-500 text-sm">
                Não foi possível encontrar um troco com as moedas disponíveis
              </span>
            ) : (
              <span className="text-gray-700">
                Mínimo de moedas:{" "}
                {Object.values(result).reduce((acc, qtd) => acc + qtd, 0)}
              </span>
            )}
          </div>

          <div className="h-6 mt-1"></div>

          {Object.keys(result).length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {Object.entries(result).map(([coin, count]) => (
                <span
                  key={coin}
                  className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                >
                  <CoinIcon />
                  {coin} x {count}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={handleSubmit}
          className="bg-neutral-800 text-white px-6 py-2 rounded-md hover:bg-neutral-700 cursor-pointer"
        >
          Calcular troco
        </button>
      </div>
    </div>
  );
}

const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14"></path>
    <path d="m13 6 6 6-6 6"></path>
  </svg>
);

const CoinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v12" />
    <path d="M8 12h8" />
  </svg>
);
