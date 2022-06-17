import { OAuth2Client } from 'google-auth-library';
const CLIENT_ID=process.env.GOOGLE_CLIENT_ID
const client = new OAuth2Client(CLIENT_ID);


export async function googleVerify(token='') {

  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  //const userid = payload['sub'];
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
  //console.log(payload);

  const {name,picture,email}=ticket.getPayload();
  return{
    name,
    picture,
    email
  }
}
