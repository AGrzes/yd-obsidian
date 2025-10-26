export interface DataviewApi {
  /** Returns the Dataview page object for a given path. */
  page(path: string): Record<string, any> | null
  /** Returns the Dataview page object for the current note. */
  current(): Record<string, any> | null
  /** Executes a Dataview query (TABLE/LIST/etc). Returns a DataviewJS result. */
  query(query: string): Promise<{ success: boolean; value: any }>
  /** Executes a Dataview inline query (no await). */
  tryQuery(query: string): { success: boolean; value: any }
  /** Utility for rendering inline markdown in DataviewJS blocks. */
  renderValue(value: any, container: HTMLElement): void
  /** Dataview version string */
  version: string
  /** Access Dataview indices, pages, etc. */
  pages(query?: string): any
}

declare module 'obsidian' {
  interface App {
    plugins: {
      plugins: Record<string, any> // all loaded plugins
      enabledPlugins: Set<string>
      getPlugin(id: string): any
      disablePlugin(id: string): Promise<void>
      enablePlugin(id: string): Promise<void>
    }
  }
}
