import { Plugin } from 'obsidian';
import { createRemoteServer } from './remote.js'
import { onload, onunload } from './views/status-history/index.js'


export default class YdPlugin extends Plugin {
  remoteServer: ReturnType<typeof createRemoteServer>

  async onload() {
    console.log('Loading plugin')
    this.remoteServer = createRemoteServer(this.app, this.app.plugins.getPlugin('dataview')?.api)
    onload(this)
  }

  async onunload() {
    console.log('Unloading plugin')
    this.remoteServer?.close()
    onunload(this)
  }
}