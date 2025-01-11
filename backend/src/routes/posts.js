import express from 'express';
import { createClient } from '@supabase/supabase-js';
import { auth, authorize } from '../middleware/authMiddleware.js';
const router = express.Router();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

router.get('/', auth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        author:users(name)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        author:users(name)
      `)
      .eq('id', req.params.id)
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//admin routes
router.post('/', auth, authorize(['admin']), async (req, res) => {
  try {
    const { title, content } = req.body;
    const { data, error } = await supabase
      .from('posts')
      .insert([
        { title, content, author_id: req.user.id }
      ])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', auth, authorize(['admin']), async (req, res) => {
  try {
    const { title, content } = req.body;
    const { data, error } = await supabase
      .from('posts')
      .update({ title, content })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', auth, authorize(['admin']), async (req, res) => {
  try {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;