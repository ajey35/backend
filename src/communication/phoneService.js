import twilio from 'twilio';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Function to trigger a call using a specific Twilio account
async function triggerCall(accountSid, authToken, flowId, to, from) {
  const client = twilio(accountSid, authToken);
  try {
    const execution = await client.studio.v2.flows(flowId)
      .executions
      .create({
        to,
        from,
      });
    console.log(`Call to ${to} started successfully! Execution SID: ${execution.sid}`);
    return execution;
  } catch (error) {
    console.error(`Error starting call to ${to}:`, error.message);
    throw error;
  }
}
// Function to make simultaneous calls with different credentials
async function call() {
    // Details for the second account
  const accountSid2 = process.env.TWILIO_ACCOUNT_SID_2 // Second account SID
  const authToken2 =  process.env.TWILIO_AUTH_TOKEN_2 // Second account auth token
  const flowId2 = 'FW77549334db4d85597b0aa34040770cd0';
  const to2 = '+919019841504';
  const from2 = '+17754878129';

  // Details for the first account
  const accountSid1 = process.env.TWILIO_ACCOUNT_SID_1
  const authToken1 = process.env.TWILIO_AUTH_TOKEN_1
  const flowId1 = 'FW0b6525568212b08d36cb5186627298a0';
  const to1 = '+917624994190';
  const from1 = '+17756183088';

  
  // Initiating both calls simultaneously
  const call1 = triggerCall(accountSid1, authToken1, flowId1, to1, from1);
  const call2 = triggerCall(accountSid2, authToken2, flowId2, to2, from2);

  // Run both calls concurrently
  try {
    const results = await Promise.all([call2, call1]);
    console.log('Both calls initiated successfully!');
    return results;
  } catch (error) {
    console.error('Error making simultaneous calls:', error.message);
    throw error;
  }
}

// Export the function
export default call;