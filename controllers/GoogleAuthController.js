const queryString = require('query-string');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const { User } = require("../models");

const { NODE_ENV, BASE_URL_PROD_BACK, BASE_URL_DEV_BACK, BASE_URL_DEV_FRONT, BASE_URL_PROD_FRONT } = process.env;
const baseUrlFront = NODE_ENV === "development" ? BASE_URL_DEV_FRONT : BASE_URL_PROD_FRONT;
const baseUrlBack = NODE_ENV === "development" ? BASE_URL_DEV_BACK : BASE_URL_PROD_BACK;

const googleAuth = (req, res) => {
  const stringifyParams = queryString.stringify({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: `${baseUrlBack}/api/auth/google-redirect`,
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' '),
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
  });

  return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${stringifyParams}`,
  );
};
console.log(googleAuth);

const googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = queryString.parse(urlObj.search);
  const code = urlParams.code;
  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: 'post',
    data: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${baseUrlBack}/api/auth/google-redirect`,
      grant_type: 'authorization_code',
      code,
    },
  });
  const userData = await axios({
    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    method: 'get',
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });

  const user = await User.findOne({ email: userData.data.email });

  if (!user) {
    await User.create({
      name: userData.data.name,
      email: userData.data.email,
    });
  }

  const client = await User.findOne({ email: userData.data.email });
  
  const token = await jwt.sign({ id: client.id }, process.env.SECRET_KEY);
  
  await User.findOneAndUpdate({ email: userData.data.email }, { token });

  return res.redirect(`${baseUrlFront}/api/auth/google-redirect?token=${token}`);

};

module.exports = {
  googleAuth,
  googleRedirect,
};