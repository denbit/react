import React,{Component} from 'react'

class Footer extends Component{
 static defaultProps={info:"Info place with additional data"}
    render() {
        return (
            <footer>
                {this.props.info}{<h2>{this.props.match.params.id?this.props.match.params.id:""}</h2>}
            </footer>
        );
    }


}
export default Footer;