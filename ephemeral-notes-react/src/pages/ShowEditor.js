import '../style.scss'

import React, { useState, useEffect, useRef } from 'react';

import { Color } from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit'

const MenuBar = ({ editor }) => {

  const [isMenuBarVisible, setIsMenuBarVisible] = useState(true);

  const toggleMenuBar = () => setIsMenuBarVisible(!isMenuBarVisible);

  if (!editor) {
    return null
  }

  return (
      <>
      <button type="button" onClick={toggleMenuBar} className="toggle-menu-btn">
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
          <button type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
            <i className="bi bi-rulers"></i> horizontal rule
          </button>
          <button type="button" onClick={() => editor.chain().focus().setHardBreak().run()}>
          <i className="bi bi-dash-lg"></i> line break
          </button>
          <button type="button"
              onClick={() => editor.chain().focus().undo().run()}
              disabled={
                  !editor.can()
                      .chain()
                      .focus()
                      .undo()
                      .run()
              }
          >
              <i className="bi bi-arrow-counterclockwise"></i> undo
          </button>
          <button type="button"
              onClick={() => editor.chain().focus().redo().run()}
              disabled={
                  !editor.can()
                      .chain()
                      .focus()
                      .redo()
                      .run()
              }
          >
              <i className="bi bi-arrow-clockwise"></i> redo
          </button>
          <button type="button"
              onClick={() => editor.chain().focus().toggleHighlight({ color: '#ffcc00' }).run()}
              className={editor.isActive('highlight') ? 'is-active' : ''}
          >
              <i className="bi bi-highlighter"></i> highlight
          </button>
          <br/>
          <br/>
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
      <div style={{ margin: '2px', height: '500px', overflow: 'auto', border: '2px solid #ccc', padding: '10px' }}>
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default ShowEditor;
  