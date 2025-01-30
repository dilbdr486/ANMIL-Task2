import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const usersFile = path.resolve(__dirname, '../data/user.json');
console.log(path.resolve(usersFile));


const getUsers = () => JSON.parse(fs.readFileSync(usersFile));

const createUser = (user) => {
    const users = getUsers();
    const newUser = { id: Date.now().toString(), ...user };
    users.push(newUser); // Add the new user to the list

    try {
        fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
        console.log("User successfully written to file:", newUser);
    } catch (error) {
        console.error("Error writing to users.json:", error);
    }

    return newUser;
};


const updateUser = (id, data) => {
    let users = getUsers();
    users = users.map(user => user.id === id ? { ...user, ...data } : user);
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
};

const deleteUser = (id) => {
    let users = getUsers();
    users = users.filter(user => user.id !== id);
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
};

export { getUsers, createUser, updateUser, deleteUser };
