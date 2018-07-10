import { TEXT_NODE, tranformStyleObject } from './utils';
import Component from './component';
function addAttribute(el, props) {
  el.$$eventHandlers = el.$$eventHandlers || {};
  Object.keys(el.$$eventHandlers).forEach(eventName =>
    el.removeEventListener(eventName, el.$$eventHandlers[eventName])
  );
  for (const attr of el.attributes) el.removeAttribute(attr.name);

  Object.keys(props).forEach(key => {
    if (key.startsWith('on')) {
      const eventName = key.substring(2).toLowerCase();
      el.$$eventHandlers[eventName] = props[key];
      el.addEventListener(eventName, props[key]);
    } else {
      if (key === 'key') {
        el.key = props[key];
      } else if (key === 'style') {
        el.setAttribute(key, tranformStyleObject(props[key]));
      } else {
        el.setAttribute(key, props[key]);
      }
    }
  });
}
function renderTextNode(props, parent) {
  const el = document.createTextNode(props.value);
  el.key = props.key;
  parent && parent.appendChild(el);
  return el;
}
function renderChildren(_children, parent) {
  return [].concat(..._children).map((c, i) => {
    const { type, props = {}, children = [] } = c;
    props.key = props.key || `$$_${i}`;
    return render({ type, props, children }, parent);
  });
}
function renderElement(type, props, children, parent) {
  const el = document.createElement(type);
  addAttribute(el, props);
  renderChildren(children, el);
  if (parent) parent.appendChild(el);
  return el;
}
function renderComponent(type, _props, _children, parent) {
  const instance = new type(Object.assign(_props, { children: _children }));
  let vnode = null;
  let el = null;
  if (instance instanceof Component) {
    instance.componentWillMount();
    vnode = instance.render();
    vnode.props.key = vnode.props.key || _props.key || '$$root_';
    el = render(vnode, parent);
    instance.componentDidMount();
    el.$$instance = instance;
    instance.$$setState = state => {
      instance.state = state;
      if (!instance.shouldComponentUpdate()) {
        return;
      }
      instance.componentWillUpdate();
      const { type, props = {}, children = [] } = instance.render();
      props.key = props.key || _props.key || '$$root_';
      patch(el, { type, props, children }, parent);
      instance.componentDidUpdate();
    };
  } else {
    vnode = instance;
    vnode.props.key = vnode.props.key || _props.key || '$$root_';
    el = render(vnode, parent);
  }
  return el;
}
export function render(vnode, parent) {
  const { type, props = {}, children = [] } = vnode;
  if (type === TEXT_NODE) {
    return renderTextNode(props, parent);
  } else {
    if (type instanceof Function) {
      return renderComponent(type, props, children, parent);
    } else {
      return renderElement(type, props, children, parent);
    }
  }
}
function patchTextNode(dom, props) {
  if (dom.textContent !== props.value) {
    dom.textContent = props.value;
  }
}
function patchComponent(dom, _type, _props, _children, parent) {
  const instance = dom.$$instance;
  if (dom.$$instance instanceof _type) {
    instance.componentWillReceiveProps(_props);
    instance.props = Object.assign(_props, { children: _children });
    if (!instance.shouldComponentUpdate()) {
      return;
    }
    instance.componentWillUpdate();
    const { type, props = {}, children = [] } = instance.render();
    props.key = props.key || _props.key || '$$root_';
    patch(dom, { type, props, children }, parent);
    instance.componentDidUpdate();
  } else {
    dom.$$instance && dom.$$instance.componentWillUnmount();
    const nextDom = renderComponent(_type, _props, _children);
    parent.replaceChild(nextDom, dom);
  }
}
function patchElement(dom, type, props, children, parent) {
  if (dom.nodeName === type.toUpperCase()) {
    addAttribute(dom, props);
    const cache = {};
    []
      .concat(...children)
      .forEach((c, i) => (c.props.key = c.props.key || `$$_${i}`));
    dom.childNodes.forEach(c => (cache[c.key] = c));
    [].concat(...children).forEach(c => {
      if (cache[c.props.key]) {
        patch(cache[c.props.key], c, dom);
      } else {
        render(c, dom);
      }
      cache[c.props.key] = null;
    });
    Object.keys(cache).forEach(k => {
      if (cache[k]) {
        cache[k].$$instance && cache[k].$$instance.componentWillUnmount();
        dom.removeChild(cache[k]);
      }
    });
  } else {
    dom.$$instance && dom.$$instance.componentWillUnmount();
    const nextDom = render({ type, props, children });
    parent.replaceChild(nextDom, dom);
  }
}
function patch(dom, vnode, parent = dom.parentNode) {
  const { type, props = {}, children = [] } = vnode;
  debugger;
  if (type === TEXT_NODE && dom.nodeName === type) {
    patchTextNode(dom, props);
  } else {
    if (type instanceof Function) {
      patchComponent(dom, type, props, children, parent);
    } else {
      patchElement(dom, type, props, children, parent);
    }
  }
}
