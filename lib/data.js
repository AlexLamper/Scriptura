import { Post } from "./models";
import { connectDB } from "./connectDB";

export const getCourses = async () => {
    try {
        connectDB();
        const courses = await Course.find();
        return courses;
    } catch (error) {
        throw new Error(error);
    }
};

export const getQuizzes = async () => {
    try {
        connectDB();
        const quizzes = await Quiz.find();
        return quizzes;
    } catch (error) {
        throw new Error(error);
    }
}

export const getUsers = async () => {
    try {
        connectDB();
        const users = await User.find();
        return users;
    } catch (error) {
        throw new Error(error);
    }
};

export const getPosts = async () => {
    try {
        connectDB();
        const posts = await Post.find();
        return posts;
    } catch (error) {
        throw new Error(error);
    }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getPost = async (id) => {
    try {
        connectDB();
        const post = await Post.find({slug});
        return post;
    } catch (error) {
        throw new Error(error);
    }

