class Digraph
{
    constructor() {
        this._links = new Map();
        this._v = 0;
        this._e = 0;
    }

    /**
     * Реверс графа (для прохода вверх)
     */
    get reverse() {
        const R = new Digraph();
        this._links.forEach( (v, kv) => v.forEach( w => R.addEdge(w, kv)));
        return R;
    }

    /**
     * Вершины, из которых исходят дети
     */
    get vertices() {
        const iter = this._links.keys();
        let a, res = [];
        do {
            a = iter.next();
            if (typeof a.value !== 'undefined') {
                res.push(a.value);
            }
        } while(!a.done);
        return res;
    }

    get V() {
        return this._v;
    }

    get E() {
        return this._e;
    }

    /**
     * Добавить ребро
     *
     * @param {Node} node1
     * @param {Node} node2
     */
    addEdge(node1, node2) {
        this._addIfNotExists(node1);
        let children = this._links.get(node1);
        if (!children.includes(node2)) {
            this._e++;
            children.push(node2);
        }
    }

    /**
     * Дети узла
     * @param {Node} node
     */
    adj(node) {
        return this._links.get(node);
    }

    toString() {
        return [
                this.V + ' vertices',
                this.E + ' edges',
                this.vertices.map(v => v.name +': ' + this.adj(v).map(w => w.name).join(', ')).join('\n')
        ].join('\n');

    }

    _addIfNotExists(node) {
        if (!this._links.has(node)) {
            this._v++;
            this._links.set(node, []);
        }
    }
}

class Node
{
    constructor(name) {
        this._name = name;
    }

    get name () { return this._name;}
}

(function() {
    const d = new Digraph();
    const node1 = new Node('1');
    const node1_1 = new Node('1.1');
    const node1_2 = new Node('1.2');
    const node1_1_1 = new Node('1.1.1');
    d.addEdge(node1, node1_1);
    d.addEdge(node1, node1_2);
    d.addEdge(node1_1, node1_1_1);
    console.log(d.toString());
    // console.log(d.reverse);
})();