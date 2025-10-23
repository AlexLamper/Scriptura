import { connectDB } from "./connectDB";

export const getQuizzes = async () => {
    try {
        connectDB();
        const quizzes = await Quiz.find();
        return quizzes;
    } catch (error) {
        console.log('Error in getQuizzes:', error);
        throw new Error(error);
    }
}

export const getUsers = async () => {
    try {
        connectDB();
        const users = await User.find();
        return users;
    } catch (error) {
        console.log('Error in getUsers:', error);
        throw new Error(error);
    }
};