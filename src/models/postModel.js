import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: String,
    publish_date: {
        type: Date,
        default: Date.now
        
    },
    excerpt: {
        type: String,
    },
    post_author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    },
    post_content: String,
    post_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    }
});


const AuthorSchema = new mongoose.Schema({
    
    name: String,
    email: {
        type: String,
        required: [true, 'Add Email'],
        unique: true,
    },
    nickname: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Enter Password']
    },
    rights: {
        type: String,
        required: true
    }
});

const CategorySchema = new mongoose.Schema({
    category_name: String
});


export const Post = mongoose.model('Post', PostSchema);
export const Author = mongoose.model('Author', AuthorSchema);
export const Category = mongoose.model('Category', CategorySchema);