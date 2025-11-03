import connectMongoDB from "./mongodb";

export const getUsers = async () => {
    try {
        connectMongoDB();
        const users = await User.find();
        return users;
    } catch (error) {
        console.log('Error in getUsers:', error);
        throw new Error(error);
    }
};