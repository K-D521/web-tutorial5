const express = require('express');
const router = express.Router();
const crypto = require("crypto");

users = [{
    email: "user1@email.com",
    firstName: "First1",
    id: "0001"
},

{
    email: "user2@email.com",
    firstName: "First2",
    id: "0002"
}]

router.get('/users', (req, res) => {
    res.status(200).json({
        message: "Getting users",
        success: true,
        users: users
    })
})

router.post('/add', (req, res) => {

    const input = req.body;

    const id = crypto.randomBytes(16).toString("hex");
    input["id"] = id

    if (input?.email && input?.firstName) {
        users.push(input)
        res.status(200).json({
            message: "User added",
            success: true
        })
    }
    else {
        res.status(501).json({
            message: "Error : User not added",
        })
    }
})


router.get('/user/:id', (req, res) => {

    const id = req.params.id;

    const fetchedUser = users.find(user => user.id === id)
    if (!fetchedUser) {
        return res.status(404).send("Error : User not found");
    }
    res.status(500).json({
        success: true,
        user: fetchedUser
    })
})

router.put('/update/:id', (req, res) => {
    console.log(req.body);
    const id = req.params.id;
    console.log(id);
    const { email, firstName } = req.body;
    const userIndex = users.findIndex(user => user.id === id)

    if (userIndex === -1) {
        return res.status(404).send('Error : User not found');
    }
    if (email) {
        users[userIndex].email = email;
    }
    if (firstName) {
        users[userIndex].firstName = firstName;
    }
    res.status(200).json({
        message: 'User updated',
        success: true
    });
});

module.exports = router