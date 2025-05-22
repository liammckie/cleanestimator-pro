
export interface SystemHealthCheck {
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

export interface SystemHealthError {
  component: string;
  message: string;
  timestamp: string;
  details?: any;
}

export interface SystemHealthLog {
  id: string;
  health_data: SystemHealthCheck;
  status: 'healthy' | 'unhealthy' | 'degraded';
  version: string;
  created_at?: string;
}

export interface SystemErrorLog {
  id: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  component: string;
  stack_trace?: string;
  metadata?: any;
  resolved: boolean;
  created_at?: string;
  resolved_at?: string | null;
  resolution_notes?: string | null;
}
