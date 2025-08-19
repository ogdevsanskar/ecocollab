'use client'

import { useState, useEffect } from 'react'
import { useAccount, useConnect, useDisconnect, useBalance, useChainId, useSwitchChain } from 'wagmi'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Wallet, ChevronDown, Copy, ExternalLink, AlertTriangle, CheckCircle, Zap } from 'lucide-react'
import { formatEther } from 'viem'
import { CHAIN_CONFIG, SUPPORTED_TOKENS } from '@/lib/web3-config'

interface WalletConnectorProps {
  onConnect?: (address: string, chainId: number) => void
  onDisconnect?: () => void
  showBalance?: boolean
  showChainInfo?: boolean
  compact?: boolean
}

export function WalletConnector({ 
  onConnect, 
  onDisconnect, 
  showBalance = true, 
  showChainInfo = true,
  compact = false 
}: WalletConnectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  
  const { address, isConnected, isConnecting } = useAccount()
  const { connect, connectors, isPending, error } = useConnect()
  const { disconnect } = useDisconnect()
  const { data: balance } = useBalance({ address })
  const chainId = useChainId()
  const { switchChain } = useSwitchChain()

  const currentChain = CHAIN_CONFIG[chainId]
  const isTestnet = chainId === 11155111 || chainId === 80001 // Sepolia or Mumbai

  useEffect(() => {
    if (isConnected && address && onConnect) {
      onConnect(address, chainId)
    }
  }, [isConnected, address, chainId, onConnect])

  const handleDisconnect = () => {
    disconnect()
    if (onDisconnect) {
      onDisconnect()
    }
    setIsOpen(false)
  }

  const handleConnect = (connector: any) => {
    connect({ connector })
    setIsOpen(false)
  }

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const getExplorerUrl = () => {
    if (currentChain && address) {
      return `${currentChain.explorerUrl}/address/${address}`
    }
    return '#'
  }

  if (!isConnected) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button 
            disabled={isConnecting} 
            className={`${compact ? 'px-4 py-2' : 'px-6 py-3'} bg-gradient-to-r from-[#328CC1] to-[#145214] hover:from-[#328CC1]/80 hover:to-[#145214]/80 text-white font-semibold`}
          >
            <Wallet className="w-4 h-4 mr-2" />
            {isConnecting ? 'Connecting...' : 'Connect Wallet'}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md bg-black/90 border-[#328CC1]/20 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Wallet className="w-5 h-5 mr-2 text-[#328CC1]" />
              Connect Your Wallet
            </DialogTitle>
            <DialogDescription className="text-gray-300">
              Choose a wallet to connect to the EcoChain platform
            </DialogDescription>
          </DialogHeader>
          
          {error && (
            <Alert className="bg-red-500/20 border-red-500/40">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-red-200">
                {error.message}
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-3">
            {connectors.map((connector) => (
              <Button
                key={connector.uid}
                onClick={() => handleConnect(connector)}
                disabled={isPending}
                variant="outline"
                className="w-full justify-start bg-black/60 border-[#328CC1]/40 hover:bg-[#328CC1]/20 text-white"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#328CC1] to-[#145214] rounded-full flex items-center justify-center mr-3">
                    <Wallet className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">{connector.name}</div>
                    <div className="text-xs text-gray-400">
                      {connector.name === 'MetaMask' && 'Browser extension'}
                      {connector.name === 'WalletConnect' && 'Mobile & desktop wallets'}
                      {connector.name === 'Coinbase Wallet' && 'Coinbase ecosystem'}
                    </div>
                  </div>
                </div>
              </Button>
            ))}
          </div>

          <div className="text-xs text-gray-400 text-center mt-4">
            By connecting a wallet, you agree to our Terms of Service
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  if (compact) {
    return (
      <div className="flex items-center space-x-2">
        <Badge className="bg-green-500/20 text-green-100 border-green-500/40">
          <CheckCircle className="w-3 h-3 mr-1" />
          Connected
        </Badge>
        <Button
          variant="outline"
          size="sm"
          onClick={copyAddress}
          className="bg-black/60 border-[#328CC1]/40 hover:bg-[#328CC1]/20 text-white"
        >
          {copied ? 'Copied!' : formatAddress(address)}
        </Button>
      </div>
    )
  }

  return (
    <Card className="bg-black/60 border-[#328CC1]/20 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-[#328CC1] to-[#145214] rounded-full flex items-center justify-center">
              <Wallet className="w-4 h-4 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg text-white">Wallet Connected</CardTitle>
              {showChainInfo && currentChain && (
                <CardDescription className="text-gray-300">
                  {currentChain.name}
                  {isTestnet && (
                    <Badge className="ml-2 bg-yellow-500/20 text-yellow-100 border-yellow-500/40">
                      Testnet
                    </Badge>
                  )}
                </CardDescription>
              )}
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDisconnect}
            className="bg-red-500/20 border-red-500/40 hover:bg-red-500/30 text-red-200"
          >
            Disconnect
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Address */}
        <div className="flex items-center justify-between bg-black/40 rounded-lg p-3">
          <div>
            <div className="text-xs text-gray-400 uppercase tracking-wide">Address</div>
            <div className="text-white font-mono">{formatAddress(address)}</div>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={copyAddress}
              className="text-gray-400 hover:text-white"
            >
              <Copy className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open(getExplorerUrl(), '_blank')}
              className="text-gray-400 hover:text-white"
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Balance */}
        {showBalance && balance && (
          <div className="bg-black/40 rounded-lg p-3">
            <div className="text-xs text-gray-400 uppercase tracking-wide">Balance</div>
            <div className="text-white text-lg font-semibold">
              {parseFloat(formatEther(balance.value)).toFixed(4)} {balance.symbol}
            </div>
            <div className="text-xs text-gray-400">
              ≈ ${(parseFloat(formatEther(balance.value)) * 2000).toFixed(2)} USD
            </div>
          </div>
        )}

        {/* Supported Tokens */}
        <div className="bg-black/40 rounded-lg p-3">
          <div className="text-xs text-gray-400 uppercase tracking-wide mb-2">Supported Tokens</div>
          <div className="flex flex-wrap gap-2">
            {Object.values(SUPPORTED_TOKENS).map((token) => (
              <Badge 
                key={token.symbol}
                className="bg-[#328CC1]/20 text-[#328CC1] border-[#328CC1]/40"
              >
                {token.symbol}
              </Badge>
            ))}
          </div>
        </div>

        {/* Network Actions */}
        {showChainInfo && (
          <div className="flex space-x-2">
            {chainId !== 1 && (
              <Button
                onClick={() => switchChain({ chainId: 1 })}
                size="sm"
                variant="outline"
                className="bg-blue-500/20 border-blue-500/40 hover:bg-blue-500/30 text-blue-200"
              >
                <Zap className="w-3 h-3 mr-1" />
                Switch to Mainnet
              </Button>
            )}
            {chainId !== 11155111 && (
              <Button
                onClick={() => switchChain({ chainId: 11155111 })}
                size="sm"
                variant="outline"
                className="bg-yellow-500/20 border-yellow-500/40 hover:bg-yellow-500/30 text-yellow-200"
              >
                <Zap className="w-3 h-3 mr-1" />
                Switch to Sepolia
              </Button>
            )}
          </div>
        )}

        {copied && (
          <Alert className="bg-green-500/20 border-green-500/40">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription className="text-green-200">
              Address copied to clipboard!
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}