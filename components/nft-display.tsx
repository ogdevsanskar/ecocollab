'use client'

import { useState, useEffect } from 'react'
import { useAccount, useReadContract } from 'wagmi'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Award, 
  TreePine, 
  Waves, 
  Zap, 
  Shield, 
  Star,
  ExternalLink,
  Calendar,
  MapPin
} from 'lucide-react'
import { CONTRACT_ADDRESSES } from '@/lib/web3-config'

interface NFTDisplayProps {
  userAddress?: string
}

const ENVIRONMENTAL_NFT_ABI = [
  {
    name: 'getUserCertificates',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: '_user', type: 'address' }],
    outputs: [{ name: '', type: 'uint256[]' }]
  },
  {
    name: 'getUserBadges',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: '_user', type: 'address' }],
    outputs: [{ name: '', type: 'string[]' }]
  },
  {
    name: 'getUserImpactStats',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: '_user', type: 'address' }],
    outputs: [
      { name: 'totalCertificates', type: 'uint256' },
      { name: 'totalBadges', type: 'uint256' },
      { name: 'treesPlanted', type: 'uint256' },
      { name: 'co2Offset', type: 'uint256' },
      { name: 'plasticCleaned', type: 'uint256' }
    ]
  },
  {
    name: 'getCertificate',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: '_tokenId', type: 'uint256' }],
    outputs: [
      {
        type: 'tuple',
        components: [
          { name: 'tokenId', type: 'uint256' },
          { name: 'certificateType', type: 'string' },
          { name: 'title', type: 'string' },
          { name: 'description', type: 'string' },
          { name: 'recipient', type: 'address' },
          { name: 'projectId', type: 'uint256' },
          { name: 'impactValue', type: 'uint256' },
          { name: 'impactUnit', type: 'string' },
          { name: 'issuedAt', type: 'uint256' },
          { name: 'issuer', type: 'address' },
          { name: 'verified', type: 'bool' }
        ]
      }
    ]
  },
  {
    name: 'getBadge',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: '_badgeName', type: 'string' }],
    outputs: [
      {
        type: 'tuple',
        components: [
          { name: 'name', type: 'string' },
          { name: 'description', type: 'string' },
          { name: 'imageUri', type: 'string' },
          { name: 'requiredImpact', type: 'uint256' },
          { name: 'impactType', type: 'string' },
          { name: 'active', type: 'bool' }
        ]
      }
    ]
  }
] as const

export function NFTDisplay({ userAddress }: NFTDisplayProps) {
  const { address, chainId } = useAccount()
  const targetAddress = userAddress || address

  const contractAddress = chainId ? CONTRACT_ADDRESSES[chainId]?.ENVIRONMENTAL_NFT : undefined

  // Read user's NFT data
  const { data: certificates } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: ENVIRONMENTAL_NFT_ABI,
    functionName: 'getUserCertificates',
    args: targetAddress ? [targetAddress as `0x${string}`] : undefined,
    query: {
      enabled: !!contractAddress && !!targetAddress
    }
  })

  const { data: badges } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: ENVIRONMENTAL_NFT_ABI,
    functionName: 'getUserBadges',
    args: targetAddress ? [targetAddress as `0x${string}`] : undefined,
    query: {
      enabled: !!contractAddress && !!targetAddress
    }
  })

  const { data: impactStats } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: ENVIRONMENTAL_NFT_ABI,
    functionName: 'getUserImpactStats',
    args: targetAddress ? [targetAddress as `0x${string}`] : undefined,
    query: {
      enabled: !!contractAddress && !!targetAddress
    }
  })

  const getBadgeIcon = (badgeName: string) => {
    switch (badgeName.toLowerCase()) {
      case 'tree planter':
        return <TreePine className="w-6 h-6 text-green-500" />
      case 'ocean guardian':
        return <Waves className="w-6 h-6 text-blue-500" />
      case 'carbon fighter':
        return <Zap className="w-6 h-6 text-yellow-500" />
      case 'green pioneer':
        return <Star className="w-6 h-6 text-purple-500" />
      default:
        return <Award className="w-6 h-6 text-[#328CC1]" />
    }
  }

  const getCertificateIcon = (certificateType: string) => {
    switch (certificateType.toLowerCase()) {
      case 'tree_planting':
        return <TreePine className="w-5 h-5 text-green-500" />
      case 'ocean_cleanup':
        return <Waves className="w-5 h-5 text-blue-500" />
      case 'carbon_offset':
        return <Zap className="w-5 h-5 text-yellow-500" />
      default:
        return <Shield className="w-5 h-5 text-[#328CC1]" />
    }
  }

  if (!targetAddress) {
    return (
      <Card className="bg-black/60 border-[#328CC1]/20 backdrop-blur-sm">
        <CardContent className="text-center py-12">
          <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-400">Connect your wallet to view NFT certificates and badges</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Impact Statistics */}
      {impactStats && (
        <Card className="bg-black/60 border-[#328CC1]/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Award className="w-5 h-5 mr-2 text-[#328CC1]" />
              Environmental Impact
            </CardTitle>
            <CardDescription className="text-gray-300">
              Your verified contributions to climate action
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center bg-black/40 rounded-lg p-4">
                <Shield className="w-8 h-8 text-[#328CC1] mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{impactStats[0]?.toString() || '0'}</div>
                <div className="text-xs text-gray-400">Certificates</div>
              </div>
              <div className="text-center bg-black/40 rounded-lg p-4">
                <Award className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{impactStats[1]?.toString() || '0'}</div>
                <div className="text-xs text-gray-400">Badges</div>
              </div>
              <div className="text-center bg-black/40 rounded-lg p-4">
                <TreePine className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{impactStats[2]?.toString() || '0'}</div>
                <div className="text-xs text-gray-400">Trees Planted</div>
              </div>
              <div className="text-center bg-black/40 rounded-lg p-4">
                <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{impactStats[3]?.toString() || '0'}</div>
                <div className="text-xs text-gray-400">kg CO₂ Offset</div>
              </div>
              <div className="text-center bg-black/40 rounded-lg p-4">
                <Waves className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{impactStats[4]?.toString() || '0'}</div>
                <div className="text-xs text-gray-400">kg Plastic Cleaned</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* NFT Collections */}
      <Tabs defaultValue="badges" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 bg-black/60 border-[#328CC1]/20">
          <TabsTrigger value="badges" className="data-[state=active]:bg-[#328CC1]/20">
            Environmental Badges
          </TabsTrigger>
          <TabsTrigger value="certificates" className="data-[state=active]:bg-[#328CC1]/20">
            Impact Certificates
          </TabsTrigger>
        </TabsList>

        {/* Badges Tab */}
        <TabsContent value="badges" className="space-y-4">
          {badges && badges.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {badges.map((badgeName, index) => (
                <Card key={index} className="bg-black/60 border-[#328CC1]/20 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-[#328CC1]/20 to-[#145214]/20 rounded-full flex items-center justify-center">
                        {getBadgeIcon(badgeName)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{badgeName}</h3>
                        <Badge className="bg-green-500/20 text-green-100 border-green-500/40 mt-2">
                          Earned
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-black/60 border-[#328CC1]/20 backdrop-blur-sm">
              <CardContent className="text-center py-12">
                <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-300 mb-2">No Badges Yet</h3>
                <p className="text-gray-400">Start contributing to environmental projects to earn badges!</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Certificates Tab */}
        <TabsContent value="certificates" className="space-y-4">
          {certificates && certificates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certificates.map((tokenId, index) => (
                <CertificateCard 
                  key={index} 
                  tokenId={tokenId} 
                  contractAddress={contractAddress}
                />
              ))}
            </div>
          ) : (
            <Card className="bg-black/60 border-[#328CC1]/20 backdrop-blur-sm">
              <CardContent className="text-center py-12">
                <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-300 mb-2">No Certificates Yet</h3>
                <p className="text-gray-400">Complete environmental projects to earn impact certificates!</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Certificate Card Component
function CertificateCard({ tokenId, contractAddress }: { tokenId: bigint, contractAddress?: string }) {
  const { data: certificate } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: ENVIRONMENTAL_NFT_ABI,
    functionName: 'getCertificate',
    args: [tokenId],
    query: {
      enabled: !!contractAddress
    }
  })

  if (!certificate) return null

  const getCertificateIcon = (certificateType: string) => {
    switch (certificateType.toLowerCase()) {
      case 'tree_planting':
        return <TreePine className="w-5 h-5 text-green-500" />
      case 'ocean_cleanup':
        return <Waves className="w-5 h-5 text-blue-500" />
      case 'carbon_offset':
        return <Zap className="w-5 h-5 text-yellow-500" />
      default:
        return <Shield className="w-5 h-5 text-[#328CC1]" />
    }
  }

  const formatDate = (timestamp: bigint) => {
    return new Date(Number(timestamp) * 1000).toLocaleDateString()
  }

  return (
    <Card className="bg-black/60 border-[#328CC1]/20 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getCertificateIcon(certificate[1])}
            <CardTitle className="text-lg text-white">{certificate[2]}</CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            {certificate[10] && (
              <Badge className="bg-green-500/20 text-green-100 border-green-500/40">
                Verified
              </Badge>
            )}
            <Badge className="bg-[#328CC1]/20 text-[#328CC1] border-[#328CC1]/40">
              #{certificate[0].toString()}
            </Badge>
          </div>
        </div>
        <CardDescription className="text-gray-300">
          {certificate[3]}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-black/40 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Impact Value</span>
            <span className="text-white font-semibold">
              {certificate[6].toString()} {certificate[7]}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Project ID</span>
            <span className="text-white">#{certificate[5].toString()}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>Issued {formatDate(certificate[8])}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.open(`https://opensea.io/assets/ethereum/${contractAddress}/${certificate[0]}`, '_blank')}
            className="text-gray-400 hover:text-white"
          >
            <ExternalLink className="w-3 h-3 mr-1" />
            View NFT
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}