# React 入门

用于构建用户界面的 JavaScript 库, 具有一下特性:

- 声明式
  - 以声明式编写 UI，可以让你的代码更加可靠，且方便调试
- 组件化
  - 创建拥有各自状态的组件，再由这些组件构成更加复杂的 UI


## JSX

JSX，是一个 JavaScript 的语法扩展, 可以在大括号内放置任何有效的 JavaScript 表达式。


## 组件

### 函数组件

```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

### class 组件
```js
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

### 渲染组件

之前，我们遇到的 React 元素都只是 DOM 标签：
```js
const element = <div />;
```

不过，React 元素也可以是用户自定义的组件：
```js
const element = <Welcome name="React" />;
```


## Props

对于函数组件, `Props` 可看成函数的参数. 对于 class 组件, Props 可看成类的参数

> 组件无论是使用函数声明还是通过 class 声明，都决不能修改自身的 props


## State

`State` 与 `Props` 类似，但是 `state` 是私有的，并且完全受控于当前组件。

> `State` 只能在 class 组件中使用


```js
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

### 修改 State

不要直接修改 `State`, 而是应该使用 `setState()`

```js
// 错误
this.state.comment = 'Hello';

// 正确
this.setState({comment: 'Hello'});
```




## 生命周期

可以为 `class` 组件声明一些特殊的方法，当组件挂载或卸载时就会去执行这些方法。

- componentWillMount: 在渲染前调用

- render: 渲染

- componentDidMount: 在第一次渲染后调用

- getDerivedStateFromProps: 在组件接收到一个新的 `props` (更新后)时被调用。v16 之前使用 `componentWillReceiveProps` 

- shouldComponentUpdate: 返回一个布尔值。在组件接收到新的 `props` 或者 `state` 时被调用。在初始化时或者使用 `forceUpdate` 时不被调用。 
可以在你确认不需要更新组件时使用。

- componentWillUpdate: 在组件接收到新的 `props` 或者 `state` 但还没有 `render` 时被调用

- componentDidUpdate: 在组件完成更新后立即调用

- componentWillUnmount: 在组件从 DOM 中移除之前立刻被调用

**参考资料:**
- [React 生命周期](https://juejin.im/post/5d2554fbe51d455d850d3b76)


## 条件渲染

React 中的条件渲染和 JavaScript 中的一样，使用 JavaScript 运算符 if 或者条件运算符去创建元素来表现当前的状态，然后让 React 根据它们来更新 UI。

### if 语句
```js
// 定义组件
function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}
function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}


function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

// 渲染组件
ReactDOM.render(
  <Greeting isLoggedIn={false} />,
  document.getElementById('root')
);
```

### 与运算符 &&

通过花括号包裹代码，你可以在 JSX 中嵌入任何表达式。这也包括 JavaScript 中的逻辑与 (&&) 运算符。

```js
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;

  return (
    <div>
      <h1>Hello!</h1>
      {
        unreadMessages.length > 0
        && (
          <h2>
            You have {unreadMessages.length} unread messages.
          </h2>
        )
      }
    </div>
  );
}
```

### 三目运算符

另一种内联条件渲染的方法是使用 JavaScript 中的三目运算符 condition ? true : false

```js
...
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {
        isLoggedIn
          ? (
            <LogoutButton onClick={this.handleLogoutClick} />
          )
          : (
            <LoginButton onClick={this.handleLoginClick} />
          )
      }
    </div>
  );
}
...
```

### 阻止组件渲染

在极少数情况下，可能希望能隐藏组件，即使它已经被其他组件渲染。若要完成此操作，你可以让 render 方法直接返回 null，而不进行任何渲染。

```js
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}
```


## 列表

使用 Javascript 中的 map() 方法来遍历实现。
```js
function NumberList() {
  const numbers = [1, 2, 3, 4, 5];
  const listItems = numbers.map((number) =>
    <li>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

```js
// JSX 中时使用 map 循环
function NumberList() {
  const numbers = [1, 2, 3, 4, 5];
  return (
    <ul>
      {
        numbers.map((number) =>
          <ListItem
            key={number.toString()}
            value={number}
          />
        )
      }
    </ul>
  );
}
```

> 运行这段代码，将会看到一个警告 a key should be provided for list items，意思是当你创建一个元素时，必须包括一个特殊的 `key` 属性。

## 事件处理

React 元素的事件处理和 DOM 元素的很相似，但是有一点语法上的不同:

React 事件的命名采用小驼峰式（camelCase），而不是纯小写。
使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串。

```js
// 传统 HTML
<button onclick="activateLasers()">
  Activate Lasers
</button>

// React 中
<button onClick={activateLasers}>
  Activate Lasers
</button>
```


### 阻止默认行为 && 事件冒泡

在 React 中阻止默认行为使用 `preventDefault`，阻止事件冒泡使用 `stopPropagation`。

```js
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('The link was clicked.');
  }

  return (
    <a
      href="#"
      onClick={handleClick}
    >
      Click me
    </a>
  );
}
```

### 传递参数

和常规 JS 函数一样传参。

```js
<button
  onClick={(e) => {
    this.deleteRow(id, e);
  }}
>Delete Row</button>
```

## Refs & DOM

Refs 提供了一种方式，允许我们访问 DOM 节点或在 render 方法中创建的 React 元素。

### 何时使用 Refs

下面是几个适合使用 refs 的情况：

- 管理焦点，文本选择或媒体播放。
- 触发强制动画。
- 集成第三方 DOM 库。

避免使用 refs 来做任何可以通过声明式实现来完成的事情。

举个例子，避免在 Dialog 组件里暴露 open() 和 close() 方法，最好传递 isOpen 属性。


### 创建 Refs

`Refs` 是使用 `React.createRef()` 创建的，并通过 `ref` 属性附加到 `React` 元素。在构造组件时，通常将 `Refs` 分配给实例属性，以便可以在整个组件中引用它们。

```js
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  render() {
    return <div ref={this.myRef} />;
  }
}
```

### 访问 Refs

当 `ref` 被传递给 `render` 中的元素时，对该节点的引用可以在 `ref` 的 `current` 属性中被访问。

```js
const node = this.myRef.current;
```

`ref` 的值根据节点的类型而有所不同：

- 当 `ref` 属性用于 HTML 元素时，构造函数中使用 `React.createRef()` 创建的 `ref` 接收底层 `DOM` 元素作为其 `current` 属性。

- 当 `ref` 属性用于自定义 class 组件时，`ref` 对象接收组件的挂载实例作为其 `current` 属性。

- **你不能在函数组件上使用 ref 属性**，因为他们没有实例。

> **注意**
> 
> 上面的例子已经更新为使用在 React 16.3 版本引入的 React.createRef() API。如果正在使用一个较早版本的 React，推荐使用回调形式的 refs。


## PropTypes 类型检查

在组件的 props 上进行类型检查，你只需配置特定的 propTypes 属性：

```js
import PropTypes from 'prop-types';

class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

Greeting.propTypes = {
  name: PropTypes.string
};
```

### PropTypes

以下提供了使用不同验证器的例子：

```js
import PropTypes from 'prop-types';

MyComponent.propTypes = {
  // 你可以将属性声明为 JS 原生类型，默认情况下
  // 这些属性都是可选的。
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  // 任何可被渲染的元素（包括数字、字符串、元素或数组）
  // (或 Fragment) 也包含这些类型。
  optionalNode: PropTypes.node,

  // 一个 React 元素。
  optionalElement: PropTypes.element,

  // 一个 React 元素类型（即，MyComponent）。
  optionalElementType: PropTypes.elementType,

  // 你也可以声明 prop 为类的实例，这里使用
  // JS 的 instanceof 操作符。
  optionalMessage: PropTypes.instanceOf(Message),

  // 你可以让你的 prop 只能是特定的值，指定它为
  // 枚举类型。
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),

  // 一个对象可以是几种类型中的任意一个类型
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message)
  ]),

  // 可以指定一个数组由某一类型的元素组成
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // 可以指定一个对象由某一类型的值组成
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),

  // 可以指定一个对象由特定的类型值组成
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),
  
  // An object with warnings on extra properties
  optionalObjectWithStrictShape: PropTypes.exact({
    name: PropTypes.string,
    quantity: PropTypes.number
  }),   

  // 你可以在任何 PropTypes 属性后面加上 `isRequired` ，确保
  // 这个 prop 没有被提供时，会打印警告信息。
  requiredFunc: PropTypes.func.isRequired,

  // 任意类型的数据
  requiredAny: PropTypes.any.isRequired,

  // 你可以指定一个自定义验证器。它在验证失败时应返回一个 Error 对象。
  // 请不要使用 `console.warn` 或抛出异常，因为这在 `onOfType` 中不会起作用。
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  },

  // 你也可以提供一个自定义的 `arrayOf` 或 `objectOf` 验证器。
  // 它应该在验证失败时返回一个 Error 对象。
  // 验证器将验证数组或对象中的每个值。验证器的前两个参数
  // 第一个是数组或对象本身
  // 第二个是他们当前的键。
  customArrayProp: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
    if (!/matchme/.test(propValue[key])) {
      return new Error(
        'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  })
};
```

### 默认 Prop 值

可以通过配置特定的 `defaultProps` 属性来定义 `props` 的默认值：

```js
class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

// 指定 props 的默认值：
Greeting.defaultProps = {
  name: 'Stranger'
};

// 渲染出 "Hello, Stranger"：
ReactDOM.render(
  <Greeting />,
  document.getElementById('example')
);
```


## 拓展阅读
- [React 入门教程](https://react.docschina.org)
