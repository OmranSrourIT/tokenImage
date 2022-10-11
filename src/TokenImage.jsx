import { Component, createElement } from "react";
import axios from 'axios';
import "./ui/TokenImage.css";

export class TokenImage extends Component {
    constructor(props) {
        super(props);

        this.onClickHandler = this.onClick.bind(this);
    }

    TakeImage() {
        
        axios.get('http://localhost:11126/bio_face_scanning/face_capture')
            .then((response) => {
                debugger;
                console.log(response.data);
            }, (error) => {
                 debugger;
                 console.log(error);
            });

    }

    render() {
        return (
            <body>
                <div>
                    <button type="button" onClick={() => this.TakeImage()} value={'Capture'}>Capture</button>
                </div>
            </body>
        );
    }

    onClick() {
        if (this.props.onClickAction && this.props.onClickAction.canExecute) {
            this.props.onClickAction.execute();
        }
    }
}
