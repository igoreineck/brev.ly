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
    <div className="divide-y-1 divide-gray-200">
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
    <div className="col-span-2 bg-white rounded-xl p-8">
      <h2 className="text-lg font-bold text-gray-600 mb-5">Meus links</h2>
      <hr className="h-1 text-gray-200" />
      <BrevlyLinkList />
    </div>
  );
}
