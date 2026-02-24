import { EditorView } from 'codemirror';
import { tags as t } from '@lezer/highlight';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';

export const editorTheme = EditorView.theme(
  {
    '&': {
      color: 'var(--text-primary)',
      backgroundColor: 'var(--bg-surface)',
      fontFamily: 'var(--font-mono)',
    },
    '.cm-content': {
      caretColor: '#E93535',
    },
    '.cm-cursor, .cm-dropCursor': {
      borderLeftColor: '#E93535',
    },
    '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
      backgroundColor: 'rgba(233, 53, 53, 0.2)',
    },
    '.cm-activeLine': {
      backgroundColor: 'rgba(255, 255, 255, 0.03)',
    },
    '.cm-gutters': {
      backgroundColor: 'var(--bg-body)',
      color: 'var(--text-tertiary)',
      borderRight: '1px solid var(--border-subtle)',
    },
    '.cm-lineNumbers .cm-gutterElement': {
      padding: '0 10px 0 5px !important',
      minWidth: '35px',
      textAlign: 'right',
    },
    '.cm-activeLineGutter': {
      backgroundColor: 'rgba(255, 255, 255, 0.03)',
      color: 'var(--text-primary)',
    },
  },
  { dark: true }
);

export const editorHighlightStyle = HighlightStyle.define([
  { tag: [t.keyword, t.name], color: '#C678DD' },
  { tag: [t.deleted, t.character, t.propertyName, t.macroName], color: '#dd4a56' },
  { tag: [t.function(t.variableName), t.labelName], color: 'var(--accent-blue)' },
  { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: '#D19A66' },
  { tag: [t.definition(t.name), t.separator], color: '#d8e0f0' },
  {
    tag: [t.typeName, t.className, t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
    color: '#D19A66',
  },
  { tag: [t.operator, t.operatorKeyword, t.url, t.escape, t.regexp, t.link, t.special(t.string)], color: '#56B6C2' },
  { tag: [t.meta, t.comment], color: '#5C6370', fontStyle: 'italic' },
  { tag: t.heading, fontWeight: 'bold', color: '#E06C75' },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: '#D19A66' },
  { tag: [t.processingInstruction, t.string, t.inserted], color: '#98C379' },
  { tag: t.invalid, color: '#ffffff' },
]);

export const editorSetup = [editorTheme, syntaxHighlighting(editorHighlightStyle)];
