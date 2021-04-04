import { ImSpinner9 } from 'react-icons/im'


export const Loader = ({isOpen}) =>{
    return(
        <div hidden={!isOpen} className="backdrop backdrop-color">
            <ImSpinner9 className="floating-center spinner spin-color"/>
        </div>
    )
}