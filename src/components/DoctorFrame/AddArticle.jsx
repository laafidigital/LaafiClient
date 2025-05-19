import React ,{ useState}from 'react'
import { Editor } from '@tinymce/tinymce-react';

const AddArticle = () => {

  const [editorContent, setEditorContent] = useState('');
  

  const handleEditorChange = (content, editor) => {
    setEditorContent(content);
  };

  return (
    <div className='addarticle_main'>
      <Editor
        apiKey='pyuumsf06ri0vvdiyn3v0nnvnd6ky6uc4vs471myvf2o8kdz'
        init={{
             height:'600px',
             plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
             toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
             tinycomments_mode: 'embedded',
             tinycomments_author: 'Author name',
             mergetags_list: [
              { value: 'First.Name', title: 'First Name' },
             { value: 'Email', title: 'Email' },
          ],
        ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
      }}
      initialValue=""
      onEditorChange={handleEditorChange}
    />
    </div>
  )
}

export default AddArticle