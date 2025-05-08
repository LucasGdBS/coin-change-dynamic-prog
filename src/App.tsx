import CoinForm from "./components/CoinForm";

export default function App() {
  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-30">
      <h1 className="text-2xl font-semibold text-neutral-800">
        Troco de Moedas
      </h1>
      <CoinForm />
    </div>
  );
}
