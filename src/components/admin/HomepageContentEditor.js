import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Editor } from '@tinymce/tinymce-react';
import { 
  Home, 
  Save, 
  RotateCcw, 
  Eye,
  FileText,
  AlertCircle
} from 'lucide-react';
import { useWebsiteSettings } from '../../contexts/WebsiteSettingsContext';

export default function HomepageContentEditor() {
  const { settings, saving, firebaseAvailable, saveSettings } = useWebsiteSettings();
  const [content, setContent] = useState(settings.homepageContent || '');
  const [hasChanges, setHasChanges] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    setContent(settings.homepageContent || '');
  }, [settings.homepageContent]);

  const handleContentChange = (newContent) => {
    setContent(newContent);
    setHasChanges(newContent !== (settings.homepageContent || ''));
  };

  const handleSave = async () => {
    try {
      await saveSettings({ homepageContent: content });
      setHasChanges(false);
      setSaveMessage('Homepage content saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('Error saving homepage content. Please try again.');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const handleReset = async () => {
    try {
      setContent('');
      await saveSettings({ homepageContent: '' });
      setHasChanges(false);
      setSaveMessage('Homepage content reset successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('Error resetting homepage content. Please try again.');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const togglePreview = () => {
    setPreviewMode(!previewMode);
  };

  return (
    <div className="p-6 h-full">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Homepage Content Editor</h2>
              <p className="text-gray-600">
                Create and edit content that appears below the calculator on your homepage.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${firebaseAvailable ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
              <span className="text-sm text-gray-600">
                {firebaseAvailable ? 'Connected to Firebase' : 'Using local storage'}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Editor Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Content Editor</h3>
                  <p className="text-sm text-gray-600">
                    Use the rich text editor to create engaging homepage content.
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={togglePreview}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    previewMode 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  <span>{previewMode ? 'Edit Mode' : 'Preview Mode'}</span>
                </motion.button>
              </div>
            </div>

            {previewMode ? (
              <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Content Preview</h4>
                {content ? (
                  <div 
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-8 h-8 text-gray-400" />
                    </div>
                    <h4 className="text-lg font-medium text-gray-600 mb-2">No Content Added</h4>
                    <p className="text-gray-500">Switch to Edit Mode to add homepage content.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-lg border bg-white p-2">
                <Editor
                  apiKey='f08kw0ml5k8dqbktq0eeba9walbjg5fs9vwobqtcgwzcant5'
                  value={content}
                  onEditorChange={handleContentChange}
                  init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                      'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                      'checklist', 'mediaembed', 'casechange', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker',
                      'permanentpen', 'powerpaste', 'advtable', 'advcode', 'advtemplate', 'ai', 'uploadcare', 'mentions',
                      'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss',
                      'markdown', 'importword', 'exportword', 'exportpdf'
                    ],
                    toolbar:
                      'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                    tinycomments_mode: 'embedded',
                    tinycomments_author: 'Author name',
                    mergetags_list: [
                      { value: 'First.Name', title: 'First Name' },
                      { value: 'Email', title: 'Email' },
                    ],
                    ai_request: (request, respondWith) =>
                      respondWith.string(() =>
                        Promise.reject('See docs to implement AI Assistant')
                      ),
                    uploadcare_public_key: '194afd35149e4476304d',
                  }}
                  initialValue="Welcome to TinyMCE!"
                />
              </div>
            )}
          </motion.div>

          {/* Live Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Preview</h3>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Home className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold text-gray-900">Homepage Content</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                This is how your content will appear below the calculator on the homepage.
              </p>
              
              {content ? (
                <div 
                  className="prose max-w-none border border-gray-200 rounded-lg p-4 bg-gray-50"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              ) : (
                <div className="text-center py-8 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FileText className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500 italic">No content added yet</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Save & Reset Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Apply Changes</h3>
                <p className="text-sm text-gray-600">
                  Save your homepage content or reset to empty.
                </p>
              </div>
              <div className="flex items-center space-x-4">
                {saveMessage && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      saveMessage.includes('successfully')
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {saveMessage}
                  </motion.div>
                )}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleReset}
                  disabled={saving || !content}
                  className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>Reset Content</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  disabled={saving || !hasChanges}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      <span>Save Content</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Help Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-yellow-50 border border-yellow-200 rounded-xl p-6"
          >
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-yellow-800 mb-2">Content Tips</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Use headings to structure your content (H1, H2, H3)</li>
                  <li>• Add images, links, and formatting to make content engaging</li>
                  <li>• Preview your content before saving to see how it will look</li>
                  <li>• Content will appear below the calculator on your homepage</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
