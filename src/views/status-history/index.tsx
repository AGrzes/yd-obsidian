import { ItemView, Plugin, WorkspaceLeaf } from 'obsidian'
import { Root, createRoot } from 'react-dom/client'
const VIEW_TYPE = 'field-view'
const FIELD_NAME = 'state'

export function FieldDisplay({ value }: { value: any }) {
  return (
    <div className="p-2 text-lg">
      <strong>Field:</strong> {String(value)}
    </div>
  )
}

export class FieldView extends ItemView {
  reactRootEl: HTMLElement
  root: Root
  constructor(leaf: WorkspaceLeaf) {
    super(leaf)
  }

  getViewType() {
    return 'field-view'
  }

  getDisplayText() {
    return 'Frontmatter Field View'
  }

  async onOpen() {
    this.reactRootEl = this.containerEl.createDiv({ cls: 'field-view' })
    this.root = createRoot(this.contentEl)
    this.renderReact()

    this.registerEvent(this.app.metadataCache.on('changed', () => this.renderReact()))
    this.registerEvent(this.app.workspace.on('active-leaf-change', () => this.renderReact()))
  }

  async onClose() {
    this.root.unmount()
  }

  renderReact() {
    const file = this.app.workspace.getActiveFile()
    let value = '(no file)'

    if (file) {
      const meta = this.app.metadataCache.getFileCache(file)
      value = meta?.frontmatter?.[FIELD_NAME] ?? '(missing)'
    }

    this.root.render(<FieldDisplay value={value} />)
  }
}

export function onload(plugin: Plugin) {
  plugin.registerView(VIEW_TYPE, (leaf) => new FieldView(leaf))

  plugin.addCommand({
    id: 'toggle-field-view',
    name: 'Toggle Field View',
    callback: async () => {
      const leaves = plugin.app.workspace.getLeavesOfType(VIEW_TYPE)
      if (leaves.length > 0) {
        leaves.forEach((l) => l.detach())
      } else {
        const leaf = plugin.app.workspace.getRightLeaf(false)
        await leaf.setViewState({ type: VIEW_TYPE, active: true })
        plugin.app.workspace.revealLeaf(leaf)
      }
    },
  })
}

export function onunload(plugin: Plugin) {
  plugin.app.workspace.detachLeavesOfType(VIEW_TYPE)
}
