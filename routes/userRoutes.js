const router = require("express").Router()
const userControllers = require("../controllers/userController")

/**
 * Get User By Id or Email
 * @method GET
*/
router.get("/:userId", userControllers.getUserById)

/**
 * Create a new user
 * @method POST
*/
router.post("/", userControllers.postUser)

/**
 * Update user by id
 * @method PUT
*/
router.put("/:userId", userControllers.putUserById)

/**
 * Update user info by id
 * @method PATCH
*/
router.patch("/:userId", userControllers.patchUserById)

/**
 * Delete User by id
*/
router.delete("/:userId", userControllers.deleteUserById)

/**
 * Get All Users, Include
 *  - filter
 *  - sort
 *  - pagination
 *  - select properties
 * @route api/users?sort=["by","name"]
 * @method GET
 * @visibility private
 * 
*/
router.get("/", userControllers.getUser)
module.exports = router