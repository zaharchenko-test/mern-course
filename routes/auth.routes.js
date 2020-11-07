const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()

router.post(
    '/register',
    [
        check('email', 'error email').isEmail(),
        check('password', 'error password - min 6')
            .isLength({min:6})
    ],
    async (req, res) => {
    try {
        
        
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors : errors.array(),
                message : 'error register user'
            })
        }
        
        
        const {email, password} = req.body
        
        const candidate = await User.findOne({ email })
        
        if(candidate) {
            return res.status(400).json({message: 'user est'})
        }
        
        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({email, password:hashedPassword})
        
        await user.save()
        res.status(201).json({message:'register ok'})
        
    } catch (e) {
        res.status(500).json({message: 'server error'})
    }
})

router.post(
    '/login',
    [
        check('email', 'no email bed').normalizeEmail().isEmail(),
        check('password', 'input password').exists()
        
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors : errors.array(),
                message : 'не коректные данные при входе в систему'
            })
        }
        
        const {email, password} = req.body
        const user = await User.findOne({ email })
        if(!user){
            return res.status(400).json({message : 'no user'})
        }
        
        const isMatch = await bcrypt.compare(password, user.password)
        
        if(!isMatch){
            return res.status(400).json({message: 'password false'})
        }
        
        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            {expiresIn: '1h'}
        )
        res.json({ token, userId: user.id })
        
        
    } catch (e) {
        res.status(500).json({message: 'чтото пошло не так'})
    }
})


module.exports = router
//