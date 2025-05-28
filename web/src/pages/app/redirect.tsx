import { useParams, useNavigate, Link } from "react-router";
import { findLink, FindLinkResponse } from "@/api/find-link";
import { incrementLinkAccess } from "@/api/increment-link-access";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ReactNode, useEffect } from "react";
import LogoIcon from "@/assets/logo-icon.svg";

function redirect(url: string) {
  setTimeout(() => {
    window.location.href = url;
  }, 1 * 1000); // 1 Segundo
}

export function Redirect(): ReactNode {
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
  }, [result, mutate]);

  if (isSuccess && !result) {
    navigate("/404");
    return <></>;
  }

  return (
    <div className="flex justify-center h-screen">
      <div className="m-auto w-[580px] bg-white rounded-xl px-12 py-16">
        <div className="flex justify-center mb-6">
          <img src={LogoIcon} alt="logo-icon" className="h-12" />
        </div>
        <h2 className="text-bold text-xl text-gray-600 text-center mb-6">
          Redirecionando...
        </h2>
        <p className="text-gray-500 text-center">
          O link será aberto automaticamente em alguns instantes. Não foi
          redirecionado?{" "}
          <Link to={result?.originalUrl as string} className="text-primary">
            Acesse aqui
          </Link>
        </p>
      </div>
    </div>
  );
}
