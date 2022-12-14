import { getDuplicatesRefinement } from 'libs/utils/zod'
import { z } from 'zod'
import { TickerSchema } from '../../finance/models/Ticker'
import { IdSchema } from '../../generic/models/Id'
import { isEqualByDC } from '../../utils/lodash'

export const BlockchainNetworkSchema = z.object({
  id: IdSchema,
  name: z.string().min(1),
  symbol: TickerSchema,
  isMainnet: z.boolean(),
})

export const BlockchainNetworksSchema = z.array(BlockchainNetworkSchema)
  .superRefine(getDuplicatesRefinement('BlockchainNetwork', getBlockchainNetworkUid))

export const BlockchainNetworkUidSchema = BlockchainNetworkSchema.pick({
  id: true,
})

export type BlockchainNetwork = z.infer<typeof BlockchainNetworkSchema>

export type BlockchainNetworkUid = z.infer<typeof BlockchainNetworkUidSchema>

export function validateBlockchainNetwork(network: BlockchainNetwork): BlockchainNetwork {
  return BlockchainNetworkSchema.parse(network)
}

export function validateBlockchainNetworks(networks: BlockchainNetwork[]): BlockchainNetwork[] {
  return BlockchainNetworksSchema.parse(networks)
}

export function getBlockchainNetworkUid(networkUid: BlockchainNetworkUid) {
  return BlockchainNetworkUidSchema.parse(networkUid)
}

export const isEqualBlockchainNetwork = isEqualByDC(getBlockchainNetworkUid)
