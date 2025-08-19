import { Router, Request, Response } from 'express';
import { AlertService } from '../services/alert-service';

const router = Router();

// Mock project data (in production, this would come from database)
const mockProjects = [
  {
    id: 1,
    title: "Amazon Rainforest Restoration",
    description: "Large-scale reforestation project in the Brazilian Amazon",
    category: "Reforestation",
    location: "Amazon Basin, Brazil",
    funded: "$125,000",
    goal: "$200,000",
    progress: 62,
    urgency: "High",
    status: "Active",
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: "Ocean Plastic Cleanup",
    description: "Removing plastic waste from Pacific Ocean gyres",
    category: "Ocean Cleanup",
    location: "Pacific Ocean",
    funded: "$89,000",
    goal: "$150,000",
    progress: 59,
    urgency: "Critical",
    status: "Active",
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    title: "Solar Energy for Rural Communities",
    description: "Installing solar panels in remote villages",
    category: "Renewable Energy",
    location: "Kenya",
    funded: "$45,000",
    goal: "$75,000",
    progress: 60,
    urgency: "Medium",
    status: "Active",
    createdAt: new Date().toISOString()
  }
];

/**
 * GET /api/projects
 * Get all projects
 */
router.get('/', (req: Request, res: Response) => {
  try {
    const { category, status, limit } = req.query;
    
    let filteredProjects = [...mockProjects];
    
    if (category && category !== 'all') {
      filteredProjects = filteredProjects.filter(p => 
        p.category.toLowerCase().includes(category.toString().toLowerCase())
      );
    }
    
    if (status && status !== 'all') {
      filteredProjects = filteredProjects.filter(p => 
        p.status.toLowerCase() === status.toString().toLowerCase()
      );
    }
    
    if (limit) {
      filteredProjects = filteredProjects.slice(0, parseInt(limit.toString()));
    }
    
    res.json({
      success: true,
      projects: filteredProjects,
      total: filteredProjects.length
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch projects'
    });
  }
});

/**
 * GET /api/projects/:id
 * Get specific project
 */
router.get('/:id', (req: Request, res: Response) => {
  try {
    const projectId = parseInt(req.params.id);
    const project = mockProjects.find(p => p.id === projectId);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }
    
    res.json({
      success: true,
      project
    });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch project'
    });
  }
});

/**
 * POST /api/projects
 * Create new project
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, description, category, location, goal, urgency } = req.body;
    
    if (!title || !description || !category || !location || !goal) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: title, description, category, location, goal'
      });
    }
    
    const newProject = {
      id: mockProjects.length + 1,
      title,
      description,
      category,
      location,
      funded: "$0",
      goal: `$${goal}`,
      progress: 0,
      urgency: urgency || "Medium",
      status: "Active",
      createdAt: new Date().toISOString()
    };
    
    mockProjects.push(newProject);
    
    // Trigger project creation alert
    try {
      await AlertService.sendProjectAlert(
        "New Project Created",
        `Project "${title}" has been created in ${category} category. Location: ${location}. Funding goal: $${goal}.`,
        urgency === "Critical" ? "high" : urgency === "High" ? "medium" : "low",
        newProject.id.toString()
      );
    } catch (alertError) {
      console.error('Failed to send project creation alert:', alertError);
    }
    
    res.status(201).json({
      success: true,
      project: newProject,
      message: 'Project created successfully and stakeholders notified'
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create project'
    });
  }
});

/**
 * POST /api/projects/:id/fund
 * Fund a project
 */
router.post('/:id/fund', async (req: Request, res: Response) => {
  try {
    const projectId = parseInt(req.params.id);
    const { amount, walletAddress } = req.body;
    
    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Valid funding amount is required'
      });
    }
    
    const project = mockProjects.find(p => p.id === projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }
    
    // Simulate funding transaction
    const currentFunded = parseInt(project.funded.replace(/[$,]/g, ''));
    const newFunded = currentFunded + amount;
    const goal = parseInt(project.goal.replace(/[$,]/g, ''));
    
    project.funded = `$${newFunded.toLocaleString()}`;
    project.progress = Math.min(Math.round((newFunded / goal) * 100), 100);
    
    // Trigger funding alert
    try {
      await AlertService.sendFundingAlert(
        "Project Funding Received",
        `Project "${project.title}" received $${amount} funding. Total funded: ${project.funded}. Progress: ${project.progress}%.`,
        "medium",
        projectId.toString()
      );
    } catch (alertError) {
      console.error('Failed to send funding alert:', alertError);
    }
    
    res.json({
      success: true,
      transaction: {
        projectId,
        amount,
        walletAddress,
        timestamp: new Date().toISOString()
      },
      project,
      message: 'Funding successful and stakeholders notified'
    });
  } catch (error) {
    console.error('Fund project error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process funding'
    });
  }
});

/**
 * PUT /api/projects/:id
 * Update project
 */
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const projectId = parseInt(req.params.id);
    const updates = req.body;
    
    const projectIndex = mockProjects.findIndex(p => p.id === projectId);
    if (projectIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }
    
    // Update project
    mockProjects[projectIndex] = { ...mockProjects[projectIndex], ...updates };
    
    // Trigger update alert if status changed
    if (updates.status) {
      try {
        await AlertService.sendProjectAlert(
          "Project Status Updated",
          `Project "${mockProjects[projectIndex].title}" status changed to: ${updates.status}.`,
          "low",
          projectId.toString()
        );
      } catch (alertError) {
        console.error('Failed to send update alert:', alertError);
      }
    }
    
    res.json({
      success: true,
      project: mockProjects[projectIndex],
      message: 'Project updated successfully'
    });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update project'
    });
  }
});

/**
 * DELETE /api/projects/:id
 * Delete project (admin only)
 */
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const projectId = parseInt(req.params.id);
    
    const projectIndex = mockProjects.findIndex(p => p.id === projectId);
    if (projectIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }
    
    const deletedProject = mockProjects.splice(projectIndex, 1)[0];
    
    // Trigger deletion alert
    try {
      await AlertService.sendProjectAlert(
        "Project Deleted",
        `Project "${deletedProject.title}" has been removed from the platform.`,
        "medium",
        projectId.toString()
      );
    } catch (alertError) {
      console.error('Failed to send deletion alert:', alertError);
    }
    
    res.json({
      success: true,
      message: 'Project deleted successfully',
      deletedProject
    });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete project'
    });
  }
});

/**
 * GET /api/projects/:id/stats
 * Get project statistics
 */
router.get('/:id/stats', (req: Request, res: Response) => {
  try {
    const projectId = parseInt(req.params.id);
    const project = mockProjects.find(p => p.id === projectId);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }
    
    // Mock statistics
    const stats = {
      totalContributors: Math.floor(Math.random() * 100) + 10,
      averageDonation: Math.floor(Math.random() * 500) + 50,
      daysActive: Math.floor((new Date().getTime() - new Date(project.createdAt).getTime()) / (1000 * 60 * 60 * 24)),
      impactMetrics: {
        treesPlanted: project.category === "Reforestation" ? Math.floor(Math.random() * 1000) + 100 : 0,
        plasticRemoved: project.category === "Ocean Cleanup" ? Math.floor(Math.random() * 500) + 50 : 0,
        energyGenerated: project.category === "Renewable Energy" ? Math.floor(Math.random() * 10000) + 1000 : 0
      }
    };
    
    res.json({
      success: true,
      projectId,
      stats
    });
  } catch (error) {
    console.error('Get project stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch project statistics'
    });
  }
});

export default router;