import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import PoliticaPrivacidad from "@/pages/politica-privacidad";
import PoliticaCookies from "@/pages/politica-cookies";
import Terminos from "@/pages/terminos";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/">{() => <Home />}</Route>
      <Route path="/admin">{() => <Home openAdmin={true} />}</Route>
      <Route path="/politica-privacidad">{() => <PoliticaPrivacidad />}</Route>
      <Route path="/politica-cookies">{() => <PoliticaCookies />}</Route>
      <Route path="/terminos">{() => <Terminos />}</Route>
      <Route>{() => <NotFound />}</Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
