const protected = async (req, res) => {
    res.send(`Ciao ${req.user.username}, hai accesso alla rotta protetta!`);
};

module.exports = { protected };
