// const { OAuth2Client } = require("google-auth-library");
// const { User } = require("../models");
// const jwt = require("jsonwebtoken");
// const { nanoid } = require("nanoid");

// const { createError } = require("../helpers/createError");
// const { GOOGLE_CLIENT_ID, SECRET_KEY } = process.env;

// const client = new OAuth2Client(GOOGLE_CLIENT_ID);

// class GoogleAuthController {
//   async googleAuth(req, res, next) {
//     const { tokenId } = req.body;
//     console.log(req.body);

//     const result = await client.verifyIdToken({
//       idToken: tokenId,
//       requiredAudience: GOOGLE_CLIENT_ID,
//     });

//     if (!result.payload) {
//       throw createError(401, "invalid password or email");
//     }

//     const { email, email_verified, exp } = result.payload;
//     if (!email_verified) {
//       throw createError(401, "Email not verified");
//     }

//     const user = await User.findOne({ email });

//     if (!user) {
//       const password = `${nanoid()}.${SECRET_KEY}`;

//       const newUser = await User.create({
//         email,
//         password,
//         verify: true,
//         verificationToken: nanoid(),
//       });
//       const payload = {
//         id: newUser._id,
//       };
//       const token = jwt.sign(payload, SECRET_KEY, { expiresIn: exp });
//       const user = await User.findByIdAndUpdate(newUser._id, {
//         token,
//         verificationToken: "",
//       });
//       res.status(201).json({
//         token,
//         email: user.email,
//         totalBalance: user.totalBalance,
//       });
//       return;
//     }
//     const payload = {
//       id: user._id,
//     };
//     const token = jwt.sign(payload, SECRET_KEY, { expiresIn: exp });
//     await User.findByIdAndUpdate(user._id, { token });
//     res.status(201).json({
//       token,
//       email: user.email,
//       totalBalance: user.totalBalance,
//     });
//   }
// }

// module.exports = new GoogleAuthController();

const queryString = require("query-string");
const axios = require("axios");
// const URL = require("url");

class GoogleAuthController {
  async googleAuth(req, res) {
    const stringifiedParams = queryString.stringify({
      client_id: process.env.GOOGLE_CLIENT_ID,
      redirect_uri: `${process.env.BASE_URL}/api/googleauth/google-redirect`,
      scope: [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
      ].join(" "),
      response_type: "code",
      access_type: "offline",
      prompt: "consent",
    });
    return res.redirect(
      `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`
    );
  }

  async googleRedirect(req, res) {
    const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
    const urlObj = new URL(fullUrl);
    const urlParams = queryString.parse(urlObj.search);
    const code = urlParams.code;

    const tokenData = await axios({
      url: `https://oauth2.googleapis.com/token`,
      method: "post",
      data: {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: `${process.env.BASE_URL}/auth/google-redirect`,
        grant_type: "authorization_code",
        code,
      },
    });
    console.log(tokenData);
    const userData = await axios({
      url: "https://www.googleapis.com/oauth2/v2/userinfo",
      method: "get",
      headers: {
        Authorization: `Bearer ${tokenData.data.access_token}`,
      },
    });
    console.log(userData);
    // ...
    // ...
    // ...
    // return res.redirect(
    //   `${process.env.FRONTEND_URL}?email=${userData.data.email}`
    // );
  }
}

module.exports = new GoogleAuthController();
