import { Component, StrictMode } from 'react'
import type { PropsWithChildren } from 'react'

export class ViewTransition extends Component<PropsWithChildren<{}>> {
  #rendered = (_v?: any) => {}

  #updateDOM () {
    // now we know the screenshot has been taken, we can force render
    // (which skips `shouldComponentUpdate`)
    this.forceUpdate()
    // set up a promise that will resolve when the component renders
    return new Promise<void>(resolve => { this.#rendered = resolve })
  }

  shouldComponentUpdate () {
    if (!document.startViewTransition) return true // skip when not supported

    document.startViewTransition(() => this.#updateDOM())
    return false // don't update the component, we'll do this manually
  }

  componentDidUpdate () {
    // resolve the `updateDOM` promise to notify the View Transition API
    // that the DOM has been updated
    this.#rendered()
  }

  render () {
    return <StrictMode>{this.props.children}</StrictMode>
  }
}