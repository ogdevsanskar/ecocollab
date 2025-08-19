import { Router, Request, Response } from 'express';
import { AlertService, AlertRecipient, AlertData } from '../services/alert-service';

const router = Router();

// Mock recipients for testing (in production, these would come from database)
const mockRecipients: AlertRecipient[] = [
  {
    name: 'Environmental Monitor',
    phone: '+1234567890',
    email: 'monitor@ecochain.org',
    alertTypes: ['environmental', 'project'],
    preferredMethod: 'both'
  },
  {
    name: 'Project Manager',
    phone: '+1234567891',
    email: 'pm@ecochain.org',
    alertTypes: ['project', 'funding'],
    preferredMethod: 'sms'
  },
  {
    name: 'Security Team',
    phone: '+1234567892',
    email: 'security@ecochain.org',
    alertTypes: ['security', 'funding'],
    preferredMethod: 'call'
  }
];

/**
 * POST /api/alerts/environmental
 * Trigger environmental alert
 */
router.post('/environmental', async (req: Request, res: Response) => {
  try {
    const { title, message, severity, location } = req.body;

    if (!title || !message || !severity) {
      return res.status(400).json({
        success: false,
        error: 'Title, message, and severity are required'
      });
    }

    const alert = AlertService.createEnvironmentalAlert(title, message, severity, location);
    
    // Filter recipients who want environmental alerts
    const environmentalRecipients = mockRecipients.filter(r => 
      r.alertTypes.includes('environmental')
    );

    const result = await AlertService.broadcastAlert(environmentalRecipients, alert);

    res.json({
      success: true,
      alert,
      broadcast: result,
      message: `Environmental alert sent to ${result.success}/${result.total} recipients`
    });
  } catch (error) {
    console.error('Environmental alert error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send environmental alert'
    });
  }
});

/**
 * POST /api/alerts/funding
 * Trigger funding alert
 */
router.post('/funding', async (req: Request, res: Response) => {
  try {
    const { title, message, severity, projectId } = req.body;

    if (!title || !message || !severity) {
      return res.status(400).json({
        success: false,
        error: 'Title, message, and severity are required'
      });
    }

    const alert = AlertService.createFundingAlert(title, message, severity, projectId);
    
    const fundingRecipients = mockRecipients.filter(r => 
      r.alertTypes.includes('funding')
    );

    const result = await AlertService.broadcastAlert(fundingRecipients, alert);

    res.json({
      success: true,
      alert,
      broadcast: result,
      message: `Funding alert sent to ${result.success}/${result.total} recipients`
    });
  } catch (error) {
    console.error('Funding alert error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send funding alert'
    });
  }
});

/**
 * POST /api/alerts/project
 * Trigger project alert
 */
router.post('/project', async (req: Request, res: Response) => {
  try {
    const { title, message, severity, projectId, location } = req.body;

    if (!title || !message || !severity) {
      return res.status(400).json({
        success: false,
        error: 'Title, message, and severity are required'
      });
    }

    const alert = AlertService.createProjectAlert(title, message, severity, projectId, location);
    
    const projectRecipients = mockRecipients.filter(r => 
      r.alertTypes.includes('project')
    );

    const result = await AlertService.broadcastAlert(projectRecipients, alert);

    res.json({
      success: true,
      alert,
      broadcast: result,
      message: `Project alert sent to ${result.success}/${result.total} recipients`
    });
  } catch (error) {
    console.error('Project alert error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send project alert'
    });
  }
});

/**
 * POST /api/alerts/security
 * Trigger security alert
 */
router.post('/security', async (req: Request, res: Response) => {
  try {
    const { title, message, severity } = req.body;

    if (!title || !message || !severity) {
      return res.status(400).json({
        success: false,
        error: 'Title, message, and severity are required'
      });
    }

    const alert = AlertService.createSecurityAlert(title, message, severity);
    
    const securityRecipients = mockRecipients.filter(r => 
      r.alertTypes.includes('security')
    );

    const result = await AlertService.broadcastAlert(securityRecipients, alert);

    res.json({
      success: true,
      alert,
      broadcast: result,
      message: `Security alert sent to ${result.success}/${result.total} recipients`
    });
  } catch (error) {
    console.error('Security alert error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send security alert'
    });
  }
});

