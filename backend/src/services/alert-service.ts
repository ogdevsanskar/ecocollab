import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

// Twilio configuration
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

let twilioClient: twilio.Twilio | null = null;

// Initialize Twilio client if credentials are available
if (accountSid && authToken) {
  twilioClient = twilio(accountSid, authToken);
  console.log('✅ Twilio client initialized successfully');
} else {
  console.log('⚠️ Twilio credentials not found - SMS/Call alerts disabled');
}

export interface AlertData {
  type: 'environmental' | 'funding' | 'project' | 'security';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  location?: {
    lat: number;
    lng: number;
    name?: string;
  };
  projectId?: string;
  timestamp: string;
}

export interface AlertRecipient {
  name: string;
  phone: string;
  email?: string;
  alertTypes: string[];
  preferredMethod: 'sms' | 'call' | 'both';
}

export class AlertService {
  /**
   * Send SMS alert to recipient
   */
  static async sendSMS(recipient: AlertRecipient, alert: AlertData): Promise<boolean> {
    if (!twilioClient || !twilioPhoneNumber) {
      console.log('⚠️ Twilio not configured - SMS alert simulation for:', recipient.phone);
      return false;
    }

    try {
      const smsBody = this.formatSMSMessage(alert);
      
      const message = await twilioClient.messages.create({
        body: smsBody,
        from: twilioPhoneNumber,
        to: recipient.phone
      });

      console.log(`✅ SMS sent to ${recipient.phone}: ${message.sid}`);
      return true;
    } catch (error) {
      console.error('❌ SMS sending failed:', error);
      return false;
    }
  }

  /**
   * Make voice call alert to recipient
   */
  static async makeCall(recipient: AlertRecipient, alert: AlertData): Promise<boolean> {
    if (!twilioClient || !twilioPhoneNumber) {
      console.log('⚠️ Twilio not configured - Call alert simulation for:', recipient.phone);
      return false;
    }

    try {
      const twimlUrl = this.generateTwiMLUrl(alert);
      
      const call = await twilioClient.calls.create({
        twiml: this.generateTwiML(alert),
        to: recipient.phone,
        from: twilioPhoneNumber
      });

      console.log(`✅ Call initiated to ${recipient.phone}: ${call.sid}`);
      return true;
    } catch (error) {
      console.error('❌ Call initiation failed:', error);
      return false;
    }
  }

  /**
   * Send alert based on recipient preferences
   */
  static async sendAlert(recipient: AlertRecipient, alert: AlertData): Promise<boolean> {
    // Check if recipient wants this type of alert
    if (!recipient.alertTypes.includes(alert.type)) {
      console.log(`🔕 Recipient ${recipient.name} opted out of ${alert.type} alerts`);
      return false;
    }

    let success = false;

    switch (recipient.preferredMethod) {
      case 'sms':
        success = await this.sendSMS(recipient, alert);
        break;
      case 'call':
        success = await this.makeCall(recipient, alert);
        break;
      case 'both':
        const smsSuccess = await this.sendSMS(recipient, alert);
        const callSuccess = await this.makeCall(recipient, alert);
        success = smsSuccess || callSuccess;
        break;
    }

    return success;
  }

  /**
   * Send alert to multiple recipients
   */
  static async broadcastAlert(recipients: AlertRecipient[], alert: AlertData): Promise<{
    success: number;
    failed: number;
    total: number;
  }> {
    let success = 0;
    let failed = 0;

    const promises = recipients.map(async (recipient) => {
      try {
        const result = await this.sendAlert(recipient, alert);
        if (result) success++;
        else failed++;
      } catch (error) {
        console.error(`❌ Failed to send alert to ${recipient.name}:`, error);
        failed++;
      }
    });

    await Promise.all(promises);

    console.log(`📊 Alert broadcast complete: ${success} sent, ${failed} failed`);
    
    return {
      success,
      failed,
      total: recipients.length
    };
  }

  /**
   * Format SMS message for alerts
   */
  private static formatSMSMessage(alert: AlertData): string {
    const severityEmoji = {
      low: '🔵',
      medium: '🟡',
      high: '🟠',
      critical: '🔴'
    };

    const typeEmoji = {
      environmental: '🌍',
      funding: '💰',
      project: '🏗️',
      security: '🔒'
    };

    let message = `${severityEmoji[alert.severity]} ${typeEmoji[alert.type]} EcoChain Alert\n\n`;
    message += `${alert.title}\n\n`;
    message += `${alert.message}\n\n`;
    
    if (alert.location) {
      message += `📍 Location: ${alert.location.name || 'Unknown'}\n`;
    }
    
    if (alert.projectId) {
      message += `🏗️ Project: ${alert.projectId}\n`;
    }
    
    message += `⏰ ${new Date(alert.timestamp).toLocaleString()}\n\n`;
    message += `Reply STOP to unsubscribe`;

    return message;
  }

