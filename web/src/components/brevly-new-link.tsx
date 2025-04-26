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
    <>
      <h2 className="text-lg text-gray-600">Novo link</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label
            htmlFor="originalUrl"
            className="block text-sm/6 font-medium text-gray-500"
          >
            Link original
          </Label>
          <Input
            id="originalUrl"
            type="url"
            className="block text-gray-500 h-12 w-full text-base border"
            placeholder="www.exemplo.com.br"
            {...register("originalUrl")}
          />
        </div>
        <div>
          <Label
            htmlFor="name"
            className="block text-sm/6 font-medium text-gray-500"
          >
            Link encurtado
          </Label>
          <Input
            id="name"
            prefix="brev.ly/"
            className="block text-gray-500 h-12 w-full text-base border"
            {...register("name")}
          />
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          Salvar link
        </Button>
      </form>
    </>
  );
}
