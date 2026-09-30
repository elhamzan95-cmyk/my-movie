// frontend/src/testConnection.js
export const testBackendConnection = async () => {
  console.log('🔍 Testing backend connection...');

  try {
    // Test 1: direct to backend
    const directTest = await fetch('http://localhost:3001/api/health');
    console.log('✅ Direct test:', await directTest.json());

    // Test 2: through proxy
    const proxyTest = await fetch('/api/health');
    console.log('✅ Proxy test:', await proxyTest.json());

    return true;
  } catch (error) {
    console.error('❌ Connection test failed:', error.message);

    // Troubleshooting guide
    console.log('\n🔧 Troubleshooting guide:');
    console.log('1. Is the backend running? (npm run dev in the backend folder)');
    console.log('2. Is port 3001 available?');
    console.log('3. Try toggling VPN (off/on)');
    console.log('4. Check your firewall');

    return false;
  }
};