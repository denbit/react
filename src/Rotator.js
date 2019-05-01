import React, {Component} from 'react';

const slides = [
    {src: 'imgs/img_c.jpg', text: "your C"},
    {src: 'imgs/img_a.jpg', text: "your A"},
    {src: 'imgs/img_b.jpg', text: "your B"},
    {src: 'imgs/img_c.jpg', text: "your C"},
    {src: 'imgs/img_a.jpg', text: "your A"}
];
class Arrow extends Component{

    render() {
        return (
            <div className={'slick'}>
                <button onClick={(event) => this.props.ArrowClick(event, this.props.direction)}
                        className={'slick-arrow ' + this.props.direction}>{this.props.children}</button>
                <span className={'arrow-center'}></span>
            </div>
        );
    }

}
function Slide(props) {
    return(<div><h3>{props.text}</h3><img src={props.src}/></div>)

}
function Slider(props) {
    return(<div className="slider">{}
        <div className="ssl" style={{marginLeft:+props.position+'px'}}>
            {slides.map((slide, i) => {
                return <Slide key={i} src={slide.src} text={slide.text}/>
            })}
        </div>
    </div>)
}
class Rotator extends Component{

    constructor(props) {
        super(props);
        this.state = {
            currentPos: -550,
            interval: '',
            step: 10,
            timeout: 50,
            target: null
        };
    }
    checkLimit(){
        const pos=this.state.currentPos;

        if (pos >= 0) {
            console.log("LImit:" + pos);
            this.setState({currentPos: -1200, target: -1100});
        }
    }


    moveB() {
        let pos=this.state.currentPos;
       let inter= setInterval(()=>{
           pos = this.state.currentPos - this.state.step;
            this.setState({currentPos:pos,interval:inter});
           this.checkLimit();
           if (this.state.target > this.state.currentPos) {
                clearInterval(this.state.interval);
            }
            console.log(this.state.currentPos);},this.state.timeout);

    }

    moveF() {
        let pos=this.state.currentPos;
        let inter= setInterval(()=>{
            pos = this.state.currentPos + this.state.step;

            this.setState({currentPos:pos,interval:inter});
            this.checkLimit();
            if (this.state.target < this.state.currentPos) {
                clearInterval(this.state.interval);
            }
            console.log(this.state.currentPos);},this.state.timeout);

    }
    handleClick(e,arg){
        const pos=this.state.currentPos;
        console.log(pos);

        let target;
        switch (arg) {
            case 'slick-prev':
                 target=pos-200;
                this.setState({target: target});
                this.moveB();
                break;
            case 'slick-next':
                target=pos+200;
                this.setState({target: target});
                this.moveF();
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
