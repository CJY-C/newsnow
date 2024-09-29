import { useEffect } from "react"
import { useBeforeUnload } from "react-use"

export function useOnReload(fn?: () => Promise<void> | void, fallback?: () => Promise<void> | void) {
  useBeforeUnload(() => {
    localStorage.setItem("quitTime", Date.now().toString())
    return false
  })

  useEffect(() => {
    const _ = localStorage.getItem("quitTime")
    const quitTime = _ ? Number(_) : 0
    if (!Number.isNaN(quitTime) && Date.now() - quitTime < 1000) {
      fn?.()
    } else {
      fallback?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}