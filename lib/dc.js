// Minimal runtime for the prototype's component logic (replaces the canvas DCLogic base class).
export class DCLogic {
  constructor(props) {
    this.props = props || {};
    this.state = {};
    this._update = null;
  }
  setState(patch) {
    const next = typeof patch === 'function' ? patch(this.state, this.props) : patch;
    this.state = Object.assign({}, this.state, next);
    if (this._update) this._update();
  }
}
