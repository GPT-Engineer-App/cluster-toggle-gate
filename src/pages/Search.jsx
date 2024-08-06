import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const mockSearchDomains = async (query) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  const domains = [
    { name: `${query}.sol`, available: true, price: 5 },
    { name: `${query}domain.sol`, available: true, price: 3 },
    { name: `my${query}.sol`, available: false, price: 10 },
  ];
  return domains;
};

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');

  const { data: domains, isLoading, refetch } = useQuery({
    queryKey: ['domains', searchTerm],
    queryFn: () => mockSearchDomains(searchTerm),
    enabled: !!searchTerm,
  });

  useEffect(() => {
    if (searchParams.get('q')) {
      setSearchTerm(searchParams.get('q'));
      refetch();
    }
  }, [searchParams, refetch]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ q: searchTerm });
    refetch();
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          type="text"
          placeholder="Search for a domain..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit">Search</Button>
      </form>

      {isLoading ? (
        <p>Searching for domains...</p>
      ) : domains ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {domains.map((domain) => (
            <Card key={domain.name}>
              <CardHeader>
                <CardTitle>{domain.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Price: {domain.price} SOL</p>
                {domain.available ? (
                  <Button asChild className="mt-2">
                    <Link to={`/purchase/${domain.name}`}>Buy Now</Link>
                  </Button>
                ) : (
                  <p className="text-red-500">Not Available</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Search;
