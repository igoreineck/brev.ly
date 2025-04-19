import { BrevlyLink } from "./brevly-link";

type Props = {
  className: string;
};

/* 
  TODO:
  - Implementar API de listagem
  - Adicionar edição de cada link
  - Adicionar remoção de cada link
  - Adicionar estado vazio, com ícone
*/
export function BrevlyLinkList(_props: Props) {
  // const links = [];

  return (
    <div className="col-span-1 bg-white p-10">
      <h2 className="text-lg text-gray-500">Meus links</h2>
      <hr />
      {/* {links.map((link) => (
        <BrevlyLink
          key={link.id}
          originalUrl={link.name}
          shortenedUrl={link.originalUrl}
        />
      ))} */}
    </div>
  );
}
