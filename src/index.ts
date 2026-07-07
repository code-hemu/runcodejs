import { Editor } from './editor.js'
import { Preview } from './preview.js'
import { Tabs } from './tabs.js'
import { Toolbar } from './toolbar.js'
import { injectStyles, addThemeToStylesheet } from "./style.js";
import { addTheme } from "./theme.js";
import { qs, qsa, createElement, debounce } from './utils.js'

type EditorTab = 'html' | 'css' | 'js';

interface DefaultTabConfig {
  editor?: EditorTab | null
  preview?: boolean
}

interface ExtractSourceItem {
  selector: string | string[]
  target?: string
  position?: 'replace' | 'before' | 'after' | 'prepend' | 'append'
}

interface ExtractSource {
  html?: ExtractSourceItem[]
  css?: ExtractSourceItem[]
  js?: ExtractSourceItem[]
}

interface ExtractConfig {
  source: ExtractSource
}

interface PreviewConfig {
  live?: boolean
  debounce?: number
  zoom?: number
}

interface SecurityConfig {
  network?: boolean
  dialogs?: boolean
}

interface RunCodeOptions {
  element?: string | HTMLElement
  theme?: string
  clickToLoad?: boolean
  editable?: boolean
  security?: SecurityConfig
  defaultTab?: string | DefaultTabConfig
  preview?: PreviewConfig
  code?: { html?: string; css?: string; js?: string }
  extract?: ExtractConfig
}

export default class RunCode {
  options: RunCodeOptions
  container: HTMLElement | null
  root: HTMLElement
  editor: Editor | null
  preview: Preview | null
  tabs: Tabs | null
  toolbar: Toolbar | null

  static instances = new WeakMap<HTMLElement, RunCode>()

  static defineTheme(name: string, colors: Record<string, string>, base?: string) {
    addTheme(name, colors, base)
    addThemeToStylesheet(name)
  }

  constructor(options: RunCodeOptions = {}) {
    this.options = {
      element: '.rc-container',
      theme: 'dark',
      clickToLoad: false,
      editable: true,
      security: { network: false, dialogs: false },
      defaultTab: { editor: 'html', preview: true },
      preview: { live: true, debounce: 1000, zoom: 1 },
      ...options
    }

    this.container = null
    this.editor = null
    this.preview = null
    this.tabs = null
    this.toolbar = null
    this.init()
  }

  init(): this {
    const selector = this.options.element
    this.container = typeof selector === 'string'
      ? qs(selector)
      : selector as HTMLElement

    if (this.container && RunCode.instances.has(this.container)) {
      console.warn(
        `[RunCode] Element "${selector}" already has a RunCode instance. Call destroy() first to recreate.`
      )
      return this
    }

    if (!this.container) {
      if (typeof selector !== "string") return this;

      this.container = createElement("div");

      if (selector.startsWith("#")) {
        this.container.id = selector.slice(1);
      } else if (selector.startsWith(".")) {
        this.container.className = selector.slice(1);
      }

      document.body.appendChild(this.container);
    } else {
      this.container.replaceChildren();
    }

    this.container.classList.add('rc-container');

    RunCode.instances.set(this.container, this)

    this.root = createElement("div", {
      className: "rc-editor"
    });

    this.container.appendChild(this.root);

    this._build()

    this._switchToTab(this.options.defaultTab!)

    if (this.options.extract) {
      this.options.code = this._runExtract()
    }

    if (this.options.code) {
      this.editor!.setCode(this.options.code)
      if (this.options.clickToLoad) {
        const { html = '', css = '' } = this.options.code
        this.preview!.renderStatic(html, css)
      } else {
        this._execute()
      }
    }

    const zoom = this.options.preview?.zoom
    if (zoom && zoom !== 1) {
      this.toolbar!.setZoom(zoom)
    }

    return this
  }

