import './App.css';
import * as PropTypes from "prop-types";
import {Component} from "react";

class BR2JSX extends Component {

  propTypes = {text: PropTypes.string.isRequired};

  render() {
    const regExp = /<br *?\/?>/g;
    let array = this.props.text.split(regExp);

    let separator = <br/>;
    array = array.map((item, index) =>
      (index !== (array.length - 1))
          ?
          [item, separator].flat()
          :
          item);

    return <div>{array}</div>;
  }
}

function App() {
  let text="первый<br>второй<br/>третий<br />последний";
  return (
      <BR2JSX text={text}/>
  );
}

export default App;
