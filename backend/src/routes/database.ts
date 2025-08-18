import { Router, Request, Response } from 'express';
import { DatabaseService } from '../services/database-service';
import { 
  User, 
  Project, 
  ClimateData, 
  CarbonCredit, 
  Transaction,
  EnvironmentalAlert 
} from '../types/database';

const router = Router();

// Database Health Check
router.get('/health', async (req: Request, res: Response) => {
  try {
    const health = await DatabaseService.healthCheck();
    
    res.json({
      success: true,
      message: 'Database health check completed',
      data: health
    });
  } catch (error) {
    console.error('Database health check error:', error);
    res.status(503).json({
      success: false,
      message: 'Database health check failed',
      error: (error as Error)?.message || 'Unknown error'
    });
  }
});

// User Operations
router.post('/users', async (req: Request, res: Response) => {
  try {
    const userData: Partial<User> = req.body;
    
    if (!userData.email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    const user = await DatabaseService.createUser(userData);
    
    if (!user) {
      return res.status(500).json({
        success: false,
        message: 'Failed to create user'
      });
    }
    
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: user
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create user',
      error: (error as Error)?.message || 'Unknown error'
    });
  }
});

router.get('/users/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await DatabaseService.getUserById(id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user',
      error: (error as Error)?.message || 'Unknown error'
    });
  }
});

router.put('/users/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates: Partial<User> = req.body;
    
    const user = await DatabaseService.updateUser(id, updates);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found or update failed'
      });
    }
    
    res.json({
      success: true,
      message: 'User updated successfully',
      data: user
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update user',
      error: (error as Error)?.message || 'Unknown error'
    });
  }
});

router.get('/users/:id/stats', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const stats = await DatabaseService.getUserStats(id);
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user stats',
      error: (error as Error)?.message || 'Unknown error'
    });
  }
});

// Project Operations
router.post('/projects', async (req: Request, res: Response) => {
  try {
    const projectData: Partial<Project> = req.body;
    
    if (!projectData.title || !projectData.description || !projectData.owner_id) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, and owner_id are required'
      });
    }

    const project = await DatabaseService.createProject(projectData);
    
    if (!project) {
      return res.status(500).json({
        success: false,
        message: 'Failed to create project'
      });
    }
    
    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create project',
      error: (error as Error)?.message || 'Unknown error'
    });
  }
});

router.get('/projects', async (req: Request, res: Response) => {
  try {
    const { 
      limit = 10, 
      offset = 0, 
      orderBy = 'created_at', 
      orderDirection = 'desc',
      status,
      project_type,
      owner_id
    } = req.query;

    const options = {
      limit: parseInt(limit as string),
      offset: parseInt(offset as string),
      orderBy: orderBy as string,
      orderDirection: orderDirection as 'asc' | 'desc',
      filters: {}
    };

    // Add filters
    if (status) options.filters = { ...options.filters, status };
    if (project_type) options.filters = { ...options.filters, project_type };
    if (owner_id) options.filters = { ...options.filters, owner_id };

    const result = await DatabaseService.getProjects(options);
    
    res.json({
      success: true,
      data: result.data,
      count: result.count,
      pagination: {
        limit: options.limit,
        offset: options.offset,
        total: result.count
      }
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch projects',
      error: (error as Error)?.message || 'Unknown error'
    });
  }
});

router.get('/projects/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = await DatabaseService.getProjectById(id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch project',
      error: (error as Error)?.message || 'Unknown error'
    });
  }
});

// Climate Data Operations
router.post('/climate-data', async (req: Request, res: Response) => {
  try {
    const climateData: Partial<ClimateData> = req.body;
    
    if (!climateData.location || climateData.temperature === undefined || climateData.humidity === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Location, temperature, and humidity are required'
      });
    }

    const data = await DatabaseService.storeClimateData(climateData);
    
    if (!data) {
      return res.status(500).json({
        success: false,
        message: 'Failed to store climate data'
      });
    }
    
    res.status(201).json({
      success: true,
      message: 'Climate data stored successfully',
      data
    });
  } catch (error) {
    console.error('Error storing climate data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to store climate data',
      error: (error as Error)?.message || 'Unknown error'
    });
  }
});

