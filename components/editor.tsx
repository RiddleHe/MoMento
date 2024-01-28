"use client";

import { useTheme } from "next-themes";
import {
  BlockNoteEditor, defaultProps,
  PartialBlock, defaultBlockSchema,
} from "@blocknote/core";
import {
  BlockNoteView,
  createReactBlockSpec,
  useBlockNote,
  ReactSlashMenuItem,
  getDefaultReactSlashMenuItems,
  FormattingToolbarProps,
  FormattingToolbarPositioner,
  HyperlinkToolbarPositioner,
  SlashMenuPositioner, SideMenuPositioner, ImageToolbarPositioner
} from "@blocknote/react";
import "@blocknote/core/style.css";
import { useCompletion } from 'ai/react';

import { useEdgeStore } from "@/lib/edgestore";
import {HiOutlineGlobeAlt} from "react-icons/hi";
import {Button} from "@/components/ui/button";
import {useCallback} from "react";
import {BeatLoader} from "react-spinners";
import CustomFormattingToolBar from "@/components/custom-toolbar";

import { BiCode } from "react-icons/bi";
import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
};

const CodeBlockComponent = createReactBlockSpec({
  type: "codeblock",
  containsInlineContent: true,
  render: ({ block, editor }) => {
    const code = block.content.length ? block.content[0].text : "# enter code here" ;

    return (
      <div>
        <CodeMirror
          editorDidMount={editor => {
            setTimeout(() => editor.refresh(), 0);
            editor.setSize(null, "auto");
            editor.on('change', () => {
              editor.setSize(null, "auto");
            });
          }}
          options={{
            lineNumbers: true,
            mode: 'javascript',
            theme: 'material',
          }}
          value={code}
          onChange={(codeMirrorEditor, data, value) => {
            editor.updateBlock(block, {
              content: [{ type: 'text', text: value, styles: {} }],
            });
          }}
        />
      </div>
    );
  },
  propSchema: {
    ...defaultProps
  }
});

const Editor = ({
  onChange,
  initialContent,
  editable
}: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({
      file
    });

    return response.url;
  }

  const insertCodeExecute = (editor: BlockNoteEditor) => {
    // Block that the text cursor is currently in.
    const currentBlock = editor.getTextCursorPosition().block;

    // New block we want to insert.
    const newCodeBlock = {
      type: "codeblock" as const,
      content: [{ type: "text", text: "Hello world", styles: { bold: true } }],
    } as const;

    // Inserting the new block after the current one.
    editor.insertBlocks([newCodeBlock], currentBlock, "before");

  };

  const insertCodeBlock: ReactSlashMenuItem = {
    name: "Insert Code",
    execute: insertCodeExecute,
    aliases: ["code", "cd"],
    group: "Code",
    icon: <BiCode />,
    hint: "Inserts a code block (hint)",
  }

  const customSchema = {
    ...defaultBlockSchema,
    "codeblock": CodeBlockComponent,
  };

  const insertCode = (editor: BlockNoteEditor) => {
    // Block that the text cursor is currently in.
    const currentBlock = editor.getTextCursorPosition().block;

    const formattedCode = `
    public class Main {
      int x = 5;
    
      public static void main(String[] args) {
        Main myObj1 = new Main();  // Object 1
        Main myObj2 = new Main();  // Object 2
        System.out.println(myObj1.x);
        System.out.println(myObj2.x);
      }
    }
    `;

    // New block we want to insert.
    const codeBlock = {
      type: "paragraph" as const,
      content: [{ type: "text", text: formattedCode, styles: { code: true } }],
    } as const;

    // Inserting the new block after the current one.
    editor.insertBlocks([codeBlock], currentBlock, "before");
  };

  const insertCodeItem: ReactSlashMenuItem = {
    name: "Insert Code",
    execute: insertCode,
    aliases: ["code", "codeblock"],
    group: "Other",
    icon: <HiOutlineGlobeAlt size={18} />,
    hint: "Inserts a code block",
  }

  const newSlashMenuItems= [
      ...getDefaultReactSlashMenuItems(),
      insertCodeBlock,
      insertCodeItem,
  ]

  const editor: BlockNoteEditor = useBlockNote({
    blockSchema: customSchema,
    editable,
    initialContent:
      initialContent
      ? JSON.parse(initialContent) as PartialBlock[]
      : undefined,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
    slashMenuItems: newSlashMenuItems,
    uploadFile: handleUpload,
  })

  const {
    complete,
    isLoading} = useCompletion({
    api: '/api/chat'
  });

  const respondToUser = useCallback(
      async (prompt: string) => {
        const response = await complete(prompt);
        const responseString = `${response}`;
        editor.insertBlocks(
            [{content: responseString}],
            editor.getTextCursorPosition().block,
            "after"
        );
      },
      [complete]
  )

  return (
    <div>
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      >
      </BlockNoteView>
      <Button
        onClick={() => {
          respondToUser(editor.getTextCursorPosition().block.content[0].text);
        }}
        className="rounded-full ml-10 mt-4 transition hover:bg-primary/90 bg-primary/80 px-4 py-2"
      >
        {isLoading ?
            <BeatLoader size={5} color={"black"} />
            : "Generate"}
      </Button>
    </div>
  )
}

export default Editor;
