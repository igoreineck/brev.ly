import { useState } from "react";

type Props = {
  className?: string;
};

// @TODO: adicionar mensagem de validação dos inputs
export function BrevlyNewLink(_props: Props) {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");

  return (
    <div className="col-span-1 bg-white p-10">
      <h2 className="text-lg text-gray-600">Novo link</h2>
      <form>
        <div>
          <label
            htmlFor="originalUrl"
            className="block text-sm/6 font-medium text-gray-500"
          >
            Link original
          </label>
          <input
            type="url"
            id="originalUrl"
            name="originalUrl"
            className="block text-gray-500 min-w-0 w-full text-base border"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="urlName" className="block text-gray-500">
            Link encurtado
          </label>
          <input
            id="urlName"
            name="urlName"
            className="block text-gray-500 min-w-0 w-full text-base border"
            value={shortenedUrl}
            onChange={(e) => setShortenedUrl(e.target.value)}
          />
        </div>
        {/* @TODO: change for a custom button */}
        <button type="submit" className="bg-blue-500 p-2 text-white">
          Salvar link
        </button>
      </form>
    </div>
  );
}
