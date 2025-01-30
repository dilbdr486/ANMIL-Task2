import * as users from '../data/userData.js';

const getUsers = (req, res) => {
    const allUsers = users.getUsers();
    if (!allUsers || allUsers.length === 0) {
        return res.status(404).json({ message: 'No users found' });
    }
    res.json(allUsers);
};

const createUser = (req, res) => {
    const { name, address } = req.body;

    if (!name || !address) {
        return res.status(400).json({ message: 'Name and address are required' });
    }

    const newUser = users.createUser({ name, address });
    res.status(201).json(newUser);
};

const updateUser = (req, res) => {
    const { name, address } = req.body;
    if (!name && !address) {
        return res.status(400).json({ message: 'At least one of name or address is required' });
    }

    const updatedUser = users.updateUser(req.params.id, { name, address });
    
    res.json({ message: 'User updated', user: updatedUser });
};

const deleteUser = (req, res) => {
     users.deleteUser(req.params.id);

    res.json({ message: 'User deleted' });
};

export {
    getUsers,
    createUser,
    updateUser,
    deleteUser
};
