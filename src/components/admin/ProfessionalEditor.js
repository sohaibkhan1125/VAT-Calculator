import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import './ProfessionalEditor.css';

const ProfessionalEditor = ({ initialContent, onSave, isSaving }) => {
    const editorRef = useRef(null);
    const quillInstance = useRef(null);
    const [wordCount, setWordCount] = useState(0);
    const [charCount, setCharCount] = useState(0);
    const [lastSaved, setLastSaved] = useState('Unsaved');
    const [showCodeModal, setShowCodeModal] = useState(false);
    const [codeOutput, setCodeOutput] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [toastMessage, setToastMessage] = useState({ show: false, message: '', type: 'success' });

    // Initialize Quill
    useEffect(() => {
        if (!editorRef.current || quillInstance.current) return;

        // Custom Toolbar Configuration
        const toolbarOptions = [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            ['blockquote', 'code-block'],
            ['link', 'image'],
            ['clean']
        ];

        quillInstance.current = new Quill(editorRef.current, {
            theme: 'snow',
            modules: {
                toolbar: {
                    container: toolbarOptions,
                    handlers: {
                        image: imageHandler
                    }
                },
                history: {
                    delay: 1000,
                    maxStack: 50,
                    userOnly: true
                }
            },
            placeholder: 'Start writing your document here...'
        });

        // Set initial content
        if (initialContent) {
            quillInstance.current.root.innerHTML = initialContent;
            updateStats();
        }

        // Text Change Listener
        quillInstance.current.on('text-change', () => {
            updateStats();
        });

        // Load theme preference
        const savedTheme = localStorage.getItem('editor_theme_preference');
        if (savedTheme === 'dark') {
            setIsDarkMode(true);
        }

    }, []);

    // Sync initialContent changes (optional, if external updates happen)
    useEffect(() => {
        if (quillInstance.current && initialContent && quillInstance.current.root.innerHTML !== initialContent) {
            // Only update if significantly different to avoid cursor jumps or assume it's initial load
            // checking length difference or just relying on internal state is better usually
        }
    }, [initialContent]);

    const updateStats = () => {
        if (!quillInstance.current) return;
        const text = quillInstance.current.getText();
        const words = text.trim().length === 0 ? 0 : text.trim().split(/\s+/).length;
        const chars = text.length > 1 ? text.length - 1 : 0;
        setWordCount(words);
        setCharCount(chars);
    };

    const imageHandler = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = () => {
            const file = input.files[0];
            if (/^image\//.test(file.type)) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    const range = quillInstance.current.getSelection();
                    quillInstance.current.insertEmbed(range.index, 'image', reader.result);
                    quillInstance.current.setSelection(range.index + 1);
                    showToast('Image inserted successfully');
                };
            } else {
                showToast('Please select a valid image file', 'error');
            }
        };
    };

    const handleSave = async () => {
        if (!quillInstance.current) return;
        const content = quillInstance.current.root.innerHTML;

        if (onSave) {
            await onSave(content);
        }

        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setLastSaved(`Saved at ${timeString}`);
        showToast('Document saved successfully');
    };

    const handleClear = () => {
        if (window.confirm('Are you sure you want to clear the editor? This cannot be undone.')) {
            quillInstance.current.setContents([]);
            showToast('Editor cleared');
        }
    };

    const toggleTheme = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        localStorage.setItem('editor_theme_preference', newMode ? 'dark' : 'light');
    };

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    const convertToCode = () => {
        if (!quillInstance.current) return;
        const html = quillInstance.current.root.innerHTML;
        const formatted = formatHTML(html);
        setCodeOutput(formatted);
        setShowCodeModal(true);
    };

    const formatHTML = (html) => {
        let formatted = '';
        let indent = '';
        const tab = '    ';
        html.split(/>\s*</).forEach(function (element) {
            if (element.match(/^\/\w/)) {
                indent = indent.substring(tab.length);
            }
            formatted += indent + '<' + element + '>\r\n';
            if (element.match(/^<?\w[^>]*[^\/]$/) && !element.startsWith("input") && !element.startsWith("img") && !element.startsWith("br")) {
                indent += tab;
            }
        });
        return formatted.substring(1, formatted.length - 3);
    };

    const copyCode = () => {
        navigator.clipboard.writeText(codeOutput).then(() => {
            showToast('HTML code copied to clipboard');
        });
    };

    const downloadHtml = () => {
        const blob = new Blob([codeOutput], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'document.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const showToast = (msg, type = 'success') => {
        setToastMessage({ show: true, message: msg, type });
        setTimeout(() => {
            setToastMessage(prev => ({ ...prev, show: false }));
        }, 3000);
    };

    return (
        <div className={`professional-editor-wrapper ${isDarkMode ? 'dark-mode' : ''}`}>
            {/* Header */}
            <header className="pe-header">
                <div className="pe-logo">
                    <i className="fas fa-pen-nib"></i>
                    Professional Editor
                </div>
                <div className="pe-header-controls">
                    <button className="pe-btn pe-btn-primary" onClick={convertToCode}>
                        <i className="fas fa-code"></i> Convert Text to Code
                    </button>
                    <div style={{ width: '1px', height: '24px', background: 'var(--border-color)', margin: '0 5px' }}></div>
                    <button className="pe-btn pe-btn-icon" onClick={toggleTheme} title="Toggle Dark Mode">
                        <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
                    </button>
                    <button className="pe-btn pe-btn-icon" onClick={toggleFullscreen} title="Fullscreen">
                        <i className={`fas ${isFullscreen ? 'fa-compress' : 'fa-expand'}`}></i>
                    </button>
                    <button className="pe-btn pe-btn-icon" onClick={handleClear} title="Clear All">
                        <i className="fas fa-trash-alt"></i>
                    </button>
                    <button className="pe-btn" onClick={handleSave} title="Save Content" disabled={isSaving}>
                        <i className="fas fa-save"></i> {isSaving ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </header>

            {/* Main Editor */}
            <div className={`pe-editor-container ${isFullscreen ? 'fullscreen' : ''}`}>
                <div ref={editorRef} style={{ height: '100%', border: 'none' }}></div>
            </div>

            {/* Status Bar */}
            <div className="pe-stats-bar">
                <div className="pe-stats-group">
                    <span>{wordCount} words</span>
                    <span>{charCount} characters</span>
                </div>
                <div className="pe-stats-group">
                    <span>{lastSaved}</span>
                </div>
            </div>

            {/* View Code Modal */}
            {showCodeModal && (
                <div className="pe-modal active" onClick={(e) => { if (e.target.className.includes('pe-modal')) setShowCodeModal(false) }}>
                    <div className="pe-modal-content" onClick={e => e.stopPropagation()}>
                        <div className="pe-modal-header">
                            <h3><i className="fas fa-file-code"></i> Generated HTML Code</h3>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button className="pe-btn" onClick={copyCode}>
                                    <i className="fas fa-copy"></i> Copy HTML
                                </button>
                                <button className="pe-btn" onClick={downloadHtml}>
                                    <i className="fas fa-download"></i> Download .html
                                </button>
                                <button className="pe-btn pe-btn-icon" onClick={() => setShowCodeModal(false)}>
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                        </div>
                        <div className="pe-modal-body">
                            <textarea
                                className="pe-code-output"
                                value={codeOutput}
                                readOnly
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Toast Notification */}
            <div className={`pe-toast ${toastMessage.show ? 'show' : ''}`} style={{ borderLeftColor: toastMessage.type === 'error' ? 'var(--error-color)' : 'var(--primary-color)' }}>
                <i className={`fas ${toastMessage.type === 'error' ? 'fa-times-circle' : 'fa-check-circle'}`}></i>
                <span>{toastMessage.message}</span>
            </div>
        </div>
    );
};

export default ProfessionalEditor;
