import { tranformStyleObject } from './utils';
import Component from './component';

function renderTextNode(vnode, parent) {
  parent.appendChild(document.createTextNode(vnode));
}
function renderChildren(children, parent) {
  children.forEach(c => {
    if (Array.isArray(c)) {
      c.forEach(item => render(item, parent));
    } else {
      render(c, parent);
    }
  });
}
function renderElement(type, props, children, parent) {
  const el = document.createElement(type);
  Object.keys(props).forEach(key => {
    if (key.startsWith('on')) {
      const eventName = key.substring(2).toLowerCase();
      el.addEventListener(eventName, props[key]);
    } else {
      if (key === 'style') {
        el.setAttribute(key, tranformStyleObject(props[key]));
      } else {
        el.setAttribute(key, props[key]);
      }
    }
  });
  renderChildren(children, el);
  parent.appendChild(el);
}
function renderComponent(type, props, children, parent) {
  const instance = new type(Object.assign(props, { children }));
  const vnode = instance instanceof Component ? instance.render() : instance;
  render(vnode, parent);
}

export function render(vnode, parent) {
  if (typeof vnode === 'string') {
    renderTextNode(vnode, parent);
  } else {
    const { type, props = {}, children = [] } = vnode;
    if (type instanceof Function) {
      renderComponent(type, props, children, parent);
    } else {
      renderElement(type, props, children, parent);
    }
  }
}
