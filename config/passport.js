const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const Member = mongoose.model('member')
const keys = require('./keys') 

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = keys.secretOrKey

module.exports = passport => {
    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
            member = await Member.findById(jwt_payload.id)
            if (member) {
                return done(null, member)
            }
            return done(null, false)
        } catch (e) {
            console.log(e)
        }
    }))
}