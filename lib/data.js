import connectMongoDB from "./mongodb";

export const getUsers = async () => {
    try {
        connectMongoDB();
        const users = await User.find();
        return users;
    } catch (error) {
        console.error('Error in getUsers:', error);
        throw new Error(error);
    }
};