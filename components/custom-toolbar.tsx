"use client";

import {
    BlockTypeDropdown, ColorStyleButton, CreateLinkButton,
    FormattingToolbarProps, NestBlockButton, TextAlignButton, ToggledStyleButton,
    Toolbar, UnnestBlockButton
} from "@blocknote/react";

const CustomFormattingToolBar = (props: FormattingToolbarProps) => {
    return (
        <Toolbar>
            <BlockTypeDropdown {...props} />
            <ToggledStyleButton editor={props.editor} toggledStyle={"bold"} />
            <ToggledStyleButton editor={props.editor} toggledStyle={"italic"} />
            <ToggledStyleButton editor={props.editor} toggledStyle={"underline"} />
            <ToggledStyleButton editor={props.editor} toggledStyle={"strike"} />
            <ToggledStyleButton editor={props.editor} toggledStyle={"code"} />

            <TextAlignButton editor={props.editor as any} textAlignment={"left"} />
            <TextAlignButton editor={props.editor as any} textAlignment={"center"} />
            <TextAlignButton editor={props.editor as any} textAlignment={"right"} />

            <ColorStyleButton editor={props.editor} />
            <NestBlockButton editor={props.editor} />
            <UnnestBlockButton editor={props.editor} />
            <CreateLinkButton editor={props.editor} />
        </Toolbar>
    )
}

export default CustomFormattingToolBar;