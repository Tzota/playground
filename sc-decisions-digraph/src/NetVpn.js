var { BaseVm, DisplayProperty, CalcVertex, CalcEdge, SolutionCalc } = require('./lib.js');

class NetVpn extends SolutionCalc {
    constructor() {
        super();

        this._grounds = new DisplayProperty('Количество площадок', 'grounds', 'Integer', ko.observable(0));
        const node1 = new CalcVertex('1', 'Количество площадок между которыми необходимо организовать защищенное соединение', [this._grounds]);


        this._grounds10 = new DisplayProperty('Количество площадок с производительностью до 10 Мбит/с', 'grounds10', 'Integer', ko.observable(0));
        this._grounds50 = new DisplayProperty('Количество площадок с производительностью до 50 Мбит/с', 'grounds50', 'Integer', ko.observable(0));
        this._grounds300 = new DisplayProperty('Количество площадок с производительностью до 300 Мбит/с', 'grounds300', 'Integer', ko.observable(0));
        this._grounds1000 = new DisplayProperty('Количество площадок с производительностью до 1000 Мбит/с', 'grounds1000', 'Integer', ko.observable(0));
        this._grounds2500 = new DisplayProperty('Количество площадок с производительностью до 2500 Мбит/с', 'grounds2500', 'Integer', ko.observable(0));
        const node1_1 = new CalcVertex(
            '1.1',
            'Укажите количество площадок с пропускной способностью',
            [this._grounds10, this._grounds50, this._grounds300, this._grounds1000, this._grounds2500]);

        const edge1 = new CalcEdge(node1, node1_1, (v/*, w*/) => parseInt(v.Answer('grounds').Value(), 10) > 0 );

        this._reserve300 = new DisplayProperty('Нужно ли резервирование криптошлюзов для площадок до 300?', 'reserve300', 'Boolean', ko.observable(false));
        this._reserve1000 = new DisplayProperty('Нужно ли резервирование криптошлюзов для площадок до 1000?', 'reserve1000', 'Boolean', ko.observable(false));
        this._icount1000 = new DisplayProperty(
            'Сколько требуется оптических сетевых интерфейсов для площадок до 1000?',
            'icount1000',
            'Enum',
            ko.observable('none'),
            {
                'none':  'Не требуются',
                'upto4': 'До 4-х портов SFP 1G',
                'upto8': 'До 8-ми портов SFP 1G'
            }
        );
        this._reserve2500 = new DisplayProperty('Нужно ли резервирование криптошлюзов для площадок до 2500?', 'reserve2500', 'Boolean', ko.observable(false));
        this._icount2500 = new DisplayProperty(
            'Какие сетевые интерфейсы требуются для площадок до 2500?',
            'icount2500',
            'Enum',
            ko.observable('upto4'),
            {
                 'upto4':  'До 4-х 10G SFP+',
                 'upto34': 'До 34-х портов Ethernet copper',
                 'upto32': 'До 32-х портов SFP 1G'
            }
        );

        this._reserve300.Visible = ko.computed(()=> parseInt(this._grounds300.Value(), 10) > 0);
        this._reserve1000.Visible = this._icount1000.Visible = ko.computed(()=> parseInt(this._grounds1000.Value(), 10) > 0);
        this._reserve2500.Visible = this._icount2500.Visible = ko.computed(()=> parseInt(this._grounds2500.Value(), 10) > 0);

        const node1_1_1 = new CalcVertex(
            '1.1.1',
            'И ещё несколько вопросов...',
            [this._reserve300, this._reserve1000, this._icount1000, this._reserve2500, this._icount2500]);
        const edge1_1 = new CalcEdge(
            node1_1,
            node1_1_1,
            (v/*, w*/) => {
                return parseInt(v.Answer('grounds10').Value(), 10) > 0
                    || parseInt(v.Answer('grounds50').Value(), 10) > 0
                    || parseInt(v.Answer('grounds300').Value(), 10) > 0
                    || parseInt(v.Answer('grounds1000').Value(), 10) > 0
                    || parseInt(v.Answer('grounds2500').Value(), 10) > 0;
            }
        );

        this.addEdge(edge1);
        this.addEdge(edge1_1);
    }

    get grounds() { return this._grounds.Value; }

    get grounds10() { return this._grounds10.Value; }
    get grounds50() { return this._grounds50.Value; }
    get grounds300() { return this._grounds300.Value; }
    get grounds1000() { return this._grounds1000.Value; }
    get grounds2500() { return this._grounds2500.Value; }

    get reserve300() { return this._reserve300.Value; }
    get reserve1000() { return this._reserve1000.Value; }
    get icount1000() { return this._icount1000.Value; }
    get reserve2500() { return this._reserve2500.Value; }
    get icount2500() { return this._icount2500.Value; }
}

const NetVpnVM = function(calc) {
    BaseVm.call(this, calc);

    var self = this;

    self.grounds = calc.grounds;

    self.grounds10 = calc.grounds10;
    self.grounds50 = calc.grounds50;
    self.grounds300 = calc.grounds300;
    self.grounds1000 = calc.grounds1000;
    self.grounds2500 = calc.grounds2500;

    self.reserve300 = calc.reserve300;
    self.reserve1000 = calc.reserve1000;
    self.icount1000 = calc.icount1000;
    self.reserve2500 = calc.reserve2500;
    self.icount2500 = calc.icount2500;

    self.on_finish_inner = function() {
        // alert(self.steps().map(s => s.Answers.filter(a => a.Visible).map(a => a.Value())));
        const dto = new sc_calc.jinn_dto();
        dto.product = sc_calc.const.jinn.PRODUCT.CLIENT;
        dto.cert_level = sc_calc.const.jinn.CERT_LEVEL.KS1;
        dto.is_unlim = false;

        return [{ dto, q:1}, { dto, q:11}];
    };
}

// ---------------------------------------

exports.NetVpn = NetVpn;
exports.NetVpnVM = NetVpnVM;