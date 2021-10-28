// This function detects most providers injected at window.ethereum
import detectEthereumProvider from '@metamask/detect-provider';

const provider = await detectEthereumProvider();

if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
  }
if (provider) {
  // From now on, this should always be true:
  // provider === window.ethereum
  startApp(provider); // initialize your app
} else {
  console.log('Please install MetaMask!');
}