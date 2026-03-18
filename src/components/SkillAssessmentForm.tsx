import { useState } from 'react';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Form, FormControl, FormField, FormItem, FormLabel, Input, Textarea, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Toast, useToast } from '@/components/ui';
import { Skill } from '../types';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const SkillAssessmentForm: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [newProficiency, setNewProficiency] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAddSkill = () => {
    if (newSkill.trim() && newProficiency >= 1 && newProficiency <= 10) {
      setSkills(prev => [
        ...prev,
        {
          id: Math.random().toString(36).substr(2, 9),
          name: newSkill.trim(),
          proficiency: newProficiency
        }
      ]);
      setNewSkill('');
      setNewProficiency(1);
    }
  };

  const handleRemoveSkill = (id: string) => {
    setSkills(prev => prev.filter(skill => skill.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (skills.length === 0) {
      toast({
        variant: 'destructive',
        title: 'Please add at least one skill',
        description: 'You need to assess your skills to generate career paths'
      });
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      navigate('/career-paths', { state: { skills } });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Skill Assessment</CardTitle>
          <CardDescription>
            Tell us about your current skills and proficiency levels to generate personalized career paths
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <FormField control={<Input
                    placeholder="Enter a skill (e.g., JavaScript, Python, Design)"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                  />}
                >
                  <FormLabel>Skill Name</FormLabel>
                  <FormControl>
                    <Input />
                  </FormControl>
                </FormField>
              </div>
              
              <div className="space-y-2">
                <FormField
                  control={
                    <Select
                      value={newProficiency}
                      onValueChange={(value) => setNewProficiency(Number(value))}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select proficiency level" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(level => (
                          <SelectItem key={level} value={level}>
                            {level} - {level <= 3 ? 'Beginner' : level <= 6 ? 'Intermediate' : 'Advanced'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  }
                >
                  <FormLabel>Proficiency Level (1-10)</FormLabel>
                  <FormControl>
                    <Select />
                  </FormControl>
                </FormField>
              </div>
              
              <Button 
                type="button" 
                onClick={handleAddSkill}
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Adding...' : 'Add Skill'}
              </Button>
            </div>
            
            {skills.length > 0 && (
              <div className="mt-4">
                <h3 className="font-medium mb-2">Your Skills</h3>
                <div className="space-y-2">
                  {skills.map((skill) => (
                    <div key={skill.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <span className="font-medium">{skill.name}</span>
                        <span className="ml-2 text-sm text-gray-500">
                          Proficiency: {skill.proficiency}/10
                        </span>
                      </div>
                      <Button 
                        variant="outline"
                        size="icon"
                        onClick={() => handleRemoveSkill(skill.id)}
                        className="h-8 w-8"
                      >
                        <XCircle className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-6">
              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting || skills.length === 0}
              >
                {isSubmitting ? 'Generating Paths...' : 'Generate Career Paths'}
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>
      
      {skills.length > 0 && (
        <div className="text-center text-sm text-gray-500">
          <p>Tip: The more skills you add, the better your career path recommendations will be.</p>
        </div>
      )}
    </div>
  );
};

export default SkillAssessmentForm;