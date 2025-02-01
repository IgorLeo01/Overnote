import { StarterKit } from "@tiptap/starter-kit";
import { Underline } from "@tiptap/extension-underline";
import { TextAlign } from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import { Placeholder } from "@tiptap/extension-placeholder";

export const tiptapExtensions = [
  StarterKit,
  Underline,
  TextAlign.configure({
    types: ["heading", "paragraph"],
    alignments: ["left", "center", "right"],
    defaultAlignment: "left",
  }),
  Link.configure({
    HTMLAttributes: {
      class: "text-blue-500 underline",
    },
    defaultProtocol: "https",
  }),
  Placeholder.configure({
    placeholder: 'What is on your mind?',  
    includeChildren: false, 
  }),
];
