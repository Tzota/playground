if (typeof module !== 'undefined') {
    var { BaseVm, DisplayProperty, CalcVertex, CalcEdge, SolutionCalc } = require('./lib.js');
}

class NetVpn extends SolutionCalc {
    constructor() {
        super();

        this._grounds = new DisplayProperty('Количество площадок', 'grounds', 'Integer', ko.observable(0));
        const node1 = new CalcVertex('1', 'Количество площадок между которыми необходимо организовать защищенное соединение', [this._grounds]);


        const grounds10 = new DisplayProperty('Количество площадок с производительностью до 10 Мбит/с', 'grounds10', 'Integer', ko.observable(0));
        const grounds50 = new DisplayProperty('Количество площадок с производительностью до 10 Мбит/с', 'grounds50', 'Integer', ko.observable(0));
        this._grounds300 = new DisplayProperty('Количество площадок с производительностью до 10 Мбит/с', 'grounds300', 'Integer', ko.observable(0));
        const grounds1000 = new DisplayProperty('Количество площадок с производительностью до 10 Мбит/с', 'grounds1000', 'Integer', ko.observable(0));
        const grounds2500 = new DisplayProperty('Количество площадок с производительностью до 10 Мбит/с', 'grounds2500', 'Integer', ko.observable(0));
        const node1_1 = new CalcVertex('1.1', 'Укажите количество площадок с пропускной способностью', [grounds10, grounds50, this._grounds300, grounds1000, grounds2500]);

        const edge1 = new CalcEdge(node1, node1_1, (v/*, w*/) => parseInt(v.Answer('grounds').Value(), 10) > 0 );

        const node1_1_1 = new CalcVertex('1.1.1', 'Нужно ли резервирование криптошлюзов?', []);
        const edge1_1 = new CalcEdge(node1_1, node1_1_1, (v/*, w*/) => parseInt(v.Answer('grounds300').Value(), 10) > 0);

        this.addEdge(edge1);
        this.addEdge(edge1_1);
    }

    get grounds() {
        return this._grounds.Value;
    }

    get grounds300() {
        return this._grounds300.Value;
    }
}


const NetVpnVM = function(calc) {
    BaseVm.call(this, calc);

    var self = this;

    self.grounds = calc.grounds;
    self.grounds10 = ko.observable(0);
    self.grounds50 = ko.observable(0);
    self.grounds300 = calc.grounds300;
    self.grounds1000 = ko.observable(0);
    self.grounds2500 = ko.observable(0);
}

// ---------------------------------------

if (typeof module !== 'undefined') {
    exports.NetVpn = NetVpn;
    exports.NetVpnVM = NetVpnVM;
}