/**
 * POST /api/alerts/test
 * Test alert system
 */
router.post('/test', async (req: Request, res: Response) => {
  try {
    const { phone, alertType = 'environmental' } = req.body;

    const testRecipient: AlertRecipient = {
      name: 'Test User',
      phone: phone || '+1234567890',
      alertTypes: ['environmental', 'funding', 'project', 'security'],
      preferredMethod: 'both'
    };

    const testAlert = AlertService.createEnvironmentalAlert(
      'Test Alert',
      'This is a test alert from EcoChain platform. If you received this, the alert system is working correctly.',
      'low'
    );

    const success = await AlertService.sendAlert(testRecipient, testAlert);

    res.json({
      success: true,
      testResult: success,
      message: success ? 'Test alert sent successfully' : 'Test alert failed (likely due to Twilio configuration)'
    });
  } catch (error) {
    console.error('Test alert error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send test alert'
    });
  }
});

/**
 * GET /api/alerts/recipients
 * Get current alert recipients (for testing)
 */
router.get('/recipients', (req: Request, res: Response) => {
  res.json({
    success: true,
    recipients: mockRecipients.map(r => ({
      name: r.name,
      phone: r.phone.replace(/\d{4}$/, 'XXXX'), // Mask phone numbers
      alertTypes: r.alertTypes,
      preferredMethod: r.preferredMethod
    }))
  });
});

/**
 * POST /api/alerts/trigger-conditions
 * Check and trigger alerts based on environmental conditions
 */
router.post('/trigger-conditions', async (req: Request, res: Response) => {
  try {
    const { temperature, airQuality, deforestation, funding } = req.body;

    const triggeredAlerts: AlertData[] = [];

    // Temperature threshold alerts
    if (temperature && temperature > 35) {
      const alert = AlertService.createEnvironmentalAlert(
        'High Temperature Alert',
        `Extreme temperature detected: ${temperature}°C. Monitor heat-related impacts on local ecosystems.`,
        temperature > 40 ? 'critical' : 'high'
      );
      triggeredAlerts.push(alert);
    }

    // Air quality alerts
    if (airQuality && airQuality > 150) {
      const alert = AlertService.createEnvironmentalAlert(
        'Air Quality Alert',
        `Poor air quality detected: AQI ${airQuality}. Recommend immediate action for sensitive groups.`,
        airQuality > 200 ? 'critical' : 'high'
      );
      triggeredAlerts.push(alert);
    }

    // Deforestation alerts
    if (deforestation && deforestation > 10) {
      const alert = AlertService.createEnvironmentalAlert(
        'Deforestation Alert',
        `Significant deforestation detected: ${deforestation} hectares lost. Immediate intervention required.`,
        deforestation > 50 ? 'critical' : 'high'
      );
      triggeredAlerts.push(alert);
    }

    // Funding threshold alerts
    if (funding && funding.remaining < 10000) {
      const alert = AlertService.createFundingAlert(
        'Low Funding Alert',
        `Project funding running low: $${funding.remaining} remaining for project ${funding.projectId}.`,
        funding.remaining < 5000 ? 'high' : 'medium',
        funding.projectId
      );
      triggeredAlerts.push(alert);
    }

    // Send all triggered alerts
    const results: { alert: string; result: { success: number; failed: number; total: number } }[] = [];
    for (const alert of triggeredAlerts) {
      const recipients = mockRecipients.filter(r => r.alertTypes.includes(alert.type));
      const result = await AlertService.broadcastAlert(recipients, alert);
      results.push({ alert: alert.title, result });
    }

    res.json({
      success: true,
      triggeredAlerts: triggeredAlerts.length,
      results,
      message: `${triggeredAlerts.length} alerts triggered based on conditions`
    });
  } catch (error) {
    console.error('Condition-based alert error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process condition-based alerts'
    });
  }
});

export default router;