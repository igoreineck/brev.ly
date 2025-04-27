import { TrashIcon, CopyIcon } from "@/components/icons";
import { Button } from "./ui";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLink } from "@/api/delete-link";
import { toast } from "sonner";

type LinkProps = {
  id: string;
  name: string;
  originalUrl: string;
  accessCounter: string;
  createdAt: Date;
};

export function BrevlyLink(props: LinkProps) {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: deleteLink,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
  });

  async function handleDelete(id: string) {
    if (confirm(`Você realmente quer apagar o link ${props.name}?`)) {
      await mutateAsync(id);
    }
  }

  async function copyToClipboard(url: string) {
    await navigator.clipboard.writeText(url);
    toast.info(
      <div>
        <p className="font-bold">Link copiado com sucesso</p>
        <p>O link {props.name} foi copiado para a área de transferência.</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between py-4">
      <div>
        <a
          href={`/${props.name}`}
          target="_blank"
          className="text-primary font-semibold mb-1"
        >{`brev.ly/${props.name}`}</a>
        <p className="text-sm text-gray-500">{props.originalUrl}</p>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500 mr-5">
          {props.accessCounter} acessos
        </span>
        <div className="flex items-center gap-x-1">
          <Button
            className="bg-gray-200 rounded-lg text-gray-600 border-gray-200 border-1 hover:bg-gray-200 hover:border-primary cursor-pointer"
            onClick={() => copyToClipboard(props.originalUrl)}
          >
            <CopyIcon />
          </Button>
          <Button
            className="bg-gray-200 rounded-lg text-gray-600 border-gray-200 border-1 hover:bg-gray-200 hover:border-primary cursor-pointer"
            onClick={() => handleDelete(props.id)}
          >
            <TrashIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
