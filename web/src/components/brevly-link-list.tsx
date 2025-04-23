import { useQuery } from "@tanstack/react-query";
import { getLinks, GetLinksResponse } from "@/api/get-links";
import { BrevlyLink } from "./brevly-link";

/* 
  TODO:
  - Adicionar edição de cada link
  - Adicionar remoção de cada link
  - Adicionar estado vazio, com ícone
*/
export function BrevlyLinkList() {
  const { data: result, isLoading } = useQuery<GetLinksResponse>({
    queryKey: ["links"],
    queryFn: getLinks,
  });

  return (
    <>
      <h2 className="text-lg text-gray-500">Meus links</h2>
      <hr />
      {isLoading && <div>Lista carregando...</div>}
      {!result && <div>Lista vazia</div>}
      {result &&
        result.links.map((link) => (
          <BrevlyLink
            key={link.id}
            name={link.name}
            originalUrl={link.originalUrl}
          />
        ))}
    </>
  );
}
