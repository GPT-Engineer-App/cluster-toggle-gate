import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const mockClusterData = [
  { name: 'Cluster 1', scenario1: 400, scenario2: 240, scenario3: 320 },
  { name: 'Cluster 2', scenario1: 300, scenario2: 350, scenario3: 280 },
  { name: 'Cluster 3', scenario1: 200, scenario2: 180, scenario3: 250 },
  { name: 'Cluster 4', scenario1: 280, scenario2: 300, scenario3: 220 },
  { name: 'Cluster 5', scenario1: 180, scenario2: 220, scenario3: 190 },
];

const fetchClusterData = async () => {
  // In a real application, this would be an API call
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
  return mockClusterData;
};

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeScenarios, setActiveScenarios] = useState({
    scenario1: true,
    scenario2: true,
    scenario3: true,
  });

  const { data: clusterData, isLoading, isError } = useQuery({
    queryKey: ['clusterData'],
    queryFn: fetchClusterData,
    enabled: isAuthenticated,
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'password123') { // In a real app, use proper authentication
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  const toggleScenario = (scenario) => {
    setActiveScenarios(prev => ({ ...prev, [scenario]: !prev[scenario] }));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" className="w-full">Login</Button>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) return <div className="text-center mt-8">Loading...</div>;
  if (isError) return <div className="text-center mt-8">Error loading data</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cluster Analysis Results</h1>
      <div className="mb-4 space-x-2">
        <Toggle pressed={activeScenarios.scenario1} onPressedChange={() => toggleScenario('scenario1')}>
          Scenario 1
        </Toggle>
        <Toggle pressed={activeScenarios.scenario2} onPressedChange={() => toggleScenario('scenario2')}>
          Scenario 2
        </Toggle>
        <Toggle pressed={activeScenarios.scenario3} onPressedChange={() => toggleScenario('scenario3')}>
          Scenario 3
        </Toggle>
      </div>
      <Card>
        <CardContent className="pt-6">
          <BarChart
            width={600}
            height={300}
            data={clusterData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {activeScenarios.scenario1 && <Bar dataKey="scenario1" fill="#8884d8" />}
            {activeScenarios.scenario2 && <Bar dataKey="scenario2" fill="#82ca9d" />}
            {activeScenarios.scenario3 && <Bar dataKey="scenario3" fill="#ffc658" />}
          </BarChart>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