router.get('/climate-data', async (req: Request, res: Response) => {
  try {
    const { 
      limit = 50, 
      offset = 0, 
      orderBy = 'timestamp', 
      orderDirection = 'desc',
      location,
      source,
      verified
    } = req.query;

    const options = {
      limit: parseInt(limit as string),
      offset: parseInt(offset as string),
      orderBy: orderBy as string,
      orderDirection: orderDirection as 'asc' | 'desc',
      filters: {}
    };

    // Add filters
    if (location) options.filters = { ...options.filters, location };
    if (source) options.filters = { ...options.filters, source };
    if (verified !== undefined) options.filters = { ...options.filters, verified: verified === 'true' };

    const result = await DatabaseService.getClimateData(options);
    
    res.json({
      success: true,
      data: result.data,
      count: result.count,
      pagination: {
        limit: options.limit,
        offset: options.offset,
        total: result.count
      }
    });
  } catch (error) {
    console.error('Error fetching climate data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch climate data',
      error: (error as Error)?.message || 'Unknown error'
    });
  }
});

// Carbon Credits Operations
router.post('/carbon-credits', async (req: Request, res: Response) => {
  try {
    const creditData: Partial<CarbonCredit> = req.body;
    
    if (!creditData.project_id || !creditData.owner_id || !creditData.amount) {
      return res.status(400).json({
        success: false,
        message: 'Project ID, owner ID, and amount are required'
      });
    }

    const credit = await DatabaseService.createCarbonCredit(creditData);
    
    if (!credit) {
      return res.status(500).json({
        success: false,
        message: 'Failed to create carbon credit'
      });
    }
    
    res.status(201).json({
      success: true,
      message: 'Carbon credit created successfully',
      data: credit
    });
  } catch (error) {
    console.error('Error creating carbon credit:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create carbon credit',
      error: (error as Error)?.message || 'Unknown error'
    });
  }
});

router.get('/users/:userId/carbon-credits', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const credits = await DatabaseService.getCarbonCreditsByUser(userId);
    
    res.json({
      success: true,
      data: credits,
      count: credits.length
    });
  } catch (error) {
    console.error('Error fetching carbon credits:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch carbon credits',
      error: (error as Error)?.message || 'Unknown error'
    });
  }
});

// Transaction Operations
router.post('/transactions', async (req: Request, res: Response) => {
  try {
    const transactionData: Partial<Transaction> = req.body;
    
    if (!transactionData.type || !transactionData.from_user_id || !transactionData.amount) {
      return res.status(400).json({
        success: false,
        message: 'Type, from_user_id, and amount are required'
      });
    }

    const transaction = await DatabaseService.createTransaction(transactionData);
    
    if (!transaction) {
      return res.status(500).json({
        success: false,
        message: 'Failed to create transaction'
      });
    }
    
    res.status(201).json({
      success: true,
      message: 'Transaction created successfully',
      data: transaction
    });
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create transaction',
      error: (error as Error)?.message || 'Unknown error'
    });
  }
});

router.get('/users/:userId/transactions', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const transactions = await DatabaseService.getTransactionsByUser(userId);
    
    res.json({
      success: true,
      data: transactions,
      count: transactions.length
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch transactions',
      error: (error as Error)?.message || 'Unknown error'
    });
  }
});

// Environmental Alerts
router.post('/alerts', async (req: Request, res: Response) => {
  try {
    const alertData: Partial<EnvironmentalAlert> = req.body;
    
    if (!alertData.type || !alertData.location || !alertData.description) {
      return res.status(400).json({
        success: false,
        message: 'Type, location, and description are required'
      });
    }

    const alert = await DatabaseService.createAlert(alertData);
    
    if (!alert) {
      return res.status(500).json({
        success: false,
        message: 'Failed to create alert'
      });
    }
    
    res.status(201).json({
      success: true,
      message: 'Alert created successfully',
      data: alert
    });
  } catch (error) {
    console.error('Error creating alert:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create alert',
      error: (error as Error)?.message || 'Unknown error'
    });
  }
});

router.get('/alerts/active', async (req: Request, res: Response) => {
  try {
    const alerts = await DatabaseService.getActiveAlerts();
    
    res.json({
      success: true,
      data: alerts,
      count: alerts.length
    });
  } catch (error) {
    console.error('Error fetching active alerts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch active alerts',
      error: (error as Error)?.message || 'Unknown error'
    });
  }
});

export default router;
