import { bodyLoader } from 'src/util/loader'
import { getLocalStorage } from 'src/util/storage'
import * as interactions from './interactions'
import { injectCSS } from 'src/search-injection/dom'
import { TOOLTIP_STORAGE_NAME, TOOLTIP_DEFAULT_OPTION } from './constants'

export async function init() {
    const isTooltipEnabled = await getLocalStorage(
        TOOLTIP_STORAGE_NAME,
        TOOLTIP_DEFAULT_OPTION,
    )

    if (!isTooltipEnabled) return

    await bodyLoader()

    const target = document.createElement('div')
    target.setAttribute('id', 'memex-direct-linking-tooltip')
    document.body.appendChild(target)

    const cssFile = browser.extension.getURL('/content_script.css')
    injectCSS(cssFile)

    const showTooltip = await interactions.setupUIContainer(target)
    interactions.setupTooltipTrigger(showTooltip)
}

init()
