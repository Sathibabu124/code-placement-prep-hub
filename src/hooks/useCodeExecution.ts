
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface TestCase {
  input: string;
  expectedOutput: string;
}

interface ExecutionResult {
  status: 'accepted' | 'wrong_answer' | 'time_limit_exceeded' | 'memory_limit_exceeded' | 'runtime_error' | 'compilation_error';
  output?: string;
  error?: string;
  executionTime?: number;
  memoryUsed?: number;
  testResults?: Array<{
    passed: boolean;
    input: string;
    expectedOutput: string;
    actualOutput: string;
    error?: string;
  }>;
}

export const useCodeExecution = () => {
  const [isExecuting, setIsExecuting] = useState(false);

  const executeCode = async (
    code: string, 
    language: string, 
    testCases: TestCase[]
  ): Promise<ExecutionResult> => {
    setIsExecuting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('execute-code', {
        body: {
          code,
          language,
          testCases,
          timeLimit: 5000
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      return {
        status: 'runtime_error',
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    } finally {
      setIsExecuting(false);
    }
  };

  const submitSolution = async (
    problemId: string,
    code: string,
    language: string,
    result: ExecutionResult
  ) => {
    try {
      const { error } = await supabase
        .from('submissions')
        .insert({
          problem_id: problemId,
          user_id: (await supabase.auth.getUser()).data.user?.id,
          code,
          language,
          status: result.status,
          test_results: result.testResults,
          execution_time: result.executionTime,
          memory_used: result.memoryUsed
        });

      if (error) throw error;
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to submit solution' 
      };
    }
  };

  return {
    executeCode,
    submitSolution,
    isExecuting
  };
};
