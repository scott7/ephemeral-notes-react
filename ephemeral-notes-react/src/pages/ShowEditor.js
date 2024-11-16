import '../style.scss'

import { Color } from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'

const MenuBar = () => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  return (
      <>
      <div className="menu-bar">
          <button
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
          <button
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
          <button
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
          <button
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
          <button
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
          <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          <i className="bi bi-eraser-fill"></i> clear marks
          </button>
          <button
              onClick={() => editor.chain().focus().setParagraph().run()}
              className={editor.isActive('paragraph') ? 'is-active' : ''}
          >
              <i className="bi bi-textarea-t"> </i>paragraph
          </button>
          <button
              onClick={() => editor.chain().focus().toggleHeading({level: 1}).run()}
              className={editor.isActive('heading', {level: 1}) ? 'is-active' : ''}
          >
              <i className="bi bi-type-h1"></i>
          </button>
          <button
              onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
              className={editor.isActive('heading', {level: 2}) ? 'is-active' : ''}
          >
              <i className="bi bi-type-h2"></i>
          </button>
          <button
              onClick={() => editor.chain().focus().toggleHeading({level: 3}).run()}
              className={editor.isActive('heading', {level: 3}) ? 'is-active' : ''}
          >
              <i className="bi bi-type-h3"></i>
          </button>
          <button
              onClick={() => editor.chain().focus().toggleHeading({level: 4}).run()}
              className={editor.isActive('heading', {level: 4}) ? 'is-active' : ''}
          >
              <i className="bi bi-type-h4"></i>
          </button>
          <button
              onClick={() => editor.chain().focus().toggleHeading({level: 5}).run()}
              className={editor.isActive('heading', {level: 5}) ? 'is-active' : ''}
          >
              <i className="bi bi-type-h5"></i>
          </button>
          <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editor.isActive('bulletList') ? 'is-active' : ''}
          >
              <i className="bi bi-list-ul"></i> bullet list
          </button>
          <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={editor.isActive('orderedList') ? 'is-active' : ''}
          >
               <i className="bi bi-list-ol"></i> ordered list
          </button>
          <button
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={editor.isActive('codeBlock') ? 'is-active' : ''}
          >
              <i className="bi bi-code-square"></i> code block
          </button>
          <button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={editor.isActive('blockquote') ? 'is-active' : ''}
          >
              <i className="bi bi-blockquote-left"></i> blockquote
          </button>
          <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
            <i className="bi bi-rulers"></i> horizontal rule
          </button>
          <button onClick={() => editor.chain().focus().setHardBreak().run()}>
          <i className="bi bi-dash-lg"></i> line break
          </button>
          <button
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
          <button
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
          <button
              onClick={() => editor.chain().focus().toggleHighlight().run()}
              className={editor.isActive('highlight') ? 'is-active' : ''}
          >
              <i className="bi bi-highlighter"></i> highlight
          </button>
          <br/>
          <br/>
          </div>
      </>
  )
}

const extensions = [
    Underline,
    Color.configure({types: [TextStyle.name, ListItem.name]}),
    TextStyle.configure({types: [ListItem.name]}),
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
    Highlight.configure({ multicolor: true })
]

const content = `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>the editor</strong>. 
<ul>
  <li>
    Bullet list with one
  </li>
  <li>
    Or more items
  </li>
</ul>

<pre><code class="language-css">test {
    code blocks
    ...
}</code></pre>

<blockquote>
  Blockquotes - 
  ...
</blockquote>

<p>
and more
</p>

</p>
`

const ShowEditor = () => {
  return (
      <div>
      <div style={{
          margin: '2px',
          width: '1300px',
          height: '500px',
          overflow: 'auto',
          border: '2px solid #ccc',
          focus: 'none'
      }}>
    <EditorProvider slotBefore={<MenuBar />} extensions={extensions} content={content}></EditorProvider>
      </div>
      </div>
  )
}

export default ShowEditor