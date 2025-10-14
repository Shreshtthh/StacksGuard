import { 
  fetchCallReadOnlyFunction, // Changed from callReadOnlyFunction
  principalCV,
  cvToValue,
  ClarityValue,
} from '@stacks/transactions';
import { STACKS_TESTNET, STACKS_MAINNET } from '@stacks/network'; // Changed to constants

const network = process.env.NEXT_PUBLIC_NETWORK === 'mainnet' 
  ? STACKS_MAINNET 
  : STACKS_TESTNET;

const REGISTRY_ADDRESS = process.env.NEXT_PUBLIC_REGISTRY_CONTRACT_ADDRESS || '';
const [contractAddress, contractName] = REGISTRY_ADDRESS.split('.');

export async function getTokenScore(tokenAddress: string): Promise<number> {
  try {
    const result = await fetchCallReadOnlyFunction({
      contractAddress,
      contractName,
      functionName: 'get-token-score',
      functionArgs: [principalCV(tokenAddress)],
      network,
      senderAddress: contractAddress,
    });
    
    const value = cvToValue(result);
    
    // Handle the response structure: (ok uint)
    if (value && typeof value === 'object' && 'value' in value) {
      return Number(value.value) || 0;
    }
    return 0;
  } catch (error) {
    console.error('Error fetching token score:', error);
    return 0;
  }
}

export async function isTokenFlagged(tokenAddress: string): Promise<boolean> {
  try {
    const result = await fetchCallReadOnlyFunction({
      contractAddress,
      contractName,
      functionName: 'is-token-flagged',
      functionArgs: [principalCV(tokenAddress)],
      network,
      senderAddress: contractAddress,
    });
    
    const value = cvToValue(result);
    
    // Handle the response structure: (ok bool)
    if (value && typeof value === 'object' && 'value' in value) {
      return Boolean(value.value);
    }
    return false;
  } catch (error) {
    console.error('Error checking flag status:', error);
    return false;
  }
}

export async function getAuditHistory(tokenAddress: string): Promise<any[]> {
  try {
    const result = await fetchCallReadOnlyFunction({
      contractAddress,
      contractName,
      functionName: 'get-audit-history',
      functionArgs: [principalCV(tokenAddress)],
      network,
      senderAddress: contractAddress,
    });
    
    const value = cvToValue(result);
    
    // Handle the response structure: (ok (list ...))
    if (value && typeof value === 'object' && 'value' in value) {
      return Array.isArray(value.value) ? value.value : [];
    }
    return [];
  } catch (error) {
    console.error('Error fetching audit history:', error);
    return [];
  }
}
