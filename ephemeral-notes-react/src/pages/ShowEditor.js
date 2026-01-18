import '../style.scss'

import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

import { Color } from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit'

const MenuBar = ({ editor }) => {
  const { isDarkMode } = useTheme();

  const [isMenuBarVisible, setIsMenuBarVisible] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const toggleMenuBar = () => setIsMenuBarVisible(!isMenuBarVisible);
  const toggleModal = () => setShowModal(!showModal);

  if (!editor) {
    return null
  }

  return (
      <>
      <button type="button" className="btn btn-dark" onClick={toggleModal}>?</button>
      &nbsp;&nbsp;&nbsp;
      <button type="button" onClick={toggleMenuBar} className="toggle-menu-btn" title="Shift+Enter to add a line break">
        {isMenuBarVisible ? <i className="bi bi-menu-down"></i> : <i className="bi bi-menu-up"></i>}
      </button>
      {isMenuBarVisible && (
      <div className="menu-bar">
          <button type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={
                  !editor.can()
                      .chain()
                      .focus()
                      .toggleBold()
                      .run()
              }
              className={editor.isActive('bold') ? 'is-active' : ''}
          >
              <i className="bi bi-type-bold"></i> bold
          </button>
          <button type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={
                  !editor.can()
                      .chain()
                      .focus()
                      .toggleItalic()
                      .run()
              }
              className={editor.isActive('italic') ? 'is-active' : ''}
          >
              <i className="bi bi-type-italic"></i> italic
          </button>
          <button type="button"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              disabled={
                  !editor.can()
                      .chain()
                      .focus()
                      .toggleUnderline()
                      .run()
              }
              className={editor.isActive('underline') ? 'is-active' : ''}
          >
              <i className="bi bi-type-underline"></i> underline
          </button>
          <button type="button"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              disabled={
                  !editor.can()
                      .chain()
                      .focus()
                      .toggleStrike()
                      .run()
              }
              className={editor.isActive('strike') ? 'is-active' : ''}
          >
                <i className="bi bi-type-strikethrough"></i> strike
          </button>
          <button type="button"
              onClick={() => editor.chain().focus().toggleCode().run()}
              disabled={
                  !editor.can()
                      .chain()
                      .focus()
                      .toggleCode()
                      .run()
              }
              className={editor.isActive('code') ? 'is-active' : ''}
          >
                <i className="bi bi bi-code"></i> code
          </button>
          <button type="button" onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          <i className="bi bi-eraser-fill"></i> clear marks
          </button>
          <button type="button"
              onClick={() => editor.chain().focus().setParagraph().run()}
              className={editor.isActive('paragraph') ? 'is-active' : ''}
          >
              <i className="bi bi-textarea-t"> </i>paragraph
          </button>
          <button type="button"
              onClick={() => editor.chain().focus().toggleHeading({level: 1}).run()}
              className={editor.isActive('heading', {level: 1}) ? 'is-active' : ''}
          >
              <i className="bi bi-type-h1"></i>
          </button>
          <button type="button"
              onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
              className={editor.isActive('heading', {level: 2}) ? 'is-active' : ''}
          >
              <i className="bi bi-type-h2"></i>
          </button>
          <button type="button"
              onClick={() => editor.chain().focus().toggleHeading({level: 3}).run()}
              className={editor.isActive('heading', {level: 3}) ? 'is-active' : ''}
          >
              <i className="bi bi-type-h3"></i>
          </button>
          <button type="button"
              onClick={() => editor.chain().focus().toggleHeading({level: 4}).run()}
              className={editor.isActive('heading', {level: 4}) ? 'is-active' : ''}
          >
              <i className="bi bi-type-h4"></i>
          </button>
          <button type="button"
              onClick={() => editor.chain().focus().toggleHeading({level: 5}).run()}
              className={editor.isActive('heading', {level: 5}) ? 'is-active' : ''}
          >
              <i className="bi bi-type-h5"></i>
          </button>
          <button type="button"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
                <i className="bi bi-list-ul"></i> bullet list
          </button>
          <button type="button"
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={editor.isActive('codeBlock') ? 'is-active' : ''}
          >
              <i className="bi bi-code-square"></i> code block
          </button>
          <button type="button"
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
          >
               <i className="bi bi-blockquote-left"></i> blockquote
          </button>
          <br/>
          <br/>
      </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={toggleModal}>
          <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content" style={{
              backgroundColor: 'var(--bg-panel)',
              borderColor: 'var(--border-default)',
              color: 'var(--text-primary)'
            }}>
              <div className="modal-header" style={{ borderColor: 'var(--border-default)' }}>
                <h5 className="modal-title" style={{ color: 'var(--text-primary)' }}>Tip</h5>
                <button
                  type="button"
                  className={`btn-close ${isDarkMode ? 'btn-close-white' : ''}`}
                  onClick={toggleModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p style={{ color: 'var(--text-primary)' }}>Shift+Enter to add a line break in the text editor</p>
              </div>
              <div className="modal-footer" style={{ borderColor: 'var(--border-default)' }}>
                <button type="button" className="btn btn-secondary" onClick={toggleModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
      </>
  )
}

const ShowEditor = ({ value, onChange }) => {
  const initialContentRef = useRef(value);

  const editor = useEditor({
    extensions: [
      Underline,
      Color.configure({types: [TextStyle.name, ListItem.name]}),
      TextStyle.configure({types: [ListItem.name]}),
      StarterKit.configure({
          bulletList: {
          keepMarks: true,
          keepAttributes: false,
          paragraph: false,
      },
      orderedList: {
      keepMarks: true,
      keepAttributes: false,
      },
}),
  Highlight.configure({ multicolor: true })
    ],
    content: initialContentRef.current || '',
    onUpdate: ({ editor }) => {
      const htmlContent = editor.getHTML();
      let cleanContent = htmlContent.replace(/\s/g, "\u00a0"); // convert whitespace to nbsp due to bug in handling spaces in the editor
      if (onChange) {
        onChange(cleanContent); // Notify the parent component of changes
      }
    },
  });

  useEffect(() => {
    if (editor && initialContentRef.current !== value) {
      editor.commands.setContent(value || ''); // Update only when `value` changes
      initialContentRef.current = value; // Update the ref
    }
  }, [value, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div>
      <div className="editor-shell">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default ShowEditor;
  