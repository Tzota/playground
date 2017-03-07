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
        let top = edge.from();

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
        let edges = [];

        const iter = this._adj.keys();
        let vertex = [];
        do {
            vertex = iter.next();
            if (typeof vertex.value !== 'undefined') {
                edges = edges.concat(this._adj[vertex]);
            }
        } while(!vertex.done);
        return edges;
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
        const iter = this._adj.keys();
        let a, res = [];
        do {
            a = iter.next();
            if (typeof a.value !== 'undefined') {
                res.push(a.value);
            }
        } while(!a.done);
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

class DirectedEdge {
    constructor(v, w, rule) {
        this._v = v;
        this._w = w;
        this._rule = rule;
    }

    /**
     * Одна вершина
     * @return {Vertex}
     */
    from() {
        return this._v;
    }

    /**
     * Другая вершина
     * @return {Vertex}
     */
    to() {
        return this._w;
    }

    isOpen() {
        return this._rule(this.from(), this.to());
    }

    toString() {
        return this._v.toString() + '->' + this._w.toString();
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

/**
 * Узел с метаданными.
 */
class CalcVertex extends Vertex {
    /**
     * .ctor
     * @param {String} name
     * @param {DisplayProperty[]} answers
     */
    constructor(name, answers) {
        super(name);
        this._answers = answers;
    }
    get Text() {
        return 'Сколько рабочих станций и серверов используют указанные операционные системы:';
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

/**
 * Выбор по кол-ву ОС
 * @param {CalcVertex} f
 * @param {CalcVertex} t
 */
function windows_linux(f, t) {
    const win = f.Answer('win');
    const linux = f.Answer('linux');
    return parseInt(win.Value, 10) > 0 && parseInt(linux.Value, 10) > 0;
}

function articoli(f, t) {
    const N = parseInt(f.Answer('win').Value, 10);
    const M = parseInt(f.Answer('linux').Value, 10);
    if (M > 0 && N === 0) {
        return ['LSP for ' + M];
    }
    if (M === 0 && N > 0) {
        return ['SNS for ' + N];
    }
}

(function() {
    const win = new DisplayProperty('Windows', 'win', 'Integer', 0);
    const linux = new DisplayProperty('Linux', 'linux', 'Integer', 0);

    const d = new EdgedDigraph();
    const node1 = new CalcVertex('1', [win, linux]);
    const node1_1 = new CalcVertex('1.1');
    const edge1 = new DirectedEdge(node1, node1_1, windows_linux);
    d.addEdge(edge1);
    const node1_2 = new CalcVertex('1.2');
    const edge2 = new DirectedEdge(node1, node1_2, (t, b) => false);
    d.addEdge(edge2);
    const node1_1_1 = new CalcVertex('1.1.1');
    const edge3 = new DirectedEdge(node1_1, node1_1_1, (t, b) => false);
    d.addEdge(edge3);

    console.log('Initial state');
    d.adj(node1).forEach(e => console.log(e.toString() + ': ' + e.isOpen()));
    console.log('Add some win and linux stations');
    node1.Answer('win').Value = 1;
    node1.Answer('linux').Value = 1;
    d.adj(node1).forEach(e => console.log(e.toString() + ': ' + e.isOpen()));
})();
