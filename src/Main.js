import React,{Component} from 'react'

function updateText(text) {
    this.setState(text)
}
class NavElement extends Component{
    constructor(props) {
        super(props);
        this.goTo=this.goTo.bind(this);
    }
    goTo(e,props){
        e.preventDefault();
         updateText({page:props});

    }

    render(){
        return(<div className="menu_item">
            <a onClick={(e) => this.goTo(e,this.props.link)} href={this.props.link}> {this.props.text}</a>
        </div> );
    }
}

class Nav extends Component{
    render(){
        return (<nav className="menu">
            <NavElement link="about" text="Що таке Chemistry HPC"/>
            <NavElement link="calculation" text="Розрахунок спектрів"/>
            <NavElement link="contacts"  text="Контакти"/>
        </nav>);

    }
}
class Rotator extends Component{

    render() {
        return (
                <div className="slides">
                    <button className="slick-prev slick-arrow" >Previous</button>
                    <div className="slider">
                        <div className="ssl">
                    <div><img src="imgs/img_a.jpg"/><h3>your content</h3></div>
                    <div><img src="imgs/img_b.jpg"/><h3>your content</h3></div>
                    <div><img src="imgs/img_c.jpg"/><h3>your content</h3></div>
                        </div>
                    </div>
                    <button className="slick-next slick-arrow" >Next</button>
                </div>
        );
    }

}

class Screen extends Component{
    constructor(props){
        super(props);
        this.state={page:'main'};
        updateText = updateText.bind(this);


    }
    handleClick(){

    }
    render() {
        return this.state.page;
    }

}
class Main extends Component{
    render() {
        return(
            <div className="body">
                <Nav/>
                <p style={{fontFamily:30+'px'}}>About block
                </p>
                <Rotator/>
                <Screen page="main"/>

            </div>
        );
    }

}
export default Main;