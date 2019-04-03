import React,{Component} from 'react';

class Arrow extends Component{

    render() {
        return (
            <button onClick={(event)=>this.props.ArrowClick(event)} className={'slick-arrow '+this.props.direction} >{this.props.children}</button>
        );
    }

}
class Rotator extends Component{
    constructor(props) {
        super(props);
        this.state={currentPos:0};
    }


    handleClick(e){
        console.log(e);
    }
    render() {
        return (
            <div className="slides">
                <Arrow ArrowClick={(target)=>this.handleClick(target)}  direction="slick-prev"> Previous</Arrow>
                <div className="slider">
                    <div className="ssl">
                        <div><img src="imgs/img_a.jpg"/><h3>your content</h3></div>
                        <div><img src="imgs/img_b.jpg"/><h3>your content</h3></div>
                        <div><img src="imgs/img_c.jpg"/><h3>your content</h3></div>
                    </div>
                </div>
                <Arrow ArrowClick={(target)=>this.handleClick(target)} direction="slick-next">Next</Arrow>
            </div>
        );
    }

}
export default Rotator;