import { Router, Request, Response } from 'express';
import { MonitoringService } from '../services/monitoring-service';

const router = Router();

/**
 * GET /api/monitoring/status
 * Get monitoring system status
 */
router.get('/status', (req: Request, res: Response) => {
  try {
    const status = MonitoringService.getStatus();
    
    res.json({
      success: true,
      status
    });
  } catch (error) {
    console.error('Get monitoring status error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get monitoring status'
    });
  }
});

/**
 * POST /api/monitoring/start
 * Start automated monitoring
 */
router.post('/start', (req: Request, res: Response) => {
  try {
    const { intervalMinutes = 30 } = req.body;
    
    MonitoringService.startMonitoring(intervalMinutes);
    
    res.json({
      success: true,
      message: `Automated monitoring started (checking every ${intervalMinutes} minutes)`,
      intervalMinutes
    });
  } catch (error) {
    console.error('Start monitoring error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to start monitoring'
    });
  }
});

/**
 * POST /api/monitoring/stop
 * Stop automated monitoring
 */
router.post('/stop', (req: Request, res: Response) => {
  try {
    MonitoringService.stopMonitoring();
    
    res.json({
      success: true,
      message: 'Automated monitoring stopped'
    });
  } catch (error) {
    console.error('Stop monitoring error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to stop monitoring'
    });
  }
});

/**
 * POST /api/monitoring/check
 * Trigger manual monitoring check
 */
router.post('/check', async (req: Request, res: Response) => {
  try {
    await MonitoringService.performMonitoringCheck();
    
    res.json({
      success: true,
      message: 'Manual monitoring check completed'
    });
  } catch (error) {
    console.error('Manual monitoring check error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to perform monitoring check'
    });
  }
});

/**
 * POST /api/monitoring/check-conditions
 * Trigger manual check for specific conditions
 */
router.post('/check-conditions', async (req: Request, res: Response) => {
  try {
    const conditions = req.body;
    
    const alertsTriggered = await MonitoringService.triggerManualCheck(conditions);
    
    res.json({
      success: true,
      alertsTriggered,
      message: `Manual condition check completed - ${alertsTriggered} alerts triggered`
    });
  } catch (error) {
    console.error('Manual condition check error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to perform condition check'
    });
  }
});

/**
 * PUT /api/monitoring/thresholds
 * Update monitoring thresholds
 */
router.put('/thresholds', (req: Request, res: Response) => {
  try {
    const newThresholds = req.body;
    
    MonitoringService.updateThresholds(newThresholds);
    
    res.json({
      success: true,
      message: 'Monitoring thresholds updated',
      thresholds: MonitoringService.getStatus().thresholds
    });
  } catch (error) {
    console.error('Update thresholds error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update thresholds'
    });
  }
});

/**
 * POST /api/monitoring/locations
 * Add monitoring location
 */
router.post('/locations', (req: Request, res: Response) => {
  try {
    const { name, lat, lng, enabled = true } = req.body;
    
    if (!name || lat === undefined || lng === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Name, lat, and lng are required'
      });
    }
    
    MonitoringService.addLocation({ name, lat, lng, enabled });
    
    res.json({
      success: true,
      message: `Monitoring location added: ${name}`,
      locations: MonitoringService.getStatus().locations
    });
  } catch (error) {
    console.error('Add monitoring location error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to add monitoring location'
    });
  }
});

/**
 * DELETE /api/monitoring/locations/:name
 * Remove monitoring location
 */
router.delete('/locations/:name', (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    
    MonitoringService.removeLocation(decodeURIComponent(name));
    
    res.json({
      success: true,
      message: `Monitoring location removed: ${name}`,
      locations: MonitoringService.getStatus().locations
    });
  } catch (error) {
    console.error('Remove monitoring location error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to remove monitoring location'
    });
  }
});

/**
 * GET /api/monitoring/locations
 * Get all monitoring locations
 */
router.get('/locations', (req: Request, res: Response) => {
  try {
    const { locations } = MonitoringService.getStatus();
    
    res.json({
      success: true,
      locations
    });
  } catch (error) {
    console.error('Get monitoring locations error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get monitoring locations'
    });
  }
});

/**
 * GET /api/monitoring/thresholds
 * Get monitoring thresholds
 */
router.get('/thresholds', (req: Request, res: Response) => {
  try {
    const { thresholds } = MonitoringService.getStatus();
    
    res.json({
      success: true,
      thresholds
    });
  } catch (error) {
    console.error('Get monitoring thresholds error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get monitoring thresholds'
    });
  }
});

export default router;