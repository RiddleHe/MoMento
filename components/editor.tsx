"use client";

import { useTheme } from "next-themes";
import {
  BlockNoteEditor, defaultProps,
  PartialBlock, defaultBlockSchema,
} from "@blocknote/core";
import {
  BlockNoteView, createReactBlockSpec,
  useBlockNote, ReactSlashMenuItem,
    getDefaultReactSlashMenuItems
} from "@blocknote/react";
import "@blocknote/core/style.css";

import { useEdgeStore } from "@/lib/edgestore";
import {HiOutlineGlobeAlt} from "react-icons/hi";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
};

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

  const insertCode = (editor: BlockNoteEditor) => {
    // Block that the text cursor is currently in.
    const currentBlock = editor.getTextCursorPosition().block;

    const formattedCode = `
    function greet() {
        console.log("Hello World");
    }
    `;

    // New block we want to insert.
    const codeBlock = {
      type: "paragraph" as const,
      content: [{ type: "text", text: formattedCode, styles: { bold: true } }],
    } as const;

    // Inserting the new block after the current one.
    editor.insertBlocks([codeBlock], currentBlock, "before");
  };

  const insertCodeItem: ReactSlashMenuItem = {
    name: "Insert Code",
    execute: insertCode,
    aliases: ["code", "cd"],
    group: "Other",
    icon: <HiOutlineGlobeAlt size={18} />,
    hint: "Inserts a code block",
  }

  const newSlashMenuItems= [
      ...getDefaultReactSlashMenuItems(),
      insertCodeItem,
  ]

  const editor: BlockNoteEditor = useBlockNote({
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

  return (
    <div>
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      />
    </div>
  )
}

export default Editor;
