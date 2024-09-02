import { Button } from '@/components/ui/button';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { Copy } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface PROPS {
  aiOutput: string
}

function OutputSection({aiOutput}: PROPS) {
  const editorRef: any = useRef()

  useEffect(() => {
    const editorInstance = editorRef.current.getInstance()
    editorInstance.setMarkdown(
      aiOutput ? aiOutput : "Your reply's cookin' up!"
    )
  }, [aiOutput])
  
  
  return (
    <div className='bg-white shadow-lg border rounded-lg'>
      <div className='flex justify-between items-center p-5'>
        <h2 className='text-primary text-2xl font-bold'>Your Response</h2>
        <Button onClick={() => navigator.clipboard.writeText(aiOutput)} className='gap-2'> <Copy className='w-4 h-5' /> Copy </Button>
      </div>


      <Editor
        ref={editorRef}
        initialEditType="wysiwyg"
        height="37.5rem"
        useCommandShortcut={true}
      />
    </div>
  )
}

export default OutputSection
