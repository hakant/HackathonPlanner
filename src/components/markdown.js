import {inject} from 'aurelia-framework';
import showdown from 'showdown';

@inject(Element)
export class MarkdownCustomAttribute {  

  // In our constructor, we capture the HTML element corresponding to this 
  // instance of the markdown attribute. We also instantiate a new Showdown
  // converter object.
  constructor(element) {
      this.element = element;
      this.converter = new showdown.Converter();
  }

  // If the custom attribute is bound to a variable--in our case, it is bound to
  // mymarkdowntext--then Aurelia will call the valueChanged function when the 
  // value of that variable changes. When the variable of our attribute changes,
  // we want to read and format that value as markdown and insert the output 
  // into the innerHTML of our element.
  valueChanged(newValue, oldValue) {
      this.element.innerHTML = this.converter.makeHtml(
          newValue
              .split('\n')
              .map(line => line.trim())
              .join('\n')
      );
  }
}
