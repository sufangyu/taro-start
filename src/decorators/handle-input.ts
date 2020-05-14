/**
 * 监听表单项的更改响应
 *
 * @returns
 */
function handleInput() {
  return function handleInputComponent(Component: any) {
    class HandleInput extends Component {
      /**
       * 监听表单项的更改响应
       *
       * @param {*} e
       * @param {string} key
       * @param {{}} [target]
       * @memberof HandleInput
       */
      handleInput(e: any, key: string, target?: {}) {
        const { value } = e.detail;
        if (target) {
          this.setState((prevState: any) => {
            target[key] = value.trim();
            return prevState;
          });
        } else {
          this.setState({
            [key]: value.trim(),
          });
        }
      }

      render() {
        return super.render();
      }
    }

    return HandleInput;
  };
}

export default handleInput;
