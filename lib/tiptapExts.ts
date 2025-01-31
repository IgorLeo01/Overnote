import { StarterKit } from "@tiptap/starter-kit";
import { Underline } from "@tiptap/extension-underline";
import { Blockquote } from "@tiptap/extension-blockquote";
import { BulletList } from "@tiptap/extension-bullet-list";
import { HardBreak } from "@tiptap/extension-hard-break";
import { Heading } from "@tiptap/extension-heading";
import { TextAlign } from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";

export const tiptapExtensions = [
  StarterKit,
  Underline,
  Heading.configure({
    HTMLAttributes: {
      class: "text-xl font-bold",
      levels: [3],
    },
  }),
  BulletList.configure({
    HTMLAttributes: {
      class: "list-disc pl-4",
    },
  }),
  Blockquote.configure({
    HTMLAttributes: {
      class: "border-l-4 border-slate-300/30 pl-2 border-l-slate-400",
    },
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
    alignments: ["left", "center", "right"],
    defaultAlignment: "left",
  }),
  HardBreak.configure({
    keepMarks: false,
  }),
  Link.configure({
    HTMLAttributes: {
      class: "text-blue-500 underline",
    },
    defaultProtocol: "https",
  }),
];
