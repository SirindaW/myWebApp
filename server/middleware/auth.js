import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    try {
        // middleware is for check if user's token is valid then use next() to let user do the action (ex. like, delete post)
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500; // >=500 is GoogleAuth

        let decodedData;

        if(token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test'); // secondary argument must be the same as secret string when create token 

            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token); // use decode cause don't need the secret

            req.userId = decodedData?.sub; // sub is google's specific id (different for every google user)
        }

        next();

    } catch (error) {
       console.log(error); 
    }
}

export default auth;