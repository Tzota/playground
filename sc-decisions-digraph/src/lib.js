if (typeof module !== 'undefined') {
    (global || window).ko = require('knockout');
}

//----------------BCL----------------------

class EdgedDigraph {
    constructor() {
        this._adj = new Map(); //список смежности, vertex -> edge[]
        this._v = 0;
        this._e = 0;
    }

    /**
     * Кол-во вершин
     * @returns {Number}
     */
    get V() {
        return this._v;
    }

    /**
     * Кол-во ребер
     * @returns {Number}
     */
    get E() {
        return this._e;
    }

    /**
     * Добавить ребро
     *
     * @param {Edge} edge
     */
    addEdge(edge) {
        let top = edge.from;

        if (!this._adj.has(top)) {
            this._v++;
            this._adj.set(top, []);
        }

        let children = this._adj.get(top);
        if (!children.includes(edge)) {
            this._e++;
            children.push(edge);
        }
    }

    /**
     * Ребра, инцидентные вершине
     * @param {Node} node
     * @returns {DirectedEdge[]}
     */
    adj(vertex) {
        return this._adj.get(vertex);
    }

    /**
     * Все ребра графа
     * @returns {DirectedEdge[]}
     */
    edges() {
        let result = [];

        for (let edges of this._adj.values()) {
            result = result.concat(edges);
        }

        return result;
    }

    toString() {
        return [
                this.V + ' vertices',
                this.E + ' edges',
                this._vertices.map(v => v.toString() +': ' + this.adj(v).map(w => w.toString()).join(', ')).join('\n')
        ].join('\n');

    }

    /** Вершины, из которых исходят дети */
    get _vertices() {
        const res = [];
        for (let key of this._vertices.keys()) {
           res.push(key)
        }
        return res;
    }
}

class Vertex {
    constructor(name) {
        this._name = name;
    }

    get name () { return this._name;}

    toString() {
        return this._name;
    }
}

class Edge {
    constructor(v, w) {
        this._v = v;
        this._w = w;
    }

    /**
     * Одна вершина
     * @return {Vertex}
     */
    get from() {
        return this._v;
    }

    /**
     * Другая вершина
     * @return {Vertex}
     */
    get to() {
        return this._w;
    }

    toString() {
        return this._v.toString() + '->' + this._w.toString();
    }

}

//----------------Abstract----------------------

class CalcEdge extends Edge {
    /**
     * .ctor
     * @param {CalcVertex} v
     * @param {CalcVertex} w
     * @param {Function} rule
     */
    constructor(v, w, rule) {
        super(v, w);
        this._rule = rule;
    }

    get isOpen() {
        return this._rule(this.from, this.to);
    }
}

class SolutionCalc extends EdgedDigraph {
    constructor() {
        super();
    }
}

/**
 * Узел с метаданными.
 */
class CalcVertex extends Vertex {
    /**
     * .ctor
     * @param {String} name
     * @param {DisplayProperty[]} answers
     */
    constructor(name, text, answers) {
        super(name);
        this._text = text;
        this._answers = answers;
    }
    get Text() {
        return this._text;
    }
    /**
     * Все варианты ответа
     * @returns {DisplayProperty[]}
     */
    get Answers() {
        return this._answers;
    }

    /**
     * Вариант выбора по ключу
     * @param {String} key
     */
    Answer(key) {
        return this.Answers.find(o => o.Key === key);
    }
}


class DisplayProperty {
    constructor(caption, key, type, value = null) {
        this._caption = caption;
        this._key = key;
        this._type = type;
        this._value = value;
    }
    get Caption() {
        return this._caption;
    }
    get Key() {
        return this._key;
    }
    get Type() {
        return this._type;
    }
    get Value() {
        return this._value;
    }
    set Value(val) {
        this._value = val;
    }
}

//----------------Concrete----------------------

class DesktopDistant extends SolutionCalc {
    constructor() {
        super();
        const grounds = new DisplayProperty('Количество площадок', 'grounds', 'Integer', 0);
        const node1 = new CalcVertex('1', 'Количество площадок между которыми необходимо организовать защищенное соединение', [grounds]);


        const node1_1 = new CalcVertex('1.1', 'Укажите количество площадок с пропускной способностью', []);

        const edge1 = new CalcEdge(node1, node1_1, (v/*, w*/) => parseInt(v.Answer('grounds').Value, 10) > 0 );

        this.addEdge(edge1);

        this._grounds = ko.observable(grounds.Value);
        this._grounds.subscribe(function(newVal){
            grounds.Value = newVal;
        }, this);
    }

    get grounds() {
        return this._grounds;
    }
}

//----------------viewmodel----------------------
const BaseVm = function (calc) {
    var self = this;

    self.graph = calc;

    self.steps = ko.observableArray([]);

    self._find_root = function() {
        var edges = self.graph.edges();
        return edges
                .map(e => e.from)
                .find(v => !edges.some(e => e.to === v));
    }

    // делать ли доступной кнопку "давайте следующий шаг"
    self.next_enabled = ko.computed(function() {
        var steps = self.steps();
        if (steps.length == 0) {
            return false;
        }
        var last = steps[steps.length - 1];
        var children = self.graph.adj(last);
        if (typeof(children) == 'undefined' || children.length == 0) {
            return false;
        }
        return children.filter(e => e.isOpen).length === 1;
    }, this);

    // Запросили следующий шаг
    self.on_next = function() {
        var steps = self.steps();
        var last = steps[steps.length - 1];
        var next = self.graph.adj(last).find(e => e.isOpen);
        if (typeof next !== 'undefined') {
            self.steps.push(next.to);
        }
    }

    // ----------------
    var root = self._find_root(calc);
    self.steps.push(root);
};

const DesktopDistantVM = function(calc) {
    BaseVm.call(this, calc);

    var self = this;

    self.grounds = calc.grounds;
}

// ---------------------------------------

if (typeof module !== 'undefined') {
    exports.DesktopDistant = DesktopDistant;
    exports.DesktopDistantVM = DesktopDistantVM;
}