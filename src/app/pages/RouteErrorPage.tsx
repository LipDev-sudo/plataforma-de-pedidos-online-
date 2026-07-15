import { AlertTriangle, ArrowLeft } from "lucide-react";
import { isRouteErrorResponse, Link, useRouteError } from "react-router";

export function RouteErrorPage() {
  const error = useRouteError();
  const message = isRouteErrorResponse(error)
    ? `${error.status} · ${error.statusText}`
    : "Não foi possível abrir esta página.";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0D0D0D] px-6 text-center text-white">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
        <AlertTriangle className="h-8 w-8" />
      </div>
      <h1 className="text-2xl font-semibold">Algo saiu do esperado</h1>
      <p className="mt-2 max-w-sm text-sm text-[#8A8A8A]">{message}</p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 font-semibold text-primary-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar ao início
      </Link>
    </main>
  );
}

export function NotFoundPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Erro 404</p>
      <h1 className="mt-2 text-3xl text-white">Página não encontrada</h1>
      <p className="mt-2 text-sm text-[#8A8A8A]">O endereço acessado não faz parte desta demonstração.</p>
      <Link to="/" className="mt-6 rounded-2xl bg-primary px-5 py-3 font-semibold text-primary-foreground">
        Voltar ao cardápio
      </Link>
    </div>
  );
}
