import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const mockFetchListings = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    { id: 1, name: 'awesome.sol', price: 10 },
    { id: 2, name: 'crypto.sol', price: 50 },
    { id: 3, name: 'blockchain.sol', price: 30 },
  ];
};

// Note: In a real application, this function would be replaced with an actual API call
// to fetch current marketplace listings and prices from the Solana blockchain or a database.

const Marketplace = () => {
  const { toast } = useToast();
  const [newListing, setNewListing] = useState({ name: '', price: '' });

  const { data: listings, isLoading, refetch } = useQuery({
    queryKey: ['listings'],
    queryFn: mockFetchListings,
  });

  const handleListDomain = async (e) => {
    e.preventDefault();
    // Simulate listing process
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: "Domain Listed",
      description: `${newListing.name} has been listed for ${newListing.price} SOL`,
    });
    setNewListing({ name: '', price: '' });
    refetch();
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Marketplace Listings</h2>
      
      {isLoading ? (
        <p>Loading listings...</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <Card key={listing.id}>
              <CardHeader>
                <CardTitle>{listing.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Price: {listing.price} SOL</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Buy</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>List Your Domain</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleListDomain} className="space-y-4">
            <Input
              placeholder="Domain name"
              value={newListing.name}
              onChange={(e) => setNewListing({ ...newListing, name: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Price in SOL"
              value={newListing.price}
              onChange={(e) => setNewListing({ ...newListing, price: e.target.value })}
            />
            <Button type="submit" className="w-full">List Domain</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Marketplace;
