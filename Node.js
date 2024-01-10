const express = require('express');
const AgoraTokenBuilder = require('agora-access-token');

const app = express();
const PORT = process.env.PORT || 3000;

// Endpoint to generate Agora tokens
app.get('/access_token', (req, res) => {
  const channelName = req.query.channelName; // Extract channelName from query string

  if (!channelName) {
    return res.status(400).send('Channel Name is required.');
  }

  const agoraAppId = '11efb81da2e0405cb0f4b1c159b66e0d'; // Your Agora App ID
  const agoraPrimaryCertificate = '76bf6543723d4963a0d33c2a25999da2'; // Your Primary Certificate

  // Generate Agora token
  const token = AgoraTokenBuilder.buildTokenWithAccount(
    agoraAppId,
    agoraPrimaryCertificate,
    channelName,
    null, // You can provide a user ID if needed, set as null for this example
    AgoraTokenBuilder.Role.PUBLISHER, // Define user role
    0 // Set token expiration time in seconds, 0 means never expire
  );

  res.send(token);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
