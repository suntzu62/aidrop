const { supabase } = require('../config/supabase');

class ContentService {
  // Save generated content
  async saveContent(contentData) {
    try {
      const content = {
        user_id: contentData.user_id,
        content_type: contentData.content_type,
        title: contentData.title,
        content: contentData.content,
        metadata: contentData.metadata || {},
      };

      const { data, error } = await supabase
        .from('generated_content')
        .insert(content)
        .select()
        .single();

      if (error) {
        console.error('Error saving content:', error);
        throw error;
      }

      console.log('✅ Content saved successfully:', data.id);
      return data;
    } catch (error) {
      console.error('❌ ContentService.saveContent error:', error);
      throw error;
    }
  }

  // Get all saved content for a user
  async getUserContent(userId, limit = 50) {
    try {
      const { data, error } = await supabase
        .from('generated_content')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('❌ ContentService.getUserContent error:', error);
      throw error;
    }
  }

  // Get content by ID
  async getContentById(contentId, userId) {
    try {
      const { data, error } = await supabase
        .from('generated_content')
        .select('*')
        .eq('id', contentId)
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data;
    } catch (error) {
      console.error('❌ ContentService.getContentById error:', error);
      throw error;
    }
  }

  // Update saved content
  async updateContent(contentId, userId, updates) {
    try {
      const updateData = {
        ...updates,
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('generated_content')
        .update(updateData)
        .eq('id', contentId)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('❌ ContentService.updateContent error:', error);
      throw error;
    }
  }

  // Delete saved content
  async deleteContent(contentId, userId) {
    try {
      const { error } = await supabase
        .from('generated_content')
        .delete()
        .eq('id', contentId)
        .eq('user_id', userId);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('❌ ContentService.deleteContent error:', error);
      throw error;
    }
  }

  // Get content by type
  async getContentByType(userId, contentType) {
    try {
      const { data, error } = await supabase
        .from('generated_content')
        .select('*')
        .eq('user_id', userId)
        .eq('content_type', contentType)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('❌ ContentService.getContentByType error:', error);
      throw error;
    }
  }

  // Get content statistics
  async getContentStats(userId) {
    try {
      const { data, error } = await supabase
        .from('generated_content')
        .select('content_type, created_at')
        .eq('user_id', userId);

      if (error) throw error;

      const stats = {
        total: data.length,
        byType: {},
        recentCount: 0
      };

      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);

      data.forEach(item => {
        // Count by type
        stats.byType[item.content_type] = (stats.byType[item.content_type] || 0) + 1;
        
        // Count recent content
        if (new Date(item.created_at) > lastWeek) {
          stats.recentCount++;
        }
      });

      return stats;
    } catch (error) {
      console.error('❌ ContentService.getContentStats error:', error);
      throw error;
    }
  }
}

module.exports = new ContentService();