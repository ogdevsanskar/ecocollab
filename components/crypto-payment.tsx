'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi'
import { parseEther, formatEther } from 'viem'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  DollarSign, 
  Loader2, 
  CheckCircle, 
  AlertTriangle, 
  ExternalLink,
  Heart,
  TreePine,
  Waves,
  Zap
} from 'lucide-react'
import { CONTRACT_ADDRESSES, SUPPORTED_TOKENS } from '@/lib/web3-config'

interface CryptoPaymentProps {
  projectId: number
  projectTitle: string
  projectGoal: string
  projectFunded: string
  projectProgress: number
  projectCategory: string
  onPaymentSuccess?: (txHash: string, amount: string) => void
}

const CLIMATE_PROJECT_FUNDING_ABI = [
  {
    name: 'fundProjectWithETH',
    type: 'function',
    stateMutability: 'payable',
    inputs: [
      { name: '_projectId', type: 'uint256' },
      { name: '_message', type: 'string' }
    ],
    outputs: []
  },
  {
    name: 'getProject',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: '_projectId', type: 'uint256' }],
    outputs: [
      {
        type: 'tuple',
        components: [
          { name: 'id', type: 'uint256' },
          { name: 'title', type: 'string' },
          { name: 'description', type: 'string' },
          { name: 'creator', type: 'address' },
          { name: 'goalAmount', type: 'uint256' },
          { name: 'currentAmount', type: 'uint256' },
          { name: 'deadline', type: 'uint256' },
          { name: 'completed', type: 'bool' },
          { name: 'approved', type: 'bool' },
          { name: 'category', type: 'string' },
          { name: 'location', type: 'string' },
          { name: 'createdAt', type: 'uint256' }
        ]
      }
    ]
  }
] as const

export function CryptoPayment({
  projectId,
  projectTitle,
  projectGoal,
  projectFunded,
  projectProgress,
  projectCategory,
  onPaymentSuccess
}: CryptoPaymentProps) {
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState('')
  const [selectedToken, setSelectedToken] = useState('ETH')
  const [isProcessing, setIsProcessing] = useState(false)

  const { address, isConnected, chainId } = useAccount()
  
  const contractAddress = chainId ? CONTRACT_ADDRESSES[chainId]?.PROJECT_FUNDING : undefined

  const { writeContract, data: hash, error, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  // Read project data from contract
  const { data: projectData } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: CLIMATE_PROJECT_FUNDING_ABI,
    functionName: 'getProject',
    args: [BigInt(projectId)],
    query: {
      enabled: !!contractAddress && !!projectId
    }
  })

  const handlePayment = async () => {
    if (!isConnected || !contractAddress || !amount) return

    try {
      setIsProcessing(true)
      
      const amountInWei = parseEther(amount)
      
      if (selectedToken === 'ETH') {
        writeContract({
          address: contractAddress as `0x${string}`,
          abi: CLIMATE_PROJECT_FUNDING_ABI,
          functionName: 'fundProjectWithETH',
          args: [BigInt(projectId), message || `Supporting ${projectTitle}`],
          value: amountInWei,
        })
      }
      // TODO: Add ERC20 token support
      
    } catch (err) {
      console.error('Payment error:', err)
    } finally {
      setIsProcessing(false)
    }
  }

  const getExplorerUrl = () => {
    if (chainId === 1) return `https://etherscan.io/tx/${hash}`
    if (chainId === 11155111) return `https://sepolia.etherscan.io/tx/${hash}`
    if (chainId === 137) return `https://polygonscan.com/tx/${hash}`
    if (chainId === 80001) return `https://mumbai.polygonscan.com/tx/${hash}`
    return '#'
  }

  const getCategoryIcon = () => {
    switch (projectCategory.toLowerCase()) {
      case 'reforestation':
      case 'forest':
        return <TreePine className="w-5 h-5" />
      case 'ocean cleanup':
      case 'ocean':
        return <Waves className="w-5 h-5" />
      case 'renewable energy':
      case 'energy':
        return <Zap className="w-5 h-5" />
      default:
        return <Heart className="w-5 h-5" />
    }
  }

  if (isConfirmed && onPaymentSuccess) {
    onPaymentSuccess(hash!, amount)
  }

  return (
    <Card className="bg-black/60 border-[#328CC1]/20 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center text-white">
          <DollarSign className="w-5 h-5 mr-2 text-[#328CC1]" />
          Fund with Cryptocurrency
        </CardTitle>
        <CardDescription className="text-gray-300">
          Support {projectTitle} with crypto payments
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Project Info */}
        <div className="bg-black/40 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              {getCategoryIcon()}
              <span className="font-medium text-white">{projectTitle}</span>
            </div>
            <Badge className="bg-[#145214]/20 text-[#145214] border-[#145214]/40">
              {projectCategory}
            </Badge>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Funded</span>
              <span className="text-white">{projectFunded}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Goal</span>
              <span className="text-white">{projectGoal}</span>
            </div>
            <Progress value={projectProgress} className="h-2 bg-gray-700" />
            <div className="text-center text-xs text-gray-400">
              {projectProgress}% Complete
            </div>
          </div>
        </div>

        {!isConnected ? (
          <Alert className="bg-yellow-500/20 border-yellow-500/40">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-yellow-200">
              Please connect your wallet to make a payment
            </AlertDescription>
          </Alert>
        ) : (
          <>
            {/* Token Selection */}
            <div className="space-y-2">
              <Label className="text-white">Payment Token</Label>
              <Select value={selectedToken} onValueChange={setSelectedToken}>
                <SelectTrigger className="bg-black/60 border-[#328CC1]/40 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-[#328CC1]/40">
                  {Object.entries(SUPPORTED_TOKENS).map(([key, token]) => (
                    <SelectItem key={key} value={key} className="text-white hover:bg-[#328CC1]/20">
                      <div className="flex items-center space-x-2">
                        <span>{token.symbol}</span>
                        <span className="text-gray-400 text-sm">({token.name})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Amount Input */}
            <div className="space-y-2">
              <Label className="text-white">Amount ({selectedToken})</Label>
              <Input
                type="number"
                step="0.001"
                placeholder="0.1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-black/60 border-[#328CC1]/40 text-white placeholder-gray-400"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>Minimum: 0.001 {selectedToken}</span>
                <span>≈ ${(parseFloat(amount || '0') * 2000).toFixed(2)} USD</span>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label className="text-white">Message (Optional)</Label>
              <Textarea
                placeholder="Leave a message for the project creators..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-black/60 border-[#328CC1]/40 text-white placeholder-gray-400"
                rows={3}
              />
            </div>

            {/* Payment Button */}
            <Button
              onClick={handlePayment}
              disabled={!amount || isProcessing || isPending || isConfirming}
              className="w-full bg-gradient-to-r from-[#328CC1] to-[#145214] hover:from-[#328CC1]/80 hover:to-[#145214]/80 text-white font-semibold py-3"
            >
              {isProcessing || isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Preparing Transaction...
                </>
              ) : isConfirming ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Confirming Payment...
                </>
              ) : isConfirmed ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Payment Confirmed!
                </>
              ) : (
                <>
                  <DollarSign className="w-4 h-4 mr-2" />
                  Fund Project with {amount || '0'} {selectedToken}
                </>
              )}
            </Button>

            {/* Transaction Status */}
            {error && (
              <Alert className="bg-red-500/20 border-red-500/40">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-red-200">
                  Transaction failed: {error.message}
                </AlertDescription>
              </Alert>
            )}

            {hash && (
              <Alert className="bg-blue-500/20 border-blue-500/40">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription className="text-blue-200">
                  <div className="flex items-center justify-between">
                    <span>Transaction submitted!</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(getExplorerUrl(), '_blank')}
                      className="text-blue-200 hover:text-white"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      View
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {isConfirmed && (
              <Alert className="bg-green-500/20 border-green-500/40">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription className="text-green-200">
                  Payment successful! Thank you for supporting {projectTitle}.
                </AlertDescription>
              </Alert>
            )}

            {/* Quick Amount Buttons */}
            <div className="grid grid-cols-4 gap-2">
              {['0.01', '0.1', '0.5', '1.0'].map((quickAmount) => (
                <Button
                  key={quickAmount}
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(quickAmount)}
                  className="bg-black/60 border-[#328CC1]/40 hover:bg-[#328CC1]/20 text-white"
                >
                  {quickAmount} {selectedToken}
                </Button>
              ))}
            </div>
          </>
        )}

        {/* Contract Info */}
        {contractAddress && (
          <div className="text-xs text-gray-400 space-y-1">
            <div>Contract: {contractAddress.slice(0, 6)}...{contractAddress.slice(-4)}</div>
            <div>Network: {chainId === 1 ? 'Ethereum' : chainId === 137 ? 'Polygon' : 'Testnet'}</div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}