import { getFinder, getInserter } from 'libs/utils/zod'
import { trim } from 'lodash-es'
import { ensureFind } from '../../utils/ensure'
import { BlockchainExplorer, BlockchainExplorerSchema, getBlockchainExplorerUid } from '../models/BlockchainExplorer'
import { BlockchainNetwork, isEqualBlockchainNetwork } from '../models/BlockchainNetwork'
import { BNBChainMainnet, BNBChainTestnet, CantoMainnet, CantoTestnet, EthereumGoerli, EthereumMainnet, EthereumRopsten } from './allBlockchainNetworks'

export const allBlockchainExplorers: BlockchainExplorer[] = []

export const addBlockchainExplorer = getInserter('BlockchainExplorer', BlockchainExplorerSchema, getBlockchainExplorerUid, allBlockchainExplorers)

export const findBlockchainExplorer = getFinder(getBlockchainExplorerUid, allBlockchainExplorers)

export const getBlockchainExplorerByNetwork = (network: BlockchainNetwork) => ensureFind(allBlockchainExplorers, e => isEqualBlockchainNetwork(e.network)(network))

function withEtherscanStyleUrlPatterns(explorer: Omit<BlockchainExplorer, 'addressExplorerUrlPattern' | 'transactionHashExplorerUrlPattern'>) {
  const explorerUrlTrimmed = trim(explorer.url, '/')
  return {
    ...explorer,
    addressExplorerUrlPattern: `${explorerUrlTrimmed}/address/{{address}}`,
    transactionHashExplorerUrlPattern: `${explorerUrlTrimmed}/tx/{{hash}}`,
  }
}

export const EtherscanMainnet = addBlockchainExplorer(withEtherscanStyleUrlPatterns({
  url: 'https://etherscan.io/',
  network: EthereumMainnet,
}))

export const EtherscanRopsten = addBlockchainExplorer(withEtherscanStyleUrlPatterns({
  url: 'https://ropsten.etherscan.io/',
  network: EthereumRopsten,
}))

export const EtherscanGoerli = addBlockchainExplorer(withEtherscanStyleUrlPatterns({
  url: 'https://goerli.etherscan.io/',
  network: EthereumGoerli,
}))

export const BscscanMainnet = addBlockchainExplorer(withEtherscanStyleUrlPatterns({
  url: 'https://bscscan.com/',
  network: BNBChainMainnet,
}))

export const BscscanTestnet = addBlockchainExplorer(withEtherscanStyleUrlPatterns({
  url: 'https://testnet.bscscan.com/',
  network: BNBChainTestnet,
}))

export const CantoExplorerMainnet = addBlockchainExplorer(withEtherscanStyleUrlPatterns({
  url: 'https://evm.explorer.canto.io/',
  network: CantoMainnet,
}))

export const CantoExplorerTestnet = addBlockchainExplorer(withEtherscanStyleUrlPatterns({
  url: 'https://evm.explorer.canto-testnet.com/',
  network: CantoTestnet,
}))
