import PropTypes from "prop-types";
import React, {Component} from 'react';

class Screen extends Component {
    static propTypes = {
        page: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.element
        ]),
        router: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            page: 'main'
        };
        this.ref = React.createRef();


    }

    componentDidMount() {
        if ((typeof this.props.page) === 'string')
            this.ref.current.innerHTML = this.props.page;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ((typeof this.props.page) === 'string')
            this.ref.current.innerHTML = this.props.page;
        if (((typeof this.props.page) === 'object') && ((typeof prevProps.page) === 'string')) {
            console.log(" changing type of content ");
        }
    }

    renderString = (attrs) => (<div ref={this.ref} className={attrs.className}></div>);

    renderComponent = (Component, attrs) => (<div className={attrs.className}><Component {...attrs}/></div>);

    render() {
        const atrs = Object.assign({}, this.props);
        const Page = this.props.page;
        delete atrs.page;
        if (this.ref.current)
            this.ref.current.innerHTML = '';
        return (
            (typeof Page) === 'string' ? this.renderString(atrs) :
                this.renderComponent(Page, atrs)
        );
    }

}

export default Screen
