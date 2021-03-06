import React,{Component} from "react";
import Logo from "./logo.jpg";
import {withSessionContext} from "../Utils/SessionProvider";
import {withRouter} from "react-router-dom";

class  Profile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            nom:'',prenom:'',email:''
        }
    };
    componentDidMount(){
        if (!this.props.context.isLogged){
            return this.props.history.push('/login',{regSucc:false,logoutSucc:false});
        }else
        {
            const {email,nom,prenom} =this.props.context.session;
            this.setState({nom, prenom, email});
        }
    };

    render() {
        const {nom,prenom,email} = this.state;
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="text-center">Mes infos</h1>
                    </div>
                </div>
                <div className="row">
                        <div className="col-sm-6 mx-auto">
                            <img src={Logo} alt={'Logo'}/>
                        </div>
                        <div className="col-sm-6 mx-auto form-group">
                            <div className="form-group">
                                {<h2>nom :{nom} </h2>}
                            </div>
                            <div className="form-group">
                                {<h2>prénom :{prenom} </h2>}
                            </div>
                            <div className="form-group">
                                {<h2>email :{email} </h2>}
                            </div>
                        </div>
                    </div>
                </div>
        )
    }

}
export default withRouter(withSessionContext(Profile))