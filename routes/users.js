const express = require ('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { validationResult, check } = require('express-validator');

const User = require('../models/User');

// @route    POST api/users
// @desc     Register a user
// @access   Public
router.post('/',[
    check('name', 'Please enter a name').not().isEmpty(),
    check('email', 'Please include a valid Email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({min:6})
],
    async (req,res)=>{
       const errors = validationResult(req);
       if(!errors.isEmpty()){
         return res.status(400).json({ errors:errors.array() });
       }
       //上面的if用于显示error的具体内容

       try {
          const { name, password, email} = req.body;
          let user = await User.findOne({email});
          if(user){
            return res.status(400).json({ msg: 'User already exist'});
          }
          //Make sure the email has not been registered yet

          user = new User({
            name,
            email,
            password
          });
          
          const salt = await bcrypt.genSalt(10);//使用 await 关键字等待生成密码盐的操作，genSalt 方法生成一个随机的密码盐，用于加密用户密码。

          user.password = await bcrypt.hash(password, salt);//对密码进行加密处理

          await user.save();

          const payload = {
            user:{
              id:user.id
            }
          }
          
          jwt.sign(payload, config.get('jwtSecret'), { 
             expiresIn: 36000
           }, (err, token) => {
             if(err) throw err;
             res.json({ token });
           }
           /* 创建一个 JWT 的 payload，其中包含用户的 ID。然后使用 jwt.sign 方法生成 JWT，其中包含了 payload、JWT 密钥和过期时间。

           如果 JWT 生成成功，则将生成的 token 作为 JSON 响应返回给客户端，如果生成失败，则抛出错误。 */
          );

       } catch (err) {
          console.log(err.message);
          res.status(500).send('Server error');
       }
    }
)

module.exports = router;

//注意需要使用let user而不是const 不然会显示Assignment to constant variable.