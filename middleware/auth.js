//validate the token and access protected route
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req,res,next) {
    //Get token from the header
    const token = req.header('x-auth-token');

    //Check if not token
    if(!token) {
        return res.status(401).json({ msg:'No token, authorization denied '});
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        //jwtSecret 的作用是确保生成的 JWT 令牌具有一定的安全性，只有持有正确密钥的服务端才能够正确解码和验证令牌，并提取出其中的用户信息

        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg:'Token is not valid '});
    }
}
//这个中间件的作用是验证传入请求的 JWT 令牌是否有效，并提取出其中的用户信息，以便后续路由处理函数使用。
//如果令牌有效，则将其中包含的用户信息解码后添加到请求对象的 user 属性中，并调用 next() 继续执行下一个中间件或路由处理函数。
//在 Express 中，next() 是一个函数，用于将请求传递给中间件栈中的下一个中间件或路由处理函数。当调用 next() 时，Express 将会继续执行后续的中间件或路由处理函数。
//如果没有调用 next()，则请求将会被挂起，不会继续向下执行，这可能导致请求无法完成或超时。因此，next() 的作用是控制 Express 中间件的执行流程，使其能够顺利地处理请求。