import { Link } from "react-router";
import NotFoundImage from "@/assets/404.svg";

export function NotFound() {
  return (
    <div className="flex justify-center">
      <div className="w-[580px] bg-white rounded-xl px-12 py-16">
        <div className="flex justify-center mb-6">
          <img src={NotFoundImage} alt="404" className="h-21" />
        </div>
        <h2 className="text-bold text-xl text-gray-600 text-center mb-6">
          Link não encontrado
        </h2>
        <p className="text-gray-500 text-center">
          O link que você está tentando acessar não existe, foi removido ou é
          uma URL inválida. Saiba mais em{" "}
          <Link to="/" className="text-primary">
            brev.ly
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
