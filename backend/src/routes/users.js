import { createClient } from '@supabase/supabase-js';
import { auth } from '../middleware/authMiddleware.js';
import express from 'express';


const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
const router = express.Router();


router.get('/profile',auth,  async (req, res) => {        
    try {
        const { id } = req.user; 
        const { data: user, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', id)        
        if (error || !user) {
          return res.status(404).json({ error: 'User not found' });
        }        
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}); 

export default router;