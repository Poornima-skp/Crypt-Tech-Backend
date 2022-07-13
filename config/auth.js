const jwt = require('jsonwebtoken')

module.exports  = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        const isCustomAuth = token.length < 500;
    
        if(token && isCustomAuth) {
            const decodedData = jwt.verify(token, process.env.SECRET);

            req.userId = decodedData?.id
        }else {
            const decodedData = jwt.decode(token);

            req.userId = decodedData?.sub;
        }

        next()
    } catch (error) {
        
        console.log(error)
    }
}