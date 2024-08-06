import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Connection, clusterApiUrl } from '@solana/web3.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Purchase from "./pages/Purchase";
import Marketplace from "./pages/Marketplace";
import Layout from "./components/Layout";

const queryClient = new QueryClient();
const connection = new Connection(clusterApiUrl('devnet'));

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ConnectionProvider value={connection}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="search" element={<Search />} />
            <Route path="purchase/:domain" element={<Purchase />} />
            <Route path="marketplace" element={<Marketplace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </ConnectionProvider>
  </QueryClientProvider>
);

export default App;
