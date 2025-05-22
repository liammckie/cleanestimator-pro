
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SystemHealthCheck {
  timestamp: string;
  version: string;
  status: 'healthy' | 'unhealthy' | 'degraded';
  checks: {
    [key: string]: {
      status: 'healthy' | 'unhealthy' | 'pending' | 'degraded';
      message?: string;
    };
  };
  errors: SystemHealthError[];
}

interface SystemHealthError {
  component: string;
  message: string;
  timestamp: string;
  details?: any;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  // Parse request body if any
  let reqBody = {};
  if (req.method === 'POST') {
    try {
      reqBody = await req.json();
    } catch {
      // If parsing fails, proceed with empty body
      reqBody = {};
    }
  }

  try {
    // Create a Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check if this is a specific action request
    if (reqBody && (reqBody as any).action === 'getErrors') {
      // Simulate returning error logs since the table doesn't exist yet
      return new Response(
        JSON.stringify({
          errors: []
        }),
        { 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json' 
          } 
        }
      );
    }
    
    if (reqBody && (reqBody as any).action === 'resolveError') {
      // Simulate resolving an error since the table doesn't exist yet
      return new Response(
        JSON.stringify({
          success: true
        }),
        { 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json' 
          } 
        }
      );
    }

    // Check database connectivity and critical tables
    const healthChecks: SystemHealthCheck = {
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      status: 'healthy',
      checks: {
        database: { status: 'pending' },
        workflows: { status: 'pending' },
        productivity_rates: { status: 'pending' },
        services: { status: 'pending' },
      },
      errors: [],
    };

    // Check database connection
    try {
      const { data, error } = await supabase.from('cleaning_workflows').select('count(*)', { count: 'exact', head: true });
      if (error) throw error;
      healthChecks.checks.database = { 
        status: 'healthy', 
        message: 'Database connection successful' 
      };
    } catch (error) {
      healthChecks.status = 'unhealthy';
      healthChecks.checks.database = { 
        status: 'unhealthy', 
        message: 'Database connection failed' 
      };
      healthChecks.errors.push({
        component: 'database',
        message: error.message,
        timestamp: new Date().toISOString()
      });
    }

    // Check workflows table
    try {
      const { data, error } = await supabase.from('cleaning_workflows').select('count(*)', { count: 'exact', head: true });
      if (error) throw error;
      healthChecks.checks.workflows = { 
        status: 'healthy', 
        message: `Found cleaning_workflows table` 
      };
    } catch (error) {
      healthChecks.status = 'unhealthy';
      healthChecks.checks.workflows = { 
        status: 'unhealthy', 
        message: 'Could not access cleaning_workflows table' 
      };
      healthChecks.errors.push({
        component: 'workflows',
        message: error.message,
        timestamp: new Date().toISOString()
      });
    }

    // Check productivity rates table
    try {
      const { data, error } = await supabase.from('industry_productivity_rates').select('count(*)', { count: 'exact', head: true });
      if (error) throw error;
      healthChecks.checks.productivity_rates = { 
        status: 'healthy', 
        message: `Found industry_productivity_rates table` 
      };
    } catch (error) {
      healthChecks.status = 'unhealthy';
      healthChecks.checks.productivity_rates = { 
        status: 'unhealthy', 
        message: 'Could not access industry_productivity_rates table' 
      };
      healthChecks.errors.push({
        component: 'productivity_rates',
        message: error.message,
        timestamp: new Date().toISOString()
      });
    }

    // Check periodic services table
    try {
      const { data, error } = await supabase.from('periodic_cleaning_services').select('count(*)', { count: 'exact', head: true });
      if (error) throw error;
      healthChecks.checks.services = { 
        status: 'healthy', 
        message: `Found periodic_cleaning_services table` 
      };
    } catch (error) {
      healthChecks.status = 'unhealthy';
      healthChecks.checks.services = { 
        status: 'unhealthy', 
        message: 'Could not access periodic_cleaning_services table' 
      };
      healthChecks.errors.push({
        component: 'services',
        message: error.message,
        timestamp: new Date().toISOString()
      });
    }

    // No need to log to database as the system_health_logs table doesn't exist yet

    return new Response(
      JSON.stringify(healthChecks),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  } catch (error) {
    console.error('Health check failed:', error);
    
    return new Response(
      JSON.stringify({ 
        status: 'unhealthy',
        error: error.message,
        timestamp: new Date().toISOString() 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});
