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
            <Slide src="imgs/img_c.jpg" text="your content"/>
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
        this.state={currentPos:-200,interval:'',step:10,timeout:50};
    }
    checkLimit(){
        const pos=this.state.currentPos;
        if (pos>1200||pos<-1200){
            this.setState({currentPos:-200});
        }
    }
    moveB(t){
        let pos=this.state.currentPos;
       let inter= setInterval(()=>{
           pos-=this.state.step;
            this.setState({currentPos:pos,interval:inter});
            if(t>this.state.currentPos){
                clearInterval(this.state.interval);
            }
            console.log(this.state.currentPos);},this.state.timeout);

    }
    moveF(t){
        let pos=this.state.currentPos;
        let inter= setInterval(()=>{
            pos+=this.state.step;
            this.setState({currentPos:pos,interval:inter});
            if(t<this.state.currentPos){
                clearInterval(this.state.interval);
            }
            console.log(this.state.currentPos);},this.state.timeout);

    }
    handleClick(e,arg){
        const pos=this.state.currentPos;
        console.log(pos);
        this.checkLimit();
        let target;
        switch (arg) {
            case 'slick-prev':
                 target=pos-200;
                this.moveB(target);
                break;
            case 'slick-next':
                target=pos+200;
                console.log(target,pos);
                this.moveF(target);
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
