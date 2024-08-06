import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const Purchase = () => {
  const { domain } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async () => {
    setIsLoading(true);
    // Simulate purchase process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    toast({
      title: "Domain Purchased",
      description: `You have successfully purchased ${domain}`,
    });
    navigate('/marketplace');
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Purchase Domain</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg mb-4">Domain: {domain}</p>
        <p className="mb-4">Price: 5 SOL</p>
        <p className="text-sm text-muted-foreground">
          By purchasing this domain, you agree to the terms and conditions of the Solana Name Service.
        </p>
      </CardContent>
      <CardFooter>
        <Button onClick={handlePurchase} disabled={isLoading} className="w-full">
          {isLoading ? "Processing..." : "Confirm Purchase"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Purchase;
