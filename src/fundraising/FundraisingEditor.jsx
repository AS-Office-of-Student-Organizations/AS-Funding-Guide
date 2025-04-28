"use client"

import { useState, useEffect } from "react"
import { EditorContent, useEditor } from "@tiptap/react"
import { extensions, MenuBar } from "@/components/TipTap"
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore"
import { db } from "@/data/firebase"
import "./FundraisingEditor.css"

const FundraisingEditor = () => {
  const [content, setContent] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")

  const editor = useEditor({
    extensions,
    content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML())
    },
  })

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docRef = doc(db, "public", "fundraising")
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          setContent(docSnap.data().content)
        } else {
          // If document doesn't exist, create default content
          setContent(`
            <h1>Fundraising Guide</h1>
            <p>This is the editable fundraising guide. Add your content here.</p>
            <h2>Introduction</h2>
            <p>Start with an introduction to fundraising for student organizations.</p>
          `)
        }
      } catch (error) {
        console.error("Error fetching fundraising content:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchContent()
  }, [])

  useEffect(() => {
    if (editor && content && isLoading) {
      editor.commands.setContent(content)
      setIsLoading(false)
    }
  }, [editor, content, isLoading])

  const handleSave = async () => {
    if (!content) return

    setIsSaving(true)
    setSaveMessage("")

    try {
      const docRef = doc(db, "public", "fundraising")
      await updateDoc(docRef, { content }, { merge: true }).catch(async (error) => {
        // If document doesn't exist, create it
        if (error.code === "not-found") {
          await setDoc(docRef, { content })
        } else {
          throw error
        }
      })

      setSaveMessage("Content saved successfully!")
      setTimeout(() => setSaveMessage(""), 3000)
    } catch (error) {
      console.error("Error saving content:", error)
      setSaveMessage("Error saving content. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return <div className="loading">Loading editor...</div>
  }

  return (
    <div className="fundraising-editor">
      <div className="editor-header">
        <h1>Edit Fundraising Guide</h1>
        <div className="editor-actions">
          <button className={`save-button ${isSaving ? "saving" : ""}`} onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
          {saveMessage && <span className="save-message">{saveMessage}</span>}
        </div>
      </div>

      <div className="editor-container">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} className="editor-content" />
      </div>
    </div>
  )
}

export default FundraisingEditor
