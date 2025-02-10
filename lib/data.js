import { Post } from "./models";
import { connectDB } from "./connectDB";

export const getCourses = async () => {
    try {
        connectDB();
        const courses = await Course.find();
        return courses;
    } catch (error) {
        console.log('Error in getCourses:', error);
        throw new Error(error);
    }
};

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

export const getPosts = async () => {
    try {
        connectDB();
        const posts = await Post.find();
        return posts;
    } catch (error) {
        console.log('Error in getPosts:', error);
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
        console.log('Error in getPosts:', error);
        throw new Error(error);
    }
};