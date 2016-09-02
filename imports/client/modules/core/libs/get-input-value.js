import ReactDOM from 'react-dom';

const getInputValue = (component) => ReactDOM.findDOMNode(component).value;

export default getInputValue;
