import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
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
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
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
                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-500 text-sm"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (isLoading) return <div className="text-center mt-8">Loading...</div>;
  if (isError) return <div className="text-center mt-8">Error loading data</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4"
    >
      <h1 className="text-2xl font-bold mb-4">Cluster Analysis Results</h1>
      <div className="mb-4 space-x-2">
        {['scenario1', 'scenario2', 'scenario3'].map((scenario, index) => (
          <motion.div
            key={scenario}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="inline-block"
          >
            <Toggle
              pressed={activeScenarios[scenario]}
              onPressedChange={() => toggleScenario(scenario)}
            >
              {`Scenario ${index + 1}`}
            </Toggle>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
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
              <AnimatePresence>
                {activeScenarios.scenario1 && (
                  <motion.g key="scenario1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Bar dataKey="scenario1" fill="#8884d8" />
                  </motion.g>
                )}
                {activeScenarios.scenario2 && (
                  <motion.g key="scenario2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Bar dataKey="scenario2" fill="#82ca9d" />
                  </motion.g>
                )}
                {activeScenarios.scenario3 && (
                  <motion.g key="scenario3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Bar dataKey="scenario3" fill="#ffc658" />
                  </motion.g>
                )}
              </AnimatePresence>
            </BarChart>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Index;
