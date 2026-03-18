import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Module, CareerPath, LearningMaterial } from '../types';
import { careerPaths } from '../data/careerPaths';
import { CheckCircle, XCircle, Play, BookOpen, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const ModulePage: React.FC = () => {
  const { pathId, moduleId } = useParams<{ pathId: string; moduleId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast().toast;
  
  const selectedPathId = location.state?.selectedPathId || pathId;
  const selectedPath = careerPaths.find(p => p.id === selectedPathId);
  
  if (!selectedPath) {
    navigate('/');
    return null;
  }
  
  const moduleIndex = parseInt(moduleId);
  const currentModule = selectedPath.modules[moduleIndex];
  
  if (!currentModule) {
    navigate(`/module/${selectedPathId}/0`);
    return null;
  }
  
  const isLocked = currentModule.isLocked && moduleIndex > 0;
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const totalQuestions = currentModule.quiz.questions.length;
  
  const handleAnswer = (selectedAnswer: string) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    const question = currentModule.quiz.questions[currentQuestion];
    const isCorrect = question.correctAnswer === selectedAnswer;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    setTimeout(() => {
      if (currentQuestion < totalQuestions - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        setShowResults(true);
      }
      setIsSubmitting(false);
    }, 800);
  };
  
  const handleQuizComplete = () => {
    const passingScore = (score / totalQuestions) * 100;
    const passed = passingScore >= currentModule.quiz.passingScore;
    
    if (passed) {
      toast({
        title: 'Quiz Passed!',
        description: `You scored ${score}/${totalQuestions} (${Math.round(passingScore)}%)`,
        variant: 'default'
      });
      
      if (moduleIndex < selectedPath.modules.length - 1) {
        navigate(`/module/${selectedPathId}/${moduleIndex + 1}`);
      } else {
        toast({
          title: 'Path Completed!',
          description: `Congratulations! You've completed the ${selectedPath.name} path`,
          variant: 'default'
        });
        navigate('/career-paths');
      }
    } else {
      toast({
        variant: 'destructive',
        title: 'Quiz Not Passed',
        description: `You scored ${score}/${totalQuestions} (${Math.round(passingScore)}%). You need at least ${currentModule.quiz.passingScore}% to pass.`,
      });
      setShowResults(false);
      setCurrentQuestion(0);
      setScore(0);
    }
  };
  
  if (isLocked) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Module Locked</CardTitle>
            <CardDescription>
              Complete the previous module to unlock this learning content
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center py-8">
            <div className="mb-6">
              <XCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            </div>
            <h3 className="font-medium mb-2">Prerequisite Required</h3>
            <p className="text-muted-foreground">
              You need to complete the previous module before accessing this content.
            </p>
            {moduleIndex > 0 && (
              <Button 
                variant="outline"
                onClick={() => navigate(`/module/${selectedPathId}/${moduleIndex - 1}`)}
                className="mt-4"
              >
                Go to Previous Module
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6 flex items-center justify-between">
          <Button 
            variant="outline"
            size="icon"
            onClick={() => navigate('/career-paths')}
          >
            <XCircle className="h-4 w-4" />
          </Button>
          <div className="flex-1 text-center">
            <h1 className="text-2xl font-bold">{selectedPath.name}</h1>
            <p className="text-sm text-muted-foreground">
              Module {moduleIndex + 1} of {selectedPath.modules.length}
            </p>
          </div>
          <Button 
            variant="outline"
            size="icon"
            onClick={() => {
              toast({
                title: 'Progress',
                description: `Completed ${moduleIndex} of ${selectedPath.modules.length} modules`,
              });
            }}
          >
            <Play className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-6">
          <Tabs defaultValue="materials" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="materials" className="hover:bg-muted">
                Learning Materials
              </TabsTrigger>
              <TabsTrigger value="quiz" className="hover:bg-muted">
                Quiz
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="materials">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>{currentModule.title}</CardTitle>
                  <CardDescription>{currentModule.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {currentModule.materials.map((material) => (
                    <div key={material.id} className="border rounded-lg p-4 bg-white">
                      <div className="flex items-start space-x-3 mb-3">
                        {material.type === 'video' && (
                          <Play className="h-5 w-5 text-primary flex-shrink-0" />
                        )}
                        {material.type === 'article' && (
                          <BookOpen className="h-5 w-5 text-primary flex-shrink-0" />
                        )}
                        {material.type === 'interactive' && (
                          <Zap className="h-5 w-5 text-primary flex-shrink-0" />
                        )}
                        <div>
                          <h3 className="font-medium">{material.title}</h3>
                          <p className="text-sm text-muted-foreground">{material.description}</p>
                          {material.duration && (
                            <p className="text-xs text-muted-foreground mt-1">
                              ⏱️ {material.duration} minutes
                            </p>
                          )}
                        </div>
                      </div>
                      <Button 
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          toast({
                            title: 'Opening Material',
                            description: `Now opening: ${material.title}`,
                          });
                        }}
                      >
                        Access Material
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="quiz">
              {showResults ? (
                <div className="text-center py-8">
                  <h2 className="text-2xl font-bold mb-4">
                    {score >= Math.ceil(totalQuestions * currentModule.quiz.passingScore / 100)                       ? 'Quiz Completed!' 
                      : 'Quiz Results'}
                  </h2>
                  <p className="text-lg mb-6">
                    You scored {score} out of {totalQuestions} 
                    ({Math.round((score / totalQuestions) * 100)}%)
                  </p>
                  <div className="mb-6">
                    {score >= Math.ceil(totalQuestions * currentModule.quiz.passingScore / 100) ? (
                      <div className="flex items-center justify-center space-x-3">
                        <CheckCircle className="h-6 w-6 text-green-500" />
                        <span className="font-medium">You passed! Next module unlocked.</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-3">
                        <XCircle className="h-6 w-6 text-red-500" />
                        <span className="font-medium">Try again to unlock the next module</span>
                      </div>
                    )}
                  </div>
                  <Button 
                    onClick={handleQuizComplete}
                    className="w-full"
                  >
                    {score >= Math.ceil(totalQuestions * currentModule.quiz.passingScore / 100)                       ? 'Continue to Next Module'                       : 'Retake Quiz'}
                  </Button>
                </div>
              ) : (
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>{currentModule.quiz.title}</CardTitle>
                    <CardDescription>
                      Answer all questions to unlock the next module
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {!currentModule.quiz.questions.length ? (
                      <p className="text-center py-8">No questions available for this quiz.</p>
                    ) : (
                      <>
                        <div className="text-sm text-muted-foreground mb-4">
                          Question {currentQuestion + 1} of {totalQuestions}
                        </div>
                        
                        <div className="bg-muted/50 p-4 rounded-lg mb-4">
                          <p className="font-medium">{currentModule.quiz.questions[currentQuestion].question}</p>
                        </div>
                        
                        <div className="space-y-3">
                          {currentModule.quiz.questions[currentQuestion].options.map((option, index) => (
                            <Button 
                              key={index}
                              variant={isSubmitting ? 'outline' : 'default'}
                              className="w-full text-left justify-start px-4 py-3"
                              disabled={isSubmitting}
                              onClick={() => handleAnswer(option)}
                            >
                              {option}
                            </Button>
                          ))}
                        </div>
                        
                        {isSubmitting && (
                          <div className="text-center py-4">
                            <div className="inline-block animate-pulse rounded bg-primary/20 px-3 py-1 text-sm">
                              Checking answer...
                            </div>
                          </div>
                        )}
                        
                        {!isSubmitting && !showResults && currentQuestion < totalQuestions - 1 && (
                          <Button 
                            variant="outline"
                            onClick={() => {
                              setCurrentQuestion(prev => prev + 1);
                            }}
                            className="w-full"
                          >
                            Skip Question
                          </Button>
                        )}
                      </>
                    )}
                  </CardContent>
                  <CardContent className="pt-4">
                    {!isSubmitting && !showResults && (
                      <Button 
                        onClick={handleQuizComplete}
                        className="w-full"
                        disabled={currentQuestion < totalQuestions - 1}
                      >
                        {currentQuestion < totalQuestions - 1 ? 'Next Question' : 'Submit Quiz'}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="mt-8 flex items-center justify-between pt-4 border-t">
          <div className="flex-1">
            {moduleIndex > 0 && (
              <Button 
                variant="outline"
                onClick={() => navigate(`/module/${selectedPathId}/${moduleIndex - 1}`)}
              >
                Previous Module
              </Button>
            )}
          </div>
          <div className="flex-1 text-right">
            {moduleIndex < selectedPath.modules.length - 1 && !isLocked && (
              <Button 
                onClick={() => navigate(`/module/${selectedPathId}/${moduleIndex + 1}`)}
                disabled={currentQuestion < totalQuestions - 1 && !showResults}
              >
                Next Module
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModulePage;