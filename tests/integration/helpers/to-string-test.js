import {describe, it} from 'mocha';
import {expect} from 'chai';
import {hbs} from 'ember-cli-htmlbars';
import {render} from '@ember/test-helpers';
import {setupRenderingTest} from 'ember-mocha';

describe('Integration | Helper | to-string', function () {
    setupRenderingTest();

    it('renders', async function () {
        this.set('inputValue', '1234');

        await render(hbs`{{to-string inputValue}}`);

        expect(this.element.textContent.trim()).to.equal('1234');
    });
});
