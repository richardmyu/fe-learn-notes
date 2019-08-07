import React, { Component } from 'react'
import CSSModules from "react-css-modules"
import config from './config.json'
import styles from './Greeter.css'

class Greeter extends Component {
  render() {
    return <div className={styles.root}>{config.greetText}</div>
  }
}

export default CSSModules(Greeter, styles, { allowMultiple: true })
