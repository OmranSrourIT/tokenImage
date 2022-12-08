import { Component, createElement } from "react";
import axios from 'axios';
import "./ui/TokenImage.css";

export class TokenImage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            IMAGE_SRC: `./img/${this.props.ModuleName.value}$${this.props.ImageCollection.value}$TokenImageNew.png`,
            BlockedButtonCapture : false,
        }

    }

    TakeImage() {

        
        this.setState({
            BlockedButtonCapture : true,
            IMAGE_SRC: `./img/${this.props.ModuleName.value}$${this.props.ImageCollection.value}$TokenImageNew.png`,
        },()=>{
        const article = { pid_Option: { Task_To_Perform: "Face_Scanning", Slap_Scanning: { NFIQ_Threshold: "", TimeOut: "", Fingers_Exception: { LeftIndexFinger: "", LeftMiddleFinger: "", LeftRingFinger: "", LeftLittleFinger: "", RightIndexFinger: "", RightMiddleFinger: "", RightRingFinger: "", RightLittleFinger: "", LeftThumb: "", RightThumb: "" } }, Single_Finger_Scanning: { NFIQ_Threshold: "", TimeOut: "" }, Templates_Match: { matchingtemplate1: "", matchingtemplate2: "" }, Exception_Scanning: { TimeOut: "" }, Face_Scanning: { Face_Cofidance_Threshold: "", TimeOut: "10000" }, IRIS_Scanning: { Iris_Quality_Threshold: "", TimeOut: "", IRIS_Exception: { LeftIRIS: "1", RightIRIS: "" } }, Document_Scanning: { Quality_Threshold: "", TimeOut: "", No_of_Pages: "2" }, Signature_Scanning: { Quality_Threshold: "", TimeOut: "" } } };

        const config = {
            method: 'post',
            url: "https://localhost:11125/bio/face_capture_withoutFacialFeature",
            data: article,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        };

        axios.request(config)
            .then((response) => {

                this.setState({
                    BlockedButtonCapture : false, 
                },()=>{
                    if(response.data)
                    {
                        if (response.data?.Face_Data_Obj?.Image_Data) {
                            this.setState({
                                IMAGE_SRC : "data:image/png;base64," + response.data.Face_Data_Obj.Image_Data,
                               
                            });
                            debugger;
        
                            this.props.imageBmpLive.setValue(response.data.Face_Data_Obj?.Image_Data);
                            this.props.imageIsoLive.setValue(response.data.Face_Data_Obj?.ISO_Data);
                           
                            
                        }
        

                    }

                   

                })
                
             
            }, (error) => {
                debugger;
                this.setState({
                    BlockedButtonCapture : false,
                },()=>{
                    if (confirm("قد تكون الخدمة متوقفة أو أنه لم يتم تثبيتها . هل تود تحميل تعريف الإصدار الأحدث من الخدمة؟")) {
                        window.open("./WindowsServices/Biometric_Device_API.msi", "_base");
                    }
                })
               
            });

        })

        

    }

    render() {
        return (
            <body style={{backgroundColor:'#eeeded',padding:'80px'}}>
                <div className="row" style={{direction:"ltr" , backgroundColor:'#eeeded' , position:'relative'}} >
                    <div className="col-xs-3 col-sm-3 col-md-3" style={{ backgroundColor:'#eeeded'}}>

                    </div>
                    <div className="col-xs-5 col-sm-5 col-md-5" style={{ backgroundColor:'#eeeded'}} >
                        <div >
                            <img src={this.state.IMAGE_SRC} alt="Image Not Found" style={{ width: "320px", height: "426px", border: "2px solid" , borderRadius:"15px" , padding :"0px" }} ></img>

                        </div>
                    </div>
                    <div className="col-xs-3 col-sm-3 col-md-3" style={{textAlign:'center' ,  backgroundColor:'#eeeded'}} >
                        <button type="button" disabled={this.state.BlockedButtonCapture} style={{ top: "40px", width: "190px", position: 'relative', height: "60px", color: "white", backgroundColor: "#1f3646", fontSize: "20px", borderRadius: "12px" }} onClick={() => this.TakeImage()} value={'إالتقاط'}>إلتقــاط</button>
                        <br />
                        <button type="button" style={{ top: "50px", width: "190px", position: 'relative', height: "60px", color: "white", backgroundColor: "#1f3646", fontSize: "20px", borderRadius: "12px" }} onClick={() => this.saveLiveImage()} value={'حـفظ'}>حـــفظ</button>

                        <br />
                        <button type="button" style={{ top: "60px", width: "190px", position: 'relative', height: "60px", color: "white", backgroundColor: "#1f3646", fontSize: "20px", borderRadius: "12px" }} onClick={() => this.ClosePage()} value={'حـفظ'}>الغــاء</button>
                    </div>

                </div>

            </body>
        );
    }

    saveLiveImage() {
        debugger;
        if (this.props.onClickSaveAction && this.props.onClickSaveAction.canExecute) {
            this.props.onClickSaveAction.execute();
        }
    }

    ClosePage() {
        if (this.props.onClickCloseAction && this.props.onClickCloseAction.canExecute) {
            this.props.onClickCloseAction.execute();
        }

    }
}
