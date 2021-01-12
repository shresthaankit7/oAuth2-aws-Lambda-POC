// Require the framework and instantiate it
const api = require('lambda-api')()
const jsForce = require('jsforce')
 

const OAuth = new jsForce.OAuth2({
    loginUrl: "https://XXXX--testing.lightning.force.com",
    clientId: "XX.XX.XX",
    clientSecret: "XX",
    redirectUri: "https://XX.XX.com/oauth2/callback"
});


api.get('/', function (req, res) {
    console.log("I am on main end-point!!! / Slash called")
    res.redirect(jsForce.getAuthorizationUrl({ scope : 'api id web' }));
});

api.get('/login', function(req,res){
  console.log("Login Called!!")

  var authUrl = OAuth.getAuthorizationUrl({ scope: 'api id web' });
  console.log("authUrl::: " + authUrl)
  console.log("Decoded URL :: " + decodeURI(authUrl))
  res.redirect(decodeURI(authUrl));
});

api.get('/oauth2/callback', async (req,res) => {
  console.log("Callback url called !!")
  return { status: "Oauth is here now"}
});

// Define a route
api.get('/status', async (req,res) => {
    console.log("HI!!!>> Status called")
  return { status: 'ok' }
})
 
// Declare your Lambda handler
exports.handler = async (event, context) => {
    console.log("HHHH")
    api.run(event,context);
  return await api.run(event, context)
}