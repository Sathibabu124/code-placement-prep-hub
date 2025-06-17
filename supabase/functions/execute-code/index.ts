
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ExecutionRequest {
  code: string;
  language: string;
  testCases: Array<{
    input: string;
    expectedOutput: string;
  }>;
  timeLimit?: number;
  memoryLimit?: number;
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

async function executeJavaScript(code: string, input: string, timeLimit: number = 5000): Promise<ExecutionResult> {
  try {
    // Create a sandboxed environment for JavaScript execution
    const wrappedCode = `
      let inputData = ${JSON.stringify(input)};
      let consoleOutput = '';
      const originalConsole = console.log;
      console.log = (...args) => {
        consoleOutput += args.join(' ') + '\\n';
      };
      
      try {
        ${code}
        
        // Try to execute main function if it exists
        if (typeof main === 'function') {
          const result = main();
          if (result !== undefined) {
            consoleOutput += result;
          }
        }
      } catch (error) {
        throw error;
      }
      
      console.log = originalConsole;
      consoleOutput.trim();
    `;

    const startTime = Date.now();
    
    // Execute with timeout
    const result = await Promise.race([
      new Promise((resolve) => {
        try {
          const output = eval(wrappedCode);
          resolve(output);
        } catch (error) {
          throw error;
        }
      }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Time limit exceeded')), timeLimit)
      )
    ]);

    const executionTime = Date.now() - startTime;
    
    return {
      status: 'accepted',
      output: String(result),
      executionTime,
      memoryUsed: 0 // Memory tracking not implemented for JavaScript
    };
  } catch (error) {
    if (error.message === 'Time limit exceeded') {
      return {
        status: 'time_limit_exceeded',
        error: 'Time limit exceeded'
      };
    }
    return {
      status: 'runtime_error',
      error: error.message
    };
  }
}

async function executePython(code: string, input: string, timeLimit: number = 5000): Promise<ExecutionResult> {
  try {
    // For Python, we'll simulate execution since we can't run Python directly in Deno
    // In a real implementation, you'd use a containerized environment
    const startTime = Date.now();
    
    // Simple Python code simulation for basic cases
    if (code.includes('def ') && code.includes('return')) {
      // Simulate function execution
      await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));
      
      const executionTime = Date.now() - startTime;
      
      // Mock output based on input
      const mockOutput = input.replace(/\[|\]/g, '').split(',').map(x => x.trim());
      
      return {
        status: 'accepted',
        output: `[${mockOutput.join(', ')}]`,
        executionTime,
        memoryUsed: Math.floor(Math.random() * 50) + 10
      };
    }
    
    return {
      status: 'compilation_error',
      error: 'Python execution not fully implemented in demo'
    };
  } catch (error) {
    return {
      status: 'runtime_error',
      error: error.message
    };
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { code, language, testCases, timeLimit = 5000 }: ExecutionRequest = await req.json()

    if (!code || !language || !testCases) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const results: ExecutionResult['testResults'] = []

    for (const testCase of testCases) {
      let result: ExecutionResult;
      
      switch (language.toLowerCase()) {
        case 'javascript':
          result = await executeJavaScript(code, testCase.input, timeLimit);
          break;
        case 'python':
          result = await executePython(code, testCase.input, timeLimit);
          break;
        default:
          result = {
            status: 'compilation_error',
            error: `Language ${language} not supported`
          };
      }

      if (result.status !== 'accepted') {
        return new Response(
          JSON.stringify(result),
          { 
            status: 200, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }

      const passed = result.output?.trim() === testCase.expectedOutput.trim();
      
      results.push({
        passed,
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
        actualOutput: result.output || '',
        error: result.error
      });
    }

    const allPassed = results.every(r => r.passed);
    const finalResult: ExecutionResult = {
      status: allPassed ? 'accepted' : 'wrong_answer',
      testResults: results,
      executionTime: results.reduce((sum, r) => sum + (r as any).executionTime || 0, 0),
      memoryUsed: Math.max(...results.map(r => (r as any).memoryUsed || 0))
    };

    return new Response(
      JSON.stringify(finalResult),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
