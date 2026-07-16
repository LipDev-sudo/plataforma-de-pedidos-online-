import { AlertTriangle, ArrowLeft } from "lucide-react";
import { isRouteErrorResponse, Link, useRouteError } from "react-router";

export function RouteErrorPage() {
  const error = useRouteError();
  const message = isRouteErrorResponse(error)
    ? `${error.status} · ${error.statusText}`
    : "Não foi possível abrir esta página.";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/8 text-primary">
        <AlertTriangle className="h-8 w-8" strokeWidth={1.7} aria-hidden="true" />
      </div>
      <h1 className="mt-5">Algo saiu do esperado</h1>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">{message}</p>
      <Link
        to="/"
        className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-white"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Voltar ao início
      </Link>
    </main>
  );
}

export function NotFoundPage() {
  return (
    <div className="flex min-h-[65vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-bold text-primary">Erro 404</p>
      <h1 className="mt-2">Página não encontrada</h1>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        O endereço acessado não faz parte da demonstração Mesaora.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-primary px-5 text-sm font-bold text-white"
      >
        Voltar ao cardápio
      </Link>
    </div>
  );
}
