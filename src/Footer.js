import React,{Component} from 'react'

class Footer extends Component{
 static defaultProps={info:"Info place with additional data"};
    render() {
        return (
            <footer>
                {this.props.info}
            </footer>
        );
    }


}
export default Footer;