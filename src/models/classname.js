/**
 * ClassName
 * @description Class helper to dynamically create a components className
 */

class ClassName {
  constructor (defaultClassName) {
    this.defaultClassName = defaultClassName;
    this.classes = new Set();
    if (defaultClassName) this.classes.add(defaultClassName);
  }

  add (className) {
    if (!className) return this.classes;
    const split = className.split(' ');
    split.forEach((i) => this.classes.add(i));
    return this.classes;
  }

  addIf (className, expression) {
    // If the expression is not true, return

    if (!expression) return;

    // Otherwise, add our class and return it

    return this.add(className);
  }

  childString (name) {
    return `${this.defaultClassName}-${name}`;
  }

  get string () {
    return Array.from(this.classes).join(' ');
  }
}

export default ClassName;
