import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button, Label, Input } from "./ui";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLink } from "@/api/create-link";
import { toast } from "sonner";

const createLinkForm = z.object({
  name: z.string(),
  originalUrl: z.string().url(),
});

type CreateLinkForm = z.infer<typeof createLinkForm>;

/* @TODO:
  - Adicionar mensagem de validação dos inputs
  - Adicionar mensagem de erro em caso de falha
*/
export function BrevlyNewLink() {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<CreateLinkForm>();
  const { mutateAsync: createLinkFn } = useMutation({
    mutationFn: createLink,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
  });

  async function onSubmit(data: CreateLinkForm) {
    try {
      await createLinkFn({ name: data.name, originalUrl: data.originalUrl });
      reset();
    } catch {
      toast.error("falhou...");
    }
  }

  return (
    <div className="col-span-1 bg-white rounded-xl p-8">
      <h2 className="text-lg font-bold text-gray-600 mb-6">Novo link</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <Label
            htmlFor="originalUrl"
            className="block text-gray-500 uppercase text-xs mb-2"
          >
            Link original
          </Label>
          <Input
            id="originalUrl"
            type="url"
            className="block rounded-xl text-gray-600 p-4 h-12 w-full"
            placeholder="www.exemplo.com.br"
            {...register("originalUrl")}
          />
        </div>
        <div className="mb-6">
          <Label
            htmlFor="name"
            className="block text-gray-500 uppercase text-xs mb-2"
          >
            Link encurtado
          </Label>
          <Input
            id="name"
            prefix="brev.ly/"
            className="block rounded-xl text-gray-600 h-12 p-4 w-full"
            {...register("name")}
          />
        </div>
        <Button
          type="submit"
          className="bg-primary text-md text-white p-4 h-12 rounded-xl w-full"
          disabled={isSubmitting}
        >
          Salvar link
        </Button>
      </form>
    </div>
  );
}
