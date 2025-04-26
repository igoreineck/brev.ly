import { useQuery } from "@tanstack/react-query";
import { getLinks, GetLinksResponse } from "@/api/get-links";
import { BrevlyLink } from "./brevly-link";

function BrevlyLinkList() {
  const { data: result, isLoading } = useQuery<GetLinksResponse>({
    queryKey: ["links"],
    queryFn: getLinks,
  });

  if (isLoading) {
    return <div>Lista carregando...</div>;
  }

  if (!result) {
    return <div>Lista vazia</div>;
  }

  return (
    <div>
      {result.links.map((props) => (
        <BrevlyLink key={props.id} {...props} />
      ))}
    </div>
  );
}

/* 
  TODO:
  - Adicionar remoção de cada link
  - Adicionar ícone quando estiver no estado vazio.
*/
export function BrevlyLinkListContainer() {
  return (
    <div>
      <h2 className="text-lg text-gray-500">Meus links</h2>
      <hr />
      <BrevlyLinkList />
    </div>
  );
}
