import React from 'react';
import classnames from 'classnames';

class CustomToggle extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isSelected: false,
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);

    }


    handleClick(e) {
        if (e) {
            e.preventDefault();
        }
        this.props.onClick(e);

        if (!this.state.isSelected) {
            // attach/remove event handler
            document.addEventListener('click', this.handleOutsideClick, false);
        } else {
            document.removeEventListener('click', this.handleOutsideClick, false);
        }

        this.setState(prevState => ({
            isSelected: !prevState.isSelected,
        }));
    }

    handleOutsideClick(e) {
        // ignore clicks on the component itself
        if (this.node.contains(e.target)) {
            return;
        }
        this.setState(prevState => ({
            isSelected: false,
        }));
        //Remove listener when user click out 
        document.removeEventListener('click', this.handleOutsideClick, false);
    }


    renderStyleSelected() {
        return this.state.isSelected ? "td-request__border" : ""
    }


    render() {
        return (
            <p ref={node => { this.node = node; }} onClick={this.handleClick} className={classnames(this.props.className, this.renderStyleSelected())}>
                {this.props.children} {this.state.isSelected && <i className="fas fa-sort-down" style={{ verticalAlign: 'baseline' }}></i>}
            </p>
        );
    }
}
export default CustomToggle;

