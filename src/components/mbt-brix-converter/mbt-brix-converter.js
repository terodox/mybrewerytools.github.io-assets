class MbtBrixConverter extends HTMLElement {
    /*
    Brix -> SG Equation:
    SG = (Brix / (258.6-((Brix / 258.2)*227.1))) + 1
    (Source: Brew Your Own Magazine)

    SG -> Brix Equation:
    Brix = (((182.4601 * SG -775.6821) * SG +1262.7794) * SG -669.5622)
    (Source: http://en.wikipedia.org/wiki/Brix)
    */

    static get tagName() {
        return 'mbt-brix-converter';
    }

    constructor() {
        super();
        this.element = this.attachShadow({mode: 'open'});
        this.element.innerHTML = `
            <input class="brix-input" type="number" step=".1" placeholder="Brix" value="10" />
            <input class="specific-gravity-input" type="number" step=".001" placeholder="Specific Gravity" value="1.041" />
        `;

        this.brix = this.element.querySelector('.brix-input');
        this.specificGravity = this.element.querySelector('.specific-gravity-input');

        this.brix.onchange = this.onBrixUpdate.bind(this);
        this.specificGravity.onchange = this.onSpecificGravityUpdate.bind(this);
    }

    onBrixUpdate() {
        const brix = this.brix.value;
        const sg = (brix / (258.6 - ((brix / 258.2) * 227.1))) + 1;
        this.specificGravity.value = (Math.floor(sg * 1000) / 1000).toFixed(3);
    }

    onSpecificGravityUpdate() {
        const sg = this.specificGravity.value;
        const brix = (((182.4601 * sg - 775.6821) * sg + 1262.7794) * sg - 669.5622);
        this.brix.value = (Math.ceil(brix * 10) / 10).toFixed(1);
    }
}

customElements.define(MbtBrixConverter.tagName, MbtBrixConverter);