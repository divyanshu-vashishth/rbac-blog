import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const seedDatabase = async () => {
  try {
    //create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const { data: adminUser, error: adminError } = await supabase
      .from('users')
      .insert([
        {
          name: 'Admin',
          email: 'admin@example.com',
          password: hashedPassword,
          role: 'admin'
        }
      ])
      .select()
      .single();

    if (adminError) throw adminError;

    //create sample blog posts
    const samplePosts = [
      {
        title: 'Getting Started with React and Vite',
        content: `React has become one of the most popular front-end libraries in web development, and with good reason. Its component-based architecture and virtual DOM make it efficient and maintainable.

In this post, we'll explore how to set up a new React project using Vite, a modern build tool that offers lightning-fast hot module replacement (HMR) and optimized builds.

Key topics we'll cover:
- Why choose Vite over Create React App
- Setting up your development environment
- Creating your first components
- Best practices for project structure

Stay tuned for more React tutorials and tips!`,
        author_id: adminUser.id
      },
      {
        title: 'Understanding JWT Authentication',
        content: `JSON Web Tokens (JWT) have revolutionized how we handle authentication in modern web applications. They provide a secure, stateless way to authenticate users and protect routes.

In this comprehensive guide, we'll dive deep into:
- What are JWTs and how do they work?
- Implementing JWT authentication in Node.js
- Securing React routes with JWT
- Best practices for token storage and renewal

Security is crucial for any web application, and understanding JWT authentication is a vital skill for modern web developers.`,
        author_id: adminUser.id
      },
      {
        title: 'Mastering Tailwind CSS',
        content: `Tailwind CSS has changed the game when it comes to styling web applications. Its utility-first approach offers unprecedented flexibility and development speed.

This post explores:
- Why Tailwind CSS is gaining popularity
- Setting up Tailwind in your project
- Creating responsive designs
- Custom configuration and optimization
- Real-world examples and best practices

Whether you're new to Tailwind or looking to level up your skills, this guide will help you master this powerful CSS framework.`,
        author_id: adminUser.id
      }
    ];

    const { error: postsError } = await supabase
      .from('posts')
      .insert(samplePosts);

    if (postsError) throw postsError;

    console.log('Database seeded successfully!');
    console.log('Admin credentials:');
    console.log('Email: admin@example.com');
    console.log('Password: admin123');

  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

seedDatabase();