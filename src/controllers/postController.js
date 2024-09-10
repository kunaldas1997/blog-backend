import expressAsyncHandler from "express-async-handler";
import { Author, Category, Post } from "../models/postModel.js";
import { CompareJWT } from "../middleware/tokenVerifier.js";
import mongoose from "mongoose";


export const getPosts = expressAsyncHandler(async (req, res) => {
  try {

    const posts = (await Post.find().populate({ path: 'post_author', select: '-name -password' }).populate('post_category')).reverse('publish_date');
    if (posts.length === 0) {
      res.status(204).json({ message: 'No posts found' });

    } else {
      res.json(posts);
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Error fetching posts'
    })
  }
});

export const getPostsWithID = expressAsyncHandler(async (req, res) => {

  try {
    const post = await Post.find({ _id: req.query.id }).populate({ path: 'post_author', select: '-name -password' }).populate('post_category');
    if (!post) {
      res.status(204).json({ message: 'No posts found' });
    } else {
      res.json(post[0]);
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Error fetching posts'
    })
  }
})

export const searchPost = expressAsyncHandler(async (req, res) => {
  try {
    const regexQuery = new RegExp(req.query.query, 'i');
    const post = await Post.find({ title: regexQuery }).populate({ path: 'post_author', select: '-name -password' }).populate('post_category');

    if (!post || post.length === 0) {
      res.status(204).json({ message: 'No posts found' });
    } else {
      res.json(post);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Error fetching posts'
    })
  }
});

export const setPost = expressAsyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      const { title, publish_date, excerpt, post_author, post_content, post_category } = req.body;

      const data = await CompareJWT(token.split(" ")[1]);

      const authorExists = await Author.findById(data);
      if (!authorExists) {
        return res.status(400).json({ error: 'Author not found' });
      }

      if (!title || !post_content || !post_category) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      let categoryExists = await Category.findOne({ category_name: post_category });
      if (!categoryExists) {
        const category = await Category.create({
          category_name: post_category
        })
        categoryExists = category.category_name;
      }

      const post = await Post.create({
        title,
        excerpt,
        post_author: authorExists.id,
        post_content,
        post_category: new mongoose.Types.ObjectId(categoryExists)
      });

      res.status(201).json({ message: "Post Added Succesfully" });
    }
    else {
      res.status(403).json({ message: "Not Authorized" });
    }


  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error', message: 'Token Invalid or Not Found' });
  }
});

export const updatePost = expressAsyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      const post = await Post.findOne({ _id: req.query.id });
      const data = await CompareJWT(token.split(" ")[1]);
      const authorExists = await Author.findById(data);
      if (!authorExists) {
        return res.status(400).json({ error: 'Author not found' });
      }

      if (authorExists) {
        if (req.body.title) {
          post.title = req.body.title;
        }
        if (req.body.excerpt) {
          post.excerpt = req.body.excerpt;
        }
        if (req.body.post_content) {
          post.post_content = req.body.post_content;
        }
      }
      post.publish_date = Date.now();
      await post.save();
      res.send({ message: "Post Updated Succesfully" });
    }
  } catch (err) {
    res.status(404).send({ error: err });
  }
});

export const deletePost = expressAsyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      const data = await CompareJWT(token.split(" ")[1]);
      const authorExists = await Author.findById(data);
      if (!authorExists) {
        return res.status(400).json({ error: 'Author not found' });
      }

      await Post.deleteOne({ _id: req.query.id });
      res.send({ message: "Deleted Post!" });
    }
  } catch (err) {
    res.status(404).send({ error: err });
  }
});

