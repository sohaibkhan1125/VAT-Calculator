import React, { useState, useEffect } from 'react';
import ProfessionalEditor from './ProfessionalEditor';
import { useWebsiteSettings } from '../../contexts/WebsiteSettingsContext';

const ContentManagement = () => {
	const { settings, saving, saveSettings } = useWebsiteSettings();
	const [content, setContent] = useState('');
	const [success, setSuccess] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		loadContent();
	}, [settings.footerTopContent]);

	const loadContent = () => {
		try {
			if (typeof settings.footerTopContent === 'string') {
				setContent(settings.footerTopContent);
			}
		} catch (err) {
			console.warn('Error loading content:', err);
		}
	};

	const saveContent = async (newContent) => {
		setError(null);
		setSuccess(null);
		try {
			await saveSettings({ footerTopContent: newContent });
			setSuccess('Content saved successfully to Supabase!');
			// Update local state to match saved content
			setContent(newContent);
		} catch (err) {
			setError('Error saving content: ' + (err?.message || 'Unknown error'));
			console.error(err);
		}
	};

	return (
		<div className="bg-white rounded-lg shadow-lg p-6">
			<div className="mb-6">
				<h2 className="text-2xl font-bold text-gray-900 mb-2">Content Management</h2>
				<p className="text-gray-600">Create and manage content that will be displayed above the website footer.</p>
			</div>

			{success && (
				<div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
					{success}
				</div>
			)}

			{error && (
				<div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
					{error}
				</div>
			)}

			<div className="main-container">
				<ProfessionalEditor
					initialContent={content}
					onSave={saveContent}
					isSaving={saving}
				/>
			</div>
		</div>
	);
};

export default ContentManagement;


