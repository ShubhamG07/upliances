import { Editor } from '@tinymce/tinymce-react';
import { useState, useEffect,useRef } from "react";



const RichTextEditor = () => {

  const storedText = localStorage.getItem("userData")?.trim() || ""; 
  // Convert stored data to styled HTML if it's valid JSON
  const initialValue = isValidJSON(storedText) ? parseStoredData(storedText) : storedText;

  const [text, setText] = useState(initialValue);

  useEffect(() => {
    const handleStorageChange = () => {
      setText(parseStoredData(localStorage.getItem("userData"))); //  Auto-update when localStorage changes
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    localStorage.setItem("userData", text);
    
  }, [text]);

  //  Function to check if a string is valid JSON (prevents errors)
  function isValidJSON(data) {
    if (!data || typeof data !== "string") return false; // Ensure it's a valid string
    try {
      const parsed = JSON.parse(data);
      return typeof parsed === "object" && parsed !== null;
    } catch (error) {
      return false;
    }
  }

  //  Convert JSON object to formatted HTML for TinyMCE
  function parseStoredData(data) {
    try {
      const parsed = JSON.parse(data);
      return Object.entries(parsed)
      .map(([key, value]) => `<p>${key}: ${value}</p>`)
      .join("");; 
    } catch (error) {
      return data; 
    }
  }

  

  const editorRef=useRef(null);

  
 

  return (
    <div style={{ marginLeft: "50px", marginBottom: "50px", border: "2px solid black", backgroundColor: "white", padding: "25px", borderRadius: "8px", width: "50vw", zIndex: "1" }}>
      <h2 style={{ textAlign: "center" }}>Rich Text Editor</h2>
      <Editor
      apiKey='gdf6frhkd95h81dplffwitbbwvur9nlzenhwpw4czv0kn721'
      onInit={(_evt,editor)=>editorRef.current=editor}
      init={{
        height:300,
        menubar:false,
        plugins: [
          'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
          'checklist', 'mediaembed', 'casechange', 'export', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown','importword', 'exportword', 'exportpdf'
        ],
        toolbar: 'undo redo | blocks   bold italic underline strikethrough|   fontfamily fontsize   | align lineheight | checklist numlist bullist indent | emoticons charmap | removeformat',
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name',
        mergetags_list: [
          { value: 'First.Name', title: 'First Name' },
          { value: 'Email', title: 'Email' },
        ],
        ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
      }}
      initialValue={text}
      onChange={()=>setText(editorRef.current.getContent())}
    />
    </div>
  );
};

export default RichTextEditor;