  _build() {
    injectStyles()
    addThemeToStylesheet(this.options.theme!)
    this.container!.classList.add('rc-theme-' + this.options.theme!)

    const onInput = debounce(() => {
      if (this.options.preview?.live) this._execute()
    }, this.options.preview?.debounce ?? 300)

    this.editor = new Editor(this.root, this.options.editable!, onInput)

    this.preview = new Preview(
      this.root,
      this.options.security!.network!,
      this.options.security!.dialogs!
    )

    this.tabs = new Tabs(this.root, this.editor, this.preview, (tab) => {
      if (tab === 'result') this._execute()
    })

    this.toolbar = new Toolbar(this.root, {
      clickToLoad: this.options.clickToLoad!,
      onRun: () => this._execute(),
      onRerun: () => this._execute(),
      onZoom: (level) => this.preview!.setZoom(level)
    })

    const editorContainer = createElement('div', { className: 'rc-workspace' })
    editorContainer.appendChild(this.editor!.panel)
    editorContainer.appendChild(this.preview!.panel)

    if (this.toolbar!.wrapper){
      this.preview!.panel.appendChild(this.toolbar!.wrapper)
    }

    this.root.appendChild(this.tabs!.bar)
    this.root.appendChild(editorContainer)
    this.root.appendChild(this.toolbar!.footer)
  }

  _execute() {
    const code = this.editor!.getCode()
    this.preview!.execCode(code)
  }

  runCode() {
    this._execute()
  }

  setCode(code: { html?: string; css?: string; js?: string }) {
    this.editor?.setCode(code)
  }

  private _readContent(selector: string | string[]): string {
    const selectors = Array.isArray(selector) ? selector : [selector]
    return selectors.flatMap(s => qsa(s).map(el => el.textContent ?? '')).join('\n')
  }

  private _assembleItems(items: ExtractSourceItem[]): string {
    let result = ''
    for (const item of items) {
      const content = this._readContent(item.selector)
      if (!item.target) {
        result += content
        continue
      }
      const target = item.target
      switch (item.position ?? 'replace') {
        case 'replace':
          result = result.replace(target, content)
          break
        case 'before':
        case 'append':
          result = result.replace(target, content + '\n' + target)
          break
        case 'after':
        case 'prepend':
          result = result.replace(target, target + '\n' + content)
          break
      }
    }
    return result
  }

  private _runExtract(): { html: string; css: string; js: string } {
    const source = this.options.extract!.source
    return {
      html: source.html ? this._assembleItems(source.html) : '',
      css: source.css ? this._assembleItems(source.css) : '',
      js: source.js ? this._assembleItems(source.js) : ''
    }
  }

  _switchToTab(tab: string | DefaultTabConfig) {
    if (typeof tab === 'string') {
      this.root.querySelectorAll(".rc-tab").forEach(el => {
        el.classList.toggle("rc-active", (el as HTMLElement).dataset.tab === tab)
      })
      this.root.querySelectorAll(".rc-panel").forEach(el => {
        el.classList.toggle("rc-active", (el as HTMLElement).dataset.lang === tab)
      })
      this.root.querySelector(".rc-editors")
        ?.classList.toggle("rc-active", tab !== "result")
      if (tab !== "result") {
        this.root.querySelector(".rc-editors")?.classList.remove("rc-full")
      }
      this.root.querySelector(".rc-preview")
        ?.classList.toggle("rc-active", tab === "result")

      return
    }

    const editorTab = tab.editor === undefined ? 'html' : tab.editor;
    const showPreview = tab.preview !== false;
    const onlyShowPreview = !editorTab && showPreview;

    this.root.querySelectorAll(".rc-tab").forEach(el => {
      const tabName = (el as HTMLElement).dataset.tab;

      const active =
        onlyShowPreview
          ? tabName === "result"
          : editorTab !== null && tabName === editorTab;

      el.classList.toggle("rc-active", active);
    });

    this.root.querySelectorAll(".rc-panel").forEach(el => {
      el.classList.toggle("rc-active", editorTab !== null && (el as HTMLElement).dataset.lang === editorTab)
    })
    this.root.querySelector(".rc-editors")
      ?.classList.toggle("rc-active", editorTab !== null)
    this.root.querySelector(".rc-editors")
      ?.classList.toggle("rc-full", !showPreview)

    this.root.querySelector(".rc-editors")
        ?.classList.toggle("rc-active", !onlyShowPreview)
      this.root.querySelector(".rc-preview")
        ?.classList.toggle("rc-active", onlyShowPreview)
  }

  destroy() {
    if (this.container && RunCode.instances.has(this.container)) {
      RunCode.instances.delete(this.container)
    }
    if (this.root && this.root.parentNode) {
      this.root.parentNode.removeChild(this.root)
    }
    this.container = null
    this.editor = null
    this.preview = null
    this.tabs = null
    this.toolbar = null
  }

  setTheme(theme: string) {
    const prev = this.options.theme
    this.options.theme = theme
    if (this.container) {
      this.container.classList.replace('rc-theme-' + prev, 'rc-theme-' + theme)
    }
  }
}
