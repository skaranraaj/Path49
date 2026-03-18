import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Toast, useToast } from '@/components/ui';
import { CareerPath } from '../types';
import { careerPaths } from '../data/careerPaths';
import { CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const CareerPaths: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
    const skills: any = location.state?.skills || [];
  
  const getPathMatchScore = (path: CareerPath) => {
    return Math.min(skills.length * 10, 100);
  };
    const handlePathSelect = (pathId: string) => {
    navigate(`/module/${pathId}/0`, { state: { selectedPathId: pathId } });
  };
    return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Recommended Career Paths</h1>
          <p className="text-gray-600">
            Based on your {skills.length} skills, here are the career paths that match your profile
          </p>
        </div>
        
        <div className="space-y-6">
          {careerPaths.map((path) => {
            const matchScore = getPathMatchScore(path);
            const isRecommended = matchScore >= 50;
            
            return (
              <Card 
                key={path.id}                 className={cn(
                  'group',
                  isRecommended ? 'border-border/50' : 'border-border/20',
                  'hover:border-primary/50'
                )}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                      <span className="font-medium text-sm">{path.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h2 className="card-title text-lg font-semibold">{path.name}</h2>
                      <p className="text-sm text-muted-foreground">{path.description}</p>
                    </div>
                  </div>
                  <div className="mt-2 flex w-full items-center justify-between">
                    <span className={cn(
                      'px-2 py-1 text-xs font-medium rounded',
                      isRecommended ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    )}>
                      {isRecommended ? 'Recommended' : 'Consider'}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Match: {matchScore}%
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    This path includes {path.modules.length} learning modules covering:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {path.modules.slice(0, 3).map((module) => (
                      <li key={module.id}>{module.title}</li>
                    ))}
                    {path.modules.length > 3 && (
                      <li className="italic">and {path.modules.length - 3} more modules...</li>
                    )}
                  </ul>
                </CardContent>
                <CardContent className="pt-4">
                  <Button 
                    variant="outline"
                    onClick={() => handlePathSelect(path.id)}
                    className="w-full"
                  >
                    Explore This Path
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="mt-8 text-center">
          <Button             variant="outline"
            onClick={() => navigate('/')}
          >
            Back to Skill Assessment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CareerPaths;