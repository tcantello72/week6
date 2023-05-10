const express = require ('express');
const router = express.Router();

const User = require('../models/User.js');

router.get('/', async (request, response) => {
    const users = await User.findAll();
    response.send(users);
});

router.post('/', async (req, res, next) => {
    try 
        {
            const user = await User.create(req.body);
            res.send(user.username);
        }
    catch
        {
            next("error");
        }
})

router.get('/:username', async (req, res, next) => {
    try 
        {
            const user = await User.findOne({where: {username: req.params.username}});
            res.send(user);
        }
    catch
        {
            next("error");
        }

})

router.put('/:username', async (req, res, next) => {
    try 
        {
            const updated = await User.update(req.body, {where: { username: req.params.username },});
            console.log(updated);
            res.sendStatus(200);
        } 
    catch
        {
            next(error);
        }
});
  
router.delete("/:username", async (req, res, next) => {
    try 
        {
            const deleted = await User.destroy({where: { username: req.params.username }});
            if (deleted === 0) 
                {
                    throw new Error("No user deleted");
                }
            res.sendStatus(200);
        } 
    catch 
        {
            next(error);
        }
  })

module.exports = router;