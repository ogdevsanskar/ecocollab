import { Router, Request, Response } from 'express';
import { WorkingAPIServices } from '../services/working-api-services';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        response: 'Message is required'
      });
    }

    try {
      // Use the working MispLE AI API via OpenRouter
      const aiResponse = await WorkingAPIServices.generateAIResponse(message, history || []);
      
      return res.json({ 
        success: true,
        response: aiResponse 
      });
    } catch (aiError) {
      console.error('AI API Error:', aiError);
      
      // Fallback response system
      const fallbackResponse = "I'm here to help with climate data, environmental projects, and sustainability insights. Could you please rephrase your question?";
      
      return res.json({
        success: true,
        response: fallbackResponse,
        fallback: true
      });
    }
  } catch (error) {
    console.error('AI Chat Route Error:', error);
    return res.status(500).json({
      success: false,
      response: 'I apologize, but I\'m experiencing technical difficulties. Please try again in a moment.'
    });
  }
});

export default router;
