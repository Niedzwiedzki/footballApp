const Member = require('../models/Member')
const Group = require('../models/Group')
const {register_login} = require('./testingRoutes/register-login')
const {groupManagement} = require('./testingRoutes/groupManagement')
const {invited} = require('./testingRoutes/invited')
const {delete_regain} = require('./testingRoutes/delete-regain')

const testMembers = [{
    "memberGroups": [],
    "adminGroups": [],
    "_id": "5cf28bafe5db512d2410fbb3",
    "name": "Kuba3",
    "email": "blablabla@blavla.com",
    "password": "$2a$10$56Aauh3Rb0XFimp7hzrWrumUFL7wxZF1JcCw9eiR0zXyj/1OT0qAe",
    "__v": 0
},
{
    "memberGroups": [],
    "adminGroups": ["5cf38839ae919f21b0710547"],
    "_id": "5cf3878dfc9fea2f9c7bb10f",
    "name": "Jakub",
    "email": "kuban@op.pl",
    "password": "$2a$10$AzlNijOYA./oJ/r7IfXYBOHN2uNxj98W4XxxyONPJ995fYaLHC4za",
    "__v": 0
},
{
    "memberGroups": [],
    "adminGroups": [],
    "_id": "5cf3878dfc9fea2f9d8bb107",
    "name": "kubs",
    "email": "jakub.niedzwiedzki1990@gmail.com",
    "password": "$2a$10$.cgmpEvjN/ytI09Pa8UNFeQ5M1suSjfUzHCZY6ZYtfH25vlt/o.5G",
    "__v": 0
},
{
    "memberGroups": ["5cf38839ae919f21b0710547"],
    "adminGroups": [],
    "_id": "5cf6e9a81871021df0df88e7",
    "name": "Tomek",
    "email": "aaaaaa@op.pl",
    "password": "$2a$10$j6R6ZHnhQaWSl0jO8NatCeEHHk0F0dBPKdnk2wB.gna/WFMYHufKu",
    "__v": 0
}
]

beforeEach((done) => {
    Member.deleteMany({}).then(() => {
        return Member.insertMany(testMembers)
    }).then(() => {
        Group.deleteMany({}).then(() => {
            let group = {
                "invitedFriends": ['jakub.niedzwiedzki1990@gmail.com', 'jakubtest.niedzwiedzkitest1990@gmail.com'],
                "members": [
                    {
                        "name": "Jakub",
                        "email": "kuban@op.pl",
                        "_id": "5cf3878dfc9fea2f9c7bb10f",
                        "bets": []
                    },
                    {
                        "name": "Tomek",
                        "email": "aaaaaa@op.pl",
                        "_id": "5cf3878dfc9fea2f9c8bb10l",
                        "bets": []
                    }
                ],
                "_id": "5cf38839ae919f21b0710547",
                "competitionId": "2001",
                "name": "Mistrzostwa World Cup",
                "admin": "5cf3878dfc9fea2f9c7bb10f",
                "__v": 0
            }
            return Group.insertMany(group)
        })
    }).then(() => done())
})

register_login()
groupManagement()
invited()
delete_regain()