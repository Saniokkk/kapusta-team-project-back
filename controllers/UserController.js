class UserController{
    current(req, res) {
        const { email, avatarURL, totalBalance } = req.user;
        console.log(req.user);
        res.json({
            email,
            avatarURL,
            totalBalance
        })
    }
}

module.exports = new UserController();