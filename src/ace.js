import ace from 'brace';
import React, { Component, findDOMNode, PropTypes } from 'react';

export default class ReactAce extends Component {
	static propTypes = {
    mode  : PropTypes.string,
    theme : PropTypes.string,
    name : PropTypes.string,
    className: PropTypes.string,
    height : PropTypes.string,
    width : PropTypes.string,
    fontSize : PropTypes.number,
    showGutter : PropTypes.bool,
    onChange: PropTypes.func,
    value: PropTypes.string,
    onLoad: PropTypes.func,
    maxLines : PropTypes.number,
    readOnly : PropTypes.bool,
    highlightActiveLine : PropTypes.bool,
    showPrintMargin : PropTypes.bool,
    cursorStart: PropTypes.number,
    editorProps: PropTypes.object
	};

  getDefaultProps () {
    return {
      name   : 'brace-editor',
      mode   : '',
      theme  : '',
      height : '500px',
      width  : '500px',
      value  : '',
      fontSize   : 12,
      showGutter : true,
      onChange   : null,
      onLoad     : null,
      maxLines   : null,
      readOnly   : false,
      highlightActiveLine : true,
      showPrintMargin     : true,
      cursorStart: 1,
      editorProps : {}
    };
  }

	constructor (props, context) {
		super(props, context);
		
	}

  componentDidMount () {
    this.editor = ace.edit(this.props.name);

		for (let prop in Object.keys(editorProps)) {
			this.editor[prop] = this.props.editorProps[prop];
		}

    this.editor.getSession().setMode('ace/mode/'+this.props.mode);
    this.editor.setTheme('ace/theme/'+this.props.theme);
    this.editor.setFontSize(this.props.fontSize);
    this.editor.setValue(this.props.value, this.props.cursorStart);
    this.editor.renderer.setShowGutter(this.props.showGutter);
    this.editor.setOption('maxLines', this.props.maxLines);
    this.editor.setOption('readOnly', this.props.readOnly);
    this.editor.setOption('highlightActiveLine', this.props.highlightActiveLine);
    this.editor.setShowPrintMargin(this.props.setShowPrintMargin);
    this.editor.on('change', this.onChange);

    if (this.props.onLoad) {
      this.props.onLoad(this.editor);
    }
  }

	componentWillUnmount () {
		this.editor = null;
	}

  componentWillReceiveProps (nextProps) {
    this.editor = ace.edit(nextProps.name);
    this.editor.getSession().setMode('ace/mode/'+nextProps.mode);
    this.editor.setTheme('ace/theme/'+nextProps.theme);
    this.editor.setFontSize(nextProps.fontSize);
    this.editor.setOption('maxLines', nextProps.maxLines);
    this.editor.setOption('readOnly', nextProps.readOnly);
    this.editor.setOption('highlightActiveLine', nextProps.highlightActiveLine);
    this.editor.setShowPrintMargin(nextProps.setShowPrintMargin);
    if (this.editor.getValue() !== nextProps.value) {
      this.editor.setValue(nextProps.value, nextProps.cursorStart);
    }
    this.editor.renderer.setShowGutter(nextProps.showGutter);
    if (nextProps.onLoad) {
      nextProps.onLoad(this.editor);
    }
	}

	render () {
    let divStyle = {
      width: this.props.width,
      height: this.props.height
    };
    let className = this.props.className;
		return (
			<div onChange={::this.props.onChange} id={this.props.name} className={className} style={divStyle}></div>
		);
	}
}
