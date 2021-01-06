import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupRenderingTest } from 'ember-mocha';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

describe('Integration | Helper | to-string', function() {
  setupRenderingTest();

  // TODO: Replace this with your real tests.
  it('renders', async function() {
    this.set('inputValue', '1234');

    await render(hbs`{{to-string inputValue}}`);

    expect(this.element.textContent.trim()).to.equal('1234');
  });
});
