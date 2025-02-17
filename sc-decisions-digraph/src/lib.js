if (typeof module !== 'undefined' && module.exports) {
    (global||window).ko = require('knockout');
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
    constructor(caption, key, type, value = null, enum_object) {
        this._caption = caption;
        this._key = key;
        this._type = type;
        this._value = value;
        this._enum_object = enum_object;

        this.Visible = true;
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
    get Enum() {
        return this._enum_object;
    }
    get Value() {
        return this._value;
    }
    set Value(val) {
        this._value = val;
    }
}

//----------------viewmodel----------------------
const BaseVm = function (calc) {
    const self = this;

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
        const steps = self.steps();
        if (steps.length == 0) {
            return false;
        }
        const last = steps[steps.length - 1];
        const children = self.graph.adj(last);

        if (typeof(children) == 'undefined' || children.length == 0) {
            return false;
        }
        return children.filter(e => e.isOpen).length === 1;
    }, this);

    // Если детей нет вообще, то, видимо, пора производить расчёт
    self.finish_enabled = ko.computed(function(){
        const steps = self.steps();
        if (steps.length == 0) {
            return false;
        }
        const last = steps[steps.length - 1];
        const children = self.graph.adj(last);

        // не только не должно быть детей, но и все ответы должны быть даны?
        return typeof(children) == 'undefined' || children.length == 0;

    }, this);

    self.next_visible = ko.computed(function(){
        return !self.finish_enabled();
    });

    // Запросили следующий шаг
    self.on_next = function() {
        var steps = self.steps();
        var last = steps[steps.length - 1];
        var next = self.graph.adj(last).find(e => e.isOpen);
        if (typeof next !== 'undefined') {
            self.steps.push(next.to);
        }
    }

    self.on_finish = function() {
        const data = self.on_finish_inner();
        // Не вижу пока смысла делать вид, что это не для браузера
        if (window && typeof(window['localStorage']) !== 'undefined') {
            const sessionId = (new Date()).getTime();
            window.localStorage.setItem('solution-calc-data-'+sessionId, JSON.stringify(data)); // todo polyfill for JSON
            window.open('/api/sc-calc-generic/index.html?session='+sessionId);
        }
    };

    // ----------------
    var root = self._find_root(calc);
    self.steps.push(root);
};

if (typeof module !== 'undefined' && module.exports) {
    exports.BaseVm = BaseVm;
    exports.DisplayProperty = DisplayProperty;
    exports.CalcVertex = CalcVertex;
    exports.CalcEdge = CalcEdge;
    exports.SolutionCalc = SolutionCalc;
}