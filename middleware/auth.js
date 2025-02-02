import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split("")[1];
    let decodedData;

    if (token) {
      decodedData = jwt.verify(token, process.env.SECRET_TOKEN);
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.verify = decodedData?.sub;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};
