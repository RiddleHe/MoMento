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
