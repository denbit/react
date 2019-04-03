import React,{Component} from 'react';

class Arrow extends Component{

    render() {
        return (
            <button onClick={(event)=>this.props.ArrowClick(event,this.props.direction)} className={'slick-arrow '+this.props.direction} >{this.props.children}</button>
        );
    }

}
function Slide(props) {
    return(<div><h3>{props.text}</h3><img src={props.src}/></div>)

}
function Slider(props) {
    return(<div className="slider">{}
        <div className="ssl" style={{marginLeft:+props.position+'px'}}>
            <Slide src="imgs/img_a.jpg" text="your content"/>
            <Slide src="imgs/img_b.jpg" text="your content"/>
            <Slide src="imgs/img_c.jpg" text="your content"/>
            <Slide src="imgs/img_a.jpg" text="your content"/>
        </div>
    </div>)
}
class Rotator extends Component{

    constructor(props) {
        super(props);
        this.state={currentPos:-200};
    }


    handleClick(e,arg){
        const pos=this.state.currentPos;
        switch (arg) {
            case 'slick-prev':
                this.setState({currentPos:(pos-200)});
                break;
            case 'slick-next':
                this.setState({currentPos:(pos+200)});
                break;

        }
        console.log(arg);
    }
    render() {
        return (
            <div className="slides">
                <Arrow ArrowClick={(target,arg)=>this.handleClick(target,arg)}  direction="slick-prev"> Previous</Arrow>
                <Slider position={this.state.currentPos}/>
                <Arrow ArrowClick={(target,arg)=>this.handleClick(target,arg)} direction="slick-next">Next</Arrow>
            </div>
        );
    }

}
export default Rotator;
