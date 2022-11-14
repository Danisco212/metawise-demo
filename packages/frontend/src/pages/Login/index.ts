import { connect } from "react-redux";
import { neurosityLoginApiCall } from "../../redux/NeurosityAuth/action";
import { LoginPage } from "./LoginPage";

export type LoginPageProp = {
    neuroLogin: any
    loading: boolean
}

const mapDispatchToProps = {
    neuroLogin: neurosityLoginApiCall,
}

const mapStateToProps = (state: any) => {
    const {loading, authData, error} = state.neurosityAuth
    return {
        loading, authData, error
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)