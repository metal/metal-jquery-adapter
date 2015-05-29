'use strict'

import dom from 'bower:metaljs/src/dom/dom';
import Component from 'bower:metaljs/src/component/Component';
import JQueryPlugin from '../src/JQueryPlugin';

describe('JQueryPlugin', function() {
  it('should throw error if jQuery is not included', function() {
    var orig$ = $;
    $ = null;
    assert.throws(function() {
      JQueryPlugin.register('testComp', createComponentClass());
    });
    $ = orig$;
  });

  it('should throw error if name is not a string', function() {
    assert.throws(function() {
      JQueryPlugin.register(null, createComponentClass());
    });
    assert.throws(function() {
      JQueryPlugin.register({}, createComponentClass());
    });
  });

  it('should throw error if constructor is not a function', function() {
    assert.throws(function() {
      JQueryPlugin.register('testComp');
    });
    assert.throws(function() {
      JQueryPlugin.register('testComp', {});
    });
  });

  it('should instantiate component when plugin is called for the first time', function() {
    var TestComponent = createComponentClass();
    JQueryPlugin.register('testComp', TestComponent);

    var element = document.createElement('div');
    dom.enterDocument(element);
    $(element).testComp();

    var instance = $(element).data('metal-testComp');
    assert.ok(instance instanceof TestComponent);
    assert.strictEqual(element, instance.element)
  });

  it('should instantiate components for each element in the collection', function() {
    var TestComponent = createComponentClass();
    JQueryPlugin.register('testComp', TestComponent);

    dom.append(document.body, '<div class="testComp"></div><div class="testComp"></div>');
    var $elements = $('.testComp');
    $elements.testComp();

    var instance1 = $($elements[0]).data('metal-testComp');
    assert.ok(instance1 instanceof TestComponent);

    var instance2 = $($elements[1]).data('metal-testComp');
    assert.ok(instance2 instanceof TestComponent);
    assert.notStrictEqual(instance1, instance2);
  });

  it('should pass options as the component config when instantiating it', function() {
    var TestComponent = createComponentClass();
    TestComponent.ATTRS = {
      foo: {
        value: ''
      }
    };
    JQueryPlugin.register('testComp', TestComponent);

    var element = document.createElement('div');
    dom.enterDocument(element);
    $(element).testComp({
      foo: 'foo'
    });

    var instance = $(element).data('metal-testComp');
    assert.strictEqual('foo', instance.foo);
  });

  it('should update component attrs when calling plugin after first time', function() {
    var TestComponent = createComponentClass();
    TestComponent.ATTRS = {
      foo: {
        value: ''
      }
    };
    JQueryPlugin.register('testComp', TestComponent);

    var element = document.createElement('div');
    dom.enterDocument(element);
    $(element).testComp({
      foo: 'foo'
    });
    $(element).testComp({
      foo: 'bar'
    });

    var instance = $(element).data('metal-testComp');
    assert.strictEqual('bar', instance.foo);
  });
});

function createComponentClass() {
  class TestComponent extends Component {
    constructor(opt_config) {
      super(opt_config);
    }
  }
  return TestComponent;
}
