"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertService, HealthCheckService, EnvironmentalDataService, ProjectService } from "@/lib/api-services"
import {
  TestTube,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Phone,
  MessageSquare,
  Zap,
  Database,
  Globe,
  Settings,
  Activity
} from "lucide-react"

interface TestResult {
  name: string
  status: 'pending' | 'success' | 'error'
  message: string
  timestamp?: string
}

export default function TestIntegrationPage() {
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [isRunningTests, setIsRunningTests] = useState(false)
  const [testPhone, setTestPhone] = useState("+1234567890")
  const [testMessage, setTestMessage] = useState("Test environmental alert")
  const [backendHealth, setBackendHealth] = useState<any>(null)

  const addTestResult = (result: TestResult) => {
    setTestResults(prev => [...prev, { ...result, timestamp: new Date().toISOString() }])
  }

  const clearResults = () => {
    setTestResults([])
    setBackendHealth(null)
  }

  const testBackendConnection = async () => {
    addTestResult({ name: "Backend Connection", status: "pending", message: "Testing backend health..." })
    
    try {
      const health = await HealthCheckService.checkBackendHealth()
      setBackendHealth(health)
      
      if (health.status === 'OK') {
        addTestResult({ 
          name: "Backend Connection", 
          status: "success", 
          message: `Backend is healthy: ${health.message}` 
        })
      } else {
        addTestResult({ 
          name: "Backend Connection", 
          status: "error", 
          message: `Backend error: ${health.message}` 
        })
      }
    } catch (error) {
      addTestResult({ 
        name: "Backend Connection", 
        status: "error", 
        message: `Failed to connect to backend: ${error}` 
      })
    }
  }

  const testSMSAlert = async () => {
    addTestResult({ name: "SMS Alert", status: "pending", message: "Sending test SMS..." })
    
    try {
      const result = await AlertService.sendTestAlert(testPhone)
      
      if (result.success) {
        addTestResult({ 
          name: "SMS Alert", 
          status: "success", 
          message: result.message || "SMS alert sent successfully" 
        })
      } else {
        addTestResult({ 
          name: "SMS Alert", 
          status: "error", 
          message: "SMS alert failed (likely Twilio not configured)" 
        })
      }
    } catch (error) {
      addTestResult({ 
        name: "SMS Alert", 
        status: "error", 
        message: `SMS alert failed: ${error}` 
      })
    }
  }

  const testEnvironmentalAlert = async () => {
    addTestResult({ name: "Environmental Alert", status: "pending", message: "Triggering environmental alert..." })
    
    try {
      const result = await AlertService.sendEnvironmentalAlert(
        "Test Environmental Alert",
        testMessage,
        "high",
        { lat: 40.7128, lng: -74.0060, name: "New York City" }
      )
      
      if (result.success) {
        addTestResult({ 
          name: "Environmental Alert", 
          status: "success", 
          message: `Alert sent to ${result.broadcast?.success || 0} recipients` 
        })
      } else {
        addTestResult({ 
          name: "Environmental Alert", 
          status: "error", 
          message: "Environmental alert failed" 
        })
      }
    } catch (error) {
      addTestResult({ 
        name: "Environmental Alert", 
        status: "error", 
        message: `Environmental alert failed: ${error}` 
      })
    }
  }

  const testFundingAlert = async () => {
    addTestResult({ name: "Funding Alert", status: "pending", message: "Triggering funding alert..." })
    
    try {
      const result = await AlertService.sendFundingAlert(
        "Test Funding Alert",
        "Test funding threshold reached for project",
        "medium",
        "test-project-123"
      )
      
      if (result.success) {
        addTestResult({ 
          name: "Funding Alert", 
          status: "success", 
          message: `Funding alert sent to ${result.broadcast?.success || 0} recipients` 
        })
      } else {
        addTestResult({ 
          name: "Funding Alert", 
          status: "error", 
          message: "Funding alert failed" 
        })
      }
    } catch (error) {
      addTestResult({ 
        name: "Funding Alert", 
        status: "error", 
        message: `Funding alert failed: ${error}` 
      })
    }
  }

  const testProjectAlert = async () => {
    addTestResult({ name: "Project Alert", status: "pending", message: "Triggering project alert..." })
    
    try {
      const result = await AlertService.sendProjectAlert(
        "Test Project Alert",
        "Test project milestone reached",
        "low",
        "test-project-456",
        { lat: 37.7749, lng: -122.4194, name: "San Francisco" }
      )
      
      if (result.success) {
        addTestResult({ 
          name: "Project Alert", 
          status: "success", 
          message: `Project alert sent to ${result.broadcast?.success || 0} recipients` 
        })
      } else {
        addTestResult({ 
          name: "Project Alert", 
          status: "error", 
          message: "Project alert failed" 
        })
      }
    } catch (error) {
      addTestResult({ 
        name: "Project Alert", 
        status: "error", 
        message: `Project alert failed: ${error}` 
      })
    }
  }

  const testSecurityAlert = async () => {
    addTestResult({ name: "Security Alert", status: "pending", message: "Triggering security alert..." })
    
    try {
      const result = await AlertService.sendSecurityAlert(
        "Test Security Alert",
        "Test security incident detected",
        "critical"
      )
      
      if (result.success) {
        addTestResult({ 
          name: "Security Alert", 
          status: "success", 
          message: `Security alert sent to ${result.broadcast?.success || 0} recipients` 
        })
      } else {
        addTestResult({ 
          name: "Security Alert", 
          status: "error", 
          message: "Security alert failed" 
        })
      }
    } catch (error) {
      addTestResult({ 
        name: "Security Alert", 
        status: "error", 
        message: `Security alert failed: ${error}` 
      })
    }
  }

  const testEnvironmentalData = async () => {
    addTestResult({ name: "Environmental Data", status: "pending", message: "Fetching environmental data..." })
    
    try {
      const result = await EnvironmentalDataService.getAllEnvironmentalData(40.7128, -74.0060)
      
      if (result) {
        addTestResult({ 
          name: "Environmental Data", 
          status: "success", 
          message: "Environmental data fetched successfully" 
        })
      } else {
        addTestResult({ 
          name: "Environmental Data", 
          status: "error", 
          message: "No environmental data received" 
        })
      }
    } catch (error) {
      addTestResult({ 
        name: "Environmental Data", 
        status: "error", 
        message: `Environmental data failed: ${error}` 
      })
    }
  }

  const testProjectAPI = async () => {
    addTestResult({ name: "Project API", status: "pending", message: "Testing project API..." })
    
    try {
      const result = await ProjectService.getAllProjects()
      
      if (result.success) {
        addTestResult({ 
          name: "Project API", 
          status: "success", 
          message: `Projects API working - ${result.projects?.length || 0} projects found` 
        })
      } else {
        addTestResult({ 
          name: "Project API", 
          status: "error", 
          message: "Project API failed" 
        })
      }
    } catch (error) {
      addTestResult({ 
        name: "Project API", 
        status: "error", 
        message: `Project API failed: ${error}` 
      })
    }
  }

  const testConditionBasedAlerts = async () => {
    addTestResult({ name: "Condition-Based Alerts", status: "pending", message: "Testing condition-based triggers..." })
    
    try {
      const conditions = {
        temperature: 42, // High temperature
        airQuality: 180, // Poor air quality
        deforestation: 25, // Significant deforestation
        funding: { remaining: 3000, projectId: "test-project-789" } // Low funding
      }
      
      const result = await AlertService.triggerConditionBasedAlerts(conditions)
      
      if (result.success) {
        addTestResult({ 
          name: "Condition-Based Alerts", 
          status: "success", 
          message: `${result.triggeredAlerts} alerts triggered based on conditions` 
        })
      } else {
        addTestResult({ 
          name: "Condition-Based Alerts", 
          status: "error", 
          message: "Condition-based alerts failed" 
        })
      }
    } catch (error) {
      addTestResult({ 
        name: "Condition-Based Alerts", 
        status: "error", 
        message: `Condition-based alerts failed: ${error}` 
      })
    }
  }

  const runAllTests = async () => {
    setIsRunningTests(true)
    clearResults()
    
    try {
      await testBackendConnection()
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      await testEnvironmentalData()
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      await testProjectAPI()
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      await testSMSAlert()
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      await testEnvironmentalAlert()
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      await testFundingAlert()
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      await testProjectAlert()
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      await testSecurityAlert()
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      await testConditionBasedAlerts()
    } finally {
      setIsRunningTests(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'error': return <XCircle className="w-4 h-4 text-red-500" />
      case 'pending': return <Activity className="w-4 h-4 text-yellow-500 animate-spin" />
      default: return <AlertTriangle className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-500/20 text-green-100 border-green-500/40'
      case 'error': return 'bg-red-500/20 text-red-100 border-red-500/40'
      case 'pending': return 'bg-yellow-500/20 text-yellow-100 border-yellow-500/40'
      default: return 'bg-gray-500/20 text-gray-100 border-gray-500/40'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0B3C5D]/40 to-black text-[#F6F6F6]">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <TestTube className="w-8 h-8 text-[#328CC1]" />
            <h1 className="text-3xl font-bold">Integration Testing Dashboard</h1>
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Test all API integrations, alert systems, and backend connections to ensure everything is working properly.
          </p>
        </div>

        <Tabs defaultValue="tests" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tests">Run Tests</TabsTrigger>
            <TabsTrigger value="results">Test Results</TabsTrigger>
            <TabsTrigger value="config">Configuration</TabsTrigger>
          </TabsList>

          <TabsContent value="tests" className="space-y-6">
            <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-[#328CC1]" />
                  Quick Tests
                </CardTitle>
                <CardDescription>Run individual tests to verify specific functionality</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button 
                    onClick={testBackendConnection}
                    className="bg-[#145214]/20 hover:bg-[#145214]/30 border border-[#145214]/40"
                    disabled={isRunningTests}
                  >
                    <Database className="w-4 h-4 mr-2" />
                    Backend
                  </Button>
                  <Button 
                    onClick={testSMSAlert}
                    className="bg-[#328CC1]/20 hover:bg-[#328CC1]/30 border border-[#328CC1]/40"
                    disabled={isRunningTests}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    SMS Alert
                  </Button>
                  <Button 
                    onClick={testEnvironmentalAlert}
                    className="bg-green-500/20 hover:bg-green-500/30 border border-green-500/40"
                    disabled={isRunningTests}
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    Environmental
                  </Button>
                  <Button 
                    onClick={testFundingAlert}
                    className="bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/40"
                    disabled={isRunningTests}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Funding
                  </Button>
                </div>
                
                <div className="flex justify-center pt-4">
                  <Button 
                    onClick={runAllTests}
                    disabled={isRunningTests}
                    size="lg"
                    className="bg-[#328CC1] hover:bg-[#328CC1]/80"
                  >
                    {isRunningTests ? (
                      <>
                        <Activity className="w-5 h-5 mr-2 animate-spin" />
                        Running Tests...
                      </>
                    ) : (
                      <>
                        <TestTube className="w-5 h-5 mr-2" />
                        Run All Tests
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results" className="space-y-6">
            <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                      Test Results
                    </CardTitle>
                    <CardDescription>
                      {testResults.length > 0 ? `${testResults.length} tests completed` : 'No tests run yet'}
                    </CardDescription>
                  </div>
                  <Button onClick={clearResults} variant="outline" size="sm">
                    Clear Results
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {backendHealth && (
                  <div className="mb-6 p-4 bg-black/60 rounded-lg">
                    <h4 className="font-semibold mb-2">Backend Health Status</h4>
                    <pre className="text-sm text-gray-300 overflow-x-auto">
                      {JSON.stringify(backendHealth, null, 2)}
                    </pre>
                  </div>
                )}
                
                <div className="space-y-3">
                  {testResults.length === 0 ? (
                    <p className="text-center text-gray-400 py-8">
                      No test results yet. Run some tests to see results here.
                    </p>
                  ) : (
                    testResults.map((result, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-black/30 rounded-lg">
                        {getStatusIcon(result.status)}
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold">{result.name}</h4>
                            <Badge className={getStatusColor(result.status)}>
                              {result.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-300 mt-1">{result.message}</p>
                          {result.timestamp && (
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(result.timestamp).toLocaleTimeString()}
                            </p>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="config" className="space-y-6">
            <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-[#328CC1]" />
                  Test Configuration
                </CardTitle>
                <CardDescription>Configure test parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Test Phone Number</label>
                  <Input
                    value={testPhone}
                    onChange={(e) => setTestPhone(e.target.value)}
                    placeholder="+1234567890"
                    className="bg-black/60 border-[#328CC1]/40"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Phone number to use for SMS/call alert testing
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Test Alert Message</label>
                  <Textarea
                    value={testMessage}
                    onChange={(e) => setTestMessage(e.target.value)}
                    placeholder="Enter test alert message"
                    className="bg-black/60 border-[#328CC1]/40"
                    rows={3}
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Message content for alert testing
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}