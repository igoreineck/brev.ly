import { useParams, useNavigate } from "react-router";
import { findLink, FindLinkResponse } from "@/api/find-link";
import { incrementLinkAccess } from "@/api/increment-link-access";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

function redirect(url: string) {
  setTimeout(() => {
    window.location.href = url;
  }, 1 * 1000); // 1 Segundo
}

export function Redirect() {
  const navigate = useNavigate();
  const { name } = useParams();
  const { data: result, isSuccess } = useQuery<FindLinkResponse>({
    queryKey: ["find-link"],
    queryFn: () => findLink(name as string),
  });
  const { mutate } = useMutation({
    mutationFn: incrementLinkAccess,
  });

  useEffect(() => {
    if (result) {
      mutate(result.id);
      redirect(result.originalUrl);
    }
  }, [result]);

  if (isSuccess && !result) {
    return navigate("/404");
  }

  return (
    <div className="bg-white w-[580px]">
      <h2 className="font-medium text-2xl">Redirecionando...</h2>
      <p>O link será aberto automaticamente em alguns instantes.</p>
    </div>
  );
}