  /**
   * Generate TwiML for voice calls
   */
  private static generateTwiML(alert: AlertData): string {
    const message = `Hello, this is an EcoChain ${alert.severity} alert. ${alert.title}. ${alert.message}. Please check your dashboard for more details. Thank you.`;
    
    return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="alice" rate="medium" pitch="medium">${message}</Say>
  <Pause length="2"/>
  <Say voice="alice">This message will repeat once more.</Say>
  <Pause length="1"/>
  <Say voice="alice" rate="slow">${message}</Say>
</Response>`;
  }

  /**
   * Generate TwiML URL (for webhook-based calls)
   */
  private static generateTwiMLUrl(alert: AlertData): string {
    // In production, this would be a webhook endpoint that generates TwiML
    return `https://your-domain.com/api/twiml?alertId=${alert.timestamp}`;
  }

  /**
   * Send environmental alert
   */
  static async sendEnvironmentalAlert(
    title: string,
    message: string,
    severity: 'low' | 'medium' | 'high' | 'critical',
    location?: { lat: number; lng: number; name?: string }
  ): Promise<{ success: boolean; broadcast?: { success: number; failed: number; total: number } }> {
    const alert = this.createEnvironmentalAlert(title, message, severity, location);
    const recipients = [
      {
        name: 'Environmental Monitor',
        phone: '+1234567890',
        email: 'monitor@ecochain.org',
        alertTypes: ['environmental', 'project'],
        preferredMethod: 'both' as const
      }
    ];
    
    const broadcast = await this.broadcastAlert(recipients, alert);
    return { success: true, broadcast };
  }

  /**
   * Send funding alert
   */
  static async sendFundingAlert(
    title: string,
    message: string,
    severity: 'low' | 'medium' | 'high' | 'critical',
    projectId?: string
  ): Promise<{ success: boolean; broadcast?: { success: number; failed: number; total: number } }> {
    const alert = this.createFundingAlert(title, message, severity, projectId);
    const recipients = [
      {
        name: 'Project Manager',
        phone: '+1234567891',
        email: 'pm@ecochain.org',
        alertTypes: ['project', 'funding'],
        preferredMethod: 'sms' as const
      }
    ];
    
    const broadcast = await this.broadcastAlert(recipients, alert);
    return { success: true, broadcast };
  }

  /**
   * Send project alert
   */
  static async sendProjectAlert(
    title: string,
    message: string,
    severity: 'low' | 'medium' | 'high' | 'critical',
    projectId?: string,
    location?: { lat: number; lng: number; name?: string }
  ): Promise<{ success: boolean; broadcast?: { success: number; failed: number; total: number } }> {
    const alert = this.createProjectAlert(title, message, severity, projectId, location);
    const recipients = [
      {
        name: 'Project Manager',
        phone: '+1234567891',
        email: 'pm@ecochain.org',
        alertTypes: ['project', 'funding'],
        preferredMethod: 'sms' as const
      }
    ];
    
    const broadcast = await this.broadcastAlert(recipients, alert);
    return { success: true, broadcast };
  }

  /**
   * Send security alert
   */
  static async sendSecurityAlert(
    title: string,
    message: string,
    severity: 'low' | 'medium' | 'high' | 'critical'
  ): Promise<{ success: boolean; broadcast?: { success: number; failed: number; total: number } }> {
    const alert = this.createSecurityAlert(title, message, severity);
    const recipients = [
      {
        name: 'Security Team',
        phone: '+1234567892',
        email: 'security@ecochain.org',
        alertTypes: ['security', 'funding'],
        preferredMethod: 'call' as const
      }
    ];
    
    const broadcast = await this.broadcastAlert(recipients, alert);
    return { success: true, broadcast };
  }

  /**
   * Create environmental alert
   */
  static createEnvironmentalAlert(
    title: string,
    message: string,
    severity: 'low' | 'medium' | 'high' | 'critical',
    location?: { lat: number; lng: number; name?: string }
  ): AlertData {
    return {
      type: 'environmental',
      severity,
      title,
      message,
      location,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Create funding alert
   */
  static createFundingAlert(
    title: string,
    message: string,
    severity: 'low' | 'medium' | 'high' | 'critical',
    projectId?: string
  ): AlertData {
    return {
      type: 'funding',
      severity,
      title,
      message,
      projectId,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Create project alert
   */
  static createProjectAlert(
    title: string,
    message: string,
    severity: 'low' | 'medium' | 'high' | 'critical',
    projectId?: string,
    location?: { lat: number; lng: number; name?: string }
  ): AlertData {
    return {
      type: 'project',
      severity,
      title,
      message,
      projectId,
      location,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Create security alert
   */
  static createSecurityAlert(
    title: string,
    message: string,
    severity: 'low' | 'medium' | 'high' | 'critical'
  ): AlertData {
    return {
      type: 'security',
      severity,
      title,
      message,
      timestamp: new Date().toISOString()
    };
  }
}

export default AlertService